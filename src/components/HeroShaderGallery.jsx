import { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader with liquid displacement effect
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uDisp;
  uniform float uTime;
  uniform float uDispFactor;
  uniform float uRandom;
  uniform float uIntensity;

  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
  }

  void main() {
    vec2 uv = vUv;
    
    // Add slight wave motion based on time
    vec2 waveUV = uv;
    waveUV.x += sin(uv.y * 10.0 + uTime * 0.5) * 0.005 * uIntensity;
    waveUV.y += cos(uv.x * 8.0 + uTime * 0.3) * 0.003 * uIntensity;
    
    // Rotate UV for displacement sampling
    vec2 centeredUV = waveUV - 0.5;
    vec2 rotatedUV = rotate(centeredUV, uRandom * 0.3);
    rotatedUV += 0.5;
    
    // Sample displacement texture
    vec4 dispTexture = texture2D(uDisp, rotatedUV);
    float dispValue = dispTexture.g;
    
    // Create distorted positions for both textures
    float dispStrength = 0.35 * uIntensity;
    vec2 distortedPos1 = vec2(
      uv.x + uDispFactor * dispValue * dispStrength,
      uv.y + uDispFactor * dispValue * dispStrength * 0.5
    );
    vec2 distortedPos2 = vec2(
      uv.x - (1.0 - uDispFactor) * dispValue * dispStrength,
      uv.y - (1.0 - uDispFactor) * dispValue * dispStrength * 0.5
    );
    
    // RGB shift for chromatic aberration feel
    float rgbShift = 0.008 * uIntensity * (1.0 - abs(uDispFactor - 0.5) * 2.0);
    
    vec4 tex1;
    tex1.r = texture2D(uTexture1, distortedPos1 + vec2(rgbShift, 0.0)).r;
    tex1.g = texture2D(uTexture1, distortedPos1).g;
    tex1.b = texture2D(uTexture1, distortedPos1 - vec2(rgbShift, 0.0)).b;
    tex1.a = texture2D(uTexture1, distortedPos1).a;
    
    vec4 tex2;
    tex2.r = texture2D(uTexture2, distortedPos2 + vec2(rgbShift, 0.0)).r;
    tex2.g = texture2D(uTexture2, distortedPos2).g;
    tex2.b = texture2D(uTexture2, distortedPos2 - vec2(rgbShift, 0.0)).b;
    tex2.a = texture2D(uTexture2, distortedPos2).a;
    
    // Smooth mix between textures
    vec4 finalColor = mix(tex1, tex2, uDispFactor);
    
    // Add subtle vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.3;
    finalColor.rgb *= vignette;
    
    // Boost contrast slightly
    finalColor.rgb = pow(finalColor.rgb, vec3(0.95));
    
    gl_FragColor = finalColor;
  }
`;

const HeroShaderGallery = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const materialRef = useRef(null);
    const meshRef = useRef(null);
    const animationRef = useRef(null);
    const texturesRef = useRef([]);
    const currentIndexRef = useRef(0);
    const isTransitioningRef = useRef(false);
    const clockRef = useRef(null);
    const intervalRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // Gallery images - from slideshow directory
    const images = [
        '/assets/slideshow/abstract-design-based-on-berries-leaves-grasses.jpg',
        '/assets/slideshow/cerfs.jpg',
        '/assets/slideshow/crevettes.jpg',
        '/assets/slideshow/grenouilles-et-nénuphars.jpg',
        '/assets/slideshow/lion-départ-de-rampe.jpg',
    ];

    // Create displacement texture procedurally
    const createDisplacementTexture = useCallback(() => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Create organic noise pattern
        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const i = (y * size + x) * 4;

                // Multiple octaves of noise for organic look
                let noise = 0;
                noise += Math.sin(x * 0.02 + y * 0.03) * 0.5 + 0.5;
                noise += Math.sin(x * 0.05 - y * 0.02 + 2.5) * 0.3;
                noise += Math.sin((x + y) * 0.01 + 1.7) * 0.2;
                noise += Math.cos(x * 0.03 + y * 0.04 - 0.8) * 0.25;

                // Add some circular patterns
                const cx = size / 2;
                const cy = size / 2;
                const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / (size * 0.5);
                noise += Math.sin(dist * 8) * 0.15;

                const value = Math.floor(Math.max(0, Math.min(255, (noise / 1.9 + 0.5) * 255)));

                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }, []);

    // Animation loop
    const animate = useCallback(() => {
        animationRef.current = requestAnimationFrame(animate);

        if (materialRef.current && clockRef.current) {
            const delta = clockRef.current.getDelta();
            materialRef.current.uniforms.uTime.value += delta;
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    }, []);

    // Transition to next image
    const transitionToNext = useCallback(() => {
        if (isTransitioningRef.current || !materialRef.current) return;
        if (texturesRef.current.length < 2) return;

        isTransitioningRef.current = true;

        const nextIndex = (currentIndexRef.current + 1) % texturesRef.current.length;
        const afterNextIndex = (nextIndex + 1) % texturesRef.current.length;

        // Set random rotation for this transition
        materialRef.current.uniforms.uRandom.value = Math.random() * Math.PI * 2;

        // Animate dispFactor from 0 to 1
        gsap.to(materialRef.current.uniforms.uDispFactor, {
            value: 1,
            duration: 1.8,
            ease: 'expo.inOut',
            onComplete: () => {
                // Swap textures
                currentIndexRef.current = nextIndex;
                if (materialRef.current) {
                    materialRef.current.uniforms.uTexture1.value = texturesRef.current[nextIndex];
                    materialRef.current.uniforms.uTexture2.value = texturesRef.current[afterNextIndex];
                    materialRef.current.uniforms.uDispFactor.value = 0;
                }
                isTransitioningRef.current = false;
            }
        });
    }, []);

    // Handle resize
    const handleResize = useCallback(() => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        if (width === 0 || height === 0) return;

        cameraRef.current.left = width / -2;
        cameraRef.current.right = width / 2;
        cameraRef.current.top = height / 2;
        cameraRef.current.bottom = height / -2;
        cameraRef.current.updateProjectionMatrix();

        rendererRef.current.setSize(width, height);

        // Update mesh size
        if (meshRef.current) {
            const planeSize = Math.max(width, height) * 1.2;
            meshRef.current.geometry.dispose();
            meshRef.current.geometry = new THREE.PlaneGeometry(planeSize, planeSize);
        }
    }, []);

    // Initialize on mount
    useEffect(() => {
        if (!containerRef.current) return;

        // Wait a frame to ensure container has dimensions
        const initTimeout = setTimeout(() => {
            const container = containerRef.current;
            if (!container) return;

            const width = container.clientWidth || 500;
            const height = container.clientHeight || 600;

            // Initialize clock
            clockRef.current = new THREE.Clock(true);

            // Scene
            const scene = new THREE.Scene();
            sceneRef.current = scene;

            // Camera - Orthographic for 2D effect
            const camera = new THREE.OrthographicCamera(
                width / -2,
                width / 2,
                height / 2,
                height / -2,
                1,
                1000
            );
            camera.position.z = 1;
            cameraRef.current = camera;

            // Renderer
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: false
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(width, height);
            renderer.setClearColor(0x1a1a1a, 1);
            container.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            // Create displacement texture
            const dispTexture = createDisplacementTexture();

            // Load textures
            const loader = new THREE.TextureLoader();
            let loadedCount = 0;
            const textures = [];

            images.forEach((src, index) => {
                loader.load(
                    src,
                    (texture) => {
                        texture.minFilter = THREE.LinearFilter;
                        texture.magFilter = THREE.LinearFilter;
                        textures[index] = texture;
                        loadedCount++;

                        if (loadedCount === images.length) {
                            // All textures loaded
                            texturesRef.current = textures.filter(t => t);

                            if (texturesRef.current.length >= 2) {
                                // Shader Material
                                const material = new THREE.ShaderMaterial({
                                    uniforms: {
                                        uTexture1: { value: texturesRef.current[0] },
                                        uTexture2: { value: texturesRef.current[1] },
                                        uDisp: { value: dispTexture },
                                        uTime: { value: 0 },
                                        uDispFactor: { value: 0 },
                                        uRandom: { value: Math.random() * Math.PI * 2 },
                                        uIntensity: { value: 1.0 }
                                    },
                                    vertexShader,
                                    fragmentShader,
                                    transparent: false
                                });
                                materialRef.current = material;

                                // Calculate plane size to cover container
                                const planeSize = Math.max(width, height) * 1.2;
                                const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
                                const mesh = new THREE.Mesh(geometry, material);
                                meshRef.current = mesh;
                                scene.add(mesh);

                                // Mark as ready
                                setIsReady(true);

                                // Start animation loop
                                animate();

                                // Start auto-transition after initial delay
                                setTimeout(() => {
                                    intervalRef.current = setInterval(() => {
                                        transitionToNext();
                                    }, 4000);
                                }, 2000);
                            }
                        }
                    },
                    undefined,
                    (error) => {
                        console.warn('Failed to load texture:', src, error);
                        loadedCount++;
                    }
                );
            });

            window.addEventListener('resize', handleResize);
        }, 100);

        return () => {
            clearTimeout(initTimeout);
            window.removeEventListener('resize', handleResize);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (rendererRef.current && containerRef.current) {
                try {
                    containerRef.current.removeChild(rendererRef.current.domElement);
                } catch (e) {
                    // Element might already be removed
                }
                rendererRef.current.dispose();
            }

            // Dispose textures
            texturesRef.current.forEach(texture => {
                if (texture) texture.dispose();
            });
        };
    }, [animate, createDisplacementTexture, handleResize, transitionToNext]);

    return (
        <div
            ref={containerRef}
            className="hero-shader-gallery"
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: isReady ? 'transparent' : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                borderRadius: 'inherit'
            }}
        />
    );
};

export default HeroShaderGallery;
