import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GuidedGallery = () => {
    const sectionRef = useRef(null);
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    // Artworks data with descriptions
    const artworks = [
        {
            id: 1,
            image: '/assets/gallery/paons-et-pavots.jpg',
            title: 'Paons et Pavots',
            category: 'Nature',
            description: 'A stunning portrayal of peacocks amidst vibrant poppies, showcasing the harmonious dance between wildlife and flora.'
        },
        {
            id: 2,
            image: '/assets/gallery/cacatoës-et-magnolia.jpg',
            title: 'Cacatoës et Magnolia',
            category: 'Botanical',
            description: 'Elegant cockatoos perched among delicate magnolia blooms, capturing the gentle beauty of nature.'
        },
        {
            id: 3,
            image: '/assets/gallery/cygne-sauvage.jpg',
            title: 'Cygne Sauvage',
            category: 'Wildlife',
            description: 'The wild swan in its natural habitat, expressing grace and freedom through fluid brushstrokes.'
        },
        {
            id: 4,
            image: '/assets/gallery/nénuphar.jpg',
            title: 'Nénuphar',
            category: 'Botanical',
            description: 'Water lilies floating serenely on still waters. Inspired by impressionist masters.'
        },
        {
            id: 5,
            image: '/assets/aigles.jpg',
            title: 'Aigles Majestueux',
            category: 'Nature',
            description: 'Majestic eagles captured in their powerful glory with bold compositions and dynamic lines.'
        }
    ];

    const currentArtwork = artworks[currentIndex];
    const anglePerCard = 360 / artworks.length;
    const radius = 320; // Distance from center

    // Scroll-driven horizontal rotation
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const totalScroll = artworks.length * window.innerHeight * 0.6;

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${totalScroll}`,
                pin: true,
                scrub: 0.5, // Lower scrub value for more responsive scrolling
                onUpdate: (self) => {
                    const progress = self.progress;
                    const newIndex = Math.min(
                        Math.floor(progress * artworks.length),
                        artworks.length - 1
                    );

                    // Rotate around Y-axis (horizontal circular motion)
                    const newRotation = progress * 360;
                    setRotationY(newRotation);
                    setCurrentIndex(newIndex);
                }
            });

        }, section);

        return () => ctx.revert();
    }, [artworks.length]);

    return (
        <section ref={sectionRef} className="guided-gallery">
            <div className="gallery-container">
                {/* Left Side - Explanation Panel */}
                <div className="explanation-panel">
                    <div className="explanation-content">
                        <span className="artwork-number">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="artwork-category">{currentArtwork.category}</span>
                        <h2 className="artwork-title">{currentArtwork.title}</h2>
                        <p className="artwork-description">{currentArtwork.description}</p>

                        {/* Progress bar */}
                        <div className="progress-section">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${((currentIndex + 1) / artworks.length) * 100}%` }}
                                />
                            </div>
                            <span className="progress-label">
                                {currentIndex + 1} of {artworks.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side - 3D Circular Carousel */}
                <div className="carousel-wrapper">
                    <div className="carousel-scene">
                        <div
                            ref={carouselRef}
                            className="carousel-track"
                            style={{ transform: `rotateY(-${rotationY}deg)` }}
                        >
                            {artworks.map((artwork, index) => {
                                const angle = index * anglePerCard;

                                return (
                                    <div
                                        key={artwork.id}
                                        className={`carousel-card ${index === currentIndex ? 'active' : ''}`}
                                        style={{
                                            transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                                        }}
                                    >
                                        <div className="card-inner">
                                            <img src={artwork.image} alt={artwork.title} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-line"></div>
                <span>Scroll</span>
            </div>

            <style>{`
                .guided-gallery {
                    position: relative;
                    height: 100vh;
                    width: 100%;
                    background: #fcf7e7;
                    overflow: hidden;
                }

                .gallery-container {
                    display: flex;
                    height: 100%;
                    width: 100%;
                }

                /* Left Panel - Explanation */
                .explanation-panel {
                    width: 40%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 60px;
                    box-sizing: border-box;
                }

                .explanation-content {
                    max-width: 420px;
                }

                .artwork-number {
                    display: block;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 5rem;
                    font-weight: 300;
                    color: rgba(184, 150, 63, 0.2);
                    line-height: 1;
                    margin-bottom: -20px;
                }

                .artwork-category {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #b8963f;
                    margin-bottom: 16px;
                    padding: 8px 16px;
                    background: rgba(184, 150, 63, 0.1);
                    border-radius: 20px;
                }

                .artwork-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2.8rem;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin: 0 0 20px;
                    line-height: 1.15;
                    font-style: italic;
                }

                .artwork-description {
                    font-family: 'Georgia', serif;
                    font-size: 1rem;
                    line-height: 1.8;
                    color: #666;
                    margin: 0 0 40px;
                }

                .progress-section {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .progress-bar {
                    flex: 1;
                    height: 3px;
                    background: rgba(0, 0, 0, 0.08);
                    border-radius: 2px;
                    overflow: hidden;
                    max-width: 180px;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #b8963f, #d4af5a);
                    transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
                }

                .progress-label {
                    font-size: 0.85rem;
                    color: #999;
                    letter-spacing: 1px;
                }

                /* Right Side - 3D Carousel */
                .carousel-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1200px;
                }

                .carousel-scene {
                    width: 300px;
                    height: 400px;
                    position: relative;
                    transform-style: preserve-3d;
                }

                .carousel-track {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transform-style: preserve-3d;
                    /* No CSS transition - GSAP scrub handles this smoothly */
                }

                .carousel-card {
                    position: absolute;
                    width: 280px;
                    height: 380px;
                    left: 50%;
                    top: 50%;
                    margin-left: -140px;
                    margin-top: -190px;
                    backface-visibility: hidden;
                }

                .carousel-card .card-inner {
                    width: 100%;
                    height: 100%;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
                    transition: opacity 0.4s ease, 
                                filter 0.4s ease, 
                                box-shadow 0.4s ease,
                                transform 0.4s ease;
                    opacity: 0.5;
                    filter: brightness(0.65);
                    transform: scale(0.92);
                }

                .carousel-card.active .card-inner {
                    opacity: 1;
                    filter: brightness(1);
                    transform: scale(1);
                    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.25);
                }

                .carousel-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* Scroll indicator */
                .scroll-indicator {
                    position: absolute;
                    bottom: 40px;
                    right: 60px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                }

                .scroll-line {
                    width: 1px;
                    height: 50px;
                    background: linear-gradient(to bottom, transparent, #b8963f, transparent);
                    animation: scrollPulse 2s infinite;
                }

                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                .scroll-indicator span {
                    font-size: 0.65rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #999;
                }

                /* Responsive */
                @media (max-width: 1100px) {
                    .explanation-panel {
                        width: 45%;
                        padding: 40px;
                    }

                    .artwork-title {
                        font-size: 2.2rem;
                    }

                    .artwork-number {
                        font-size: 4rem;
                    }

                    .carousel-card {
                        width: 240px;
                        height: 320px;
                        margin-left: -120px;
                        margin-top: -160px;
                    }
                }

                @media (max-width: 768px) {
                    .gallery-container {
                        flex-direction: column;
                    }

                    .explanation-panel {
                        width: 100%;
                        height: auto;
                        padding: 30px 24px;
                        text-align: center;
                    }

                    .explanation-content {
                        max-width: 100%;
                    }

                    .artwork-number {
                        font-size: 3rem;
                        margin-bottom: -10px;
                    }

                    .artwork-title {
                        font-size: 1.8rem;
                    }

                    .artwork-description {
                        font-size: 0.9rem;
                        margin-bottom: 24px;
                    }

                    .progress-section {
                        justify-content: center;
                    }

                    .carousel-wrapper {
                        flex: 1;
                        perspective: 800px;
                    }

                    .carousel-card {
                        width: 200px;
                        height: 270px;
                        margin-left: -100px;
                        margin-top: -135px;
                    }

                    .scroll-indicator {
                        right: 20px;
                        bottom: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .carousel-card {
                        width: 160px;
                        height: 220px;
                        margin-left: -80px;
                        margin-top: -110px;
                    }
                }
            `}</style>
        </section>
    );
};

export default GuidedGallery;
