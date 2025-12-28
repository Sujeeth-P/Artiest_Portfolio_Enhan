import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PanelSlider - Creates a pinned container with panels that slide in from different directions
 * Similar to ScrollMagic's panel wipe effect
 */
const PanelSlider = ({ children, id = "panel-slider" }) => {
    const containerRef = useRef(null);
    const panelsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        const panels = panelsRef.current.filter(Boolean);

        if (!container || panels.length < 2) return;

        const ctx = gsap.context(() => {
            // Set up initial positions - first panel visible, others hidden
            gsap.set(panels[0], { xPercent: 0, yPercent: 0 });

            // Define slide directions for each panel
            const directions = [
                null, // First panel doesn't animate in
                { x: '-100%', xTo: '0%' }, // From left
                { x: '100%', xTo: '0%' },  // From right
                { y: '-100%', yTo: '0%' }, // From top
                { x: '-100%', xTo: '0%' }, // From left
                { y: '100%', yTo: '0%' },  // From bottom
                { x: '100%', xTo: '0%' },  // From right
                { y: '-100%', yTo: '0%' }, // From top
            ];

            // Create timeline for panel animations
            const tl = gsap.timeline();

            panels.forEach((panel, i) => {
                if (i === 0) return; // Skip first panel

                const dir = directions[i % directions.length] || directions[1];

                // Set initial position
                if (dir.x) {
                    gsap.set(panel, { xPercent: parseFloat(dir.x) });
                } else if (dir.y) {
                    gsap.set(panel, { yPercent: parseFloat(dir.y) });
                }

                // Animate panel in
                if (dir.x) {
                    tl.to(panel, {
                        xPercent: 0,
                        ease: 'none',
                        duration: 1
                    });
                } else if (dir.y) {
                    tl.to(panel, {
                        yPercent: 0,
                        ease: 'none',
                        duration: 1
                    });
                }
            });

            // Create ScrollTrigger to pin container and link animation
            ScrollTrigger.create({
                trigger: container,
                pin: true,
                start: 'top top',
                end: () => `+=${(panels.length - 1) * 100}%`,
                scrub: 1,
                animation: tl,
            });

        }, container);

        return () => ctx.revert();
    }, [children]);

    // Clone children and add refs
    const panelElements = [];
    let panelIndex = 0;

    const processChildren = (child) => {
        if (!child) return null;

        const index = panelIndex++;
        return (
            <div
                key={index}
                ref={(el) => (panelsRef.current[index] = el)}
                className="panel-slide"
                style={{
                    position: index === 0 ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                {child}
            </div>
        );
    };

    // Handle array of children
    if (Array.isArray(children)) {
        children.forEach((child) => {
            panelElements.push(processChildren(child));
        });
    } else {
        panelElements.push(processChildren(children));
    }

    return (
        <div
            id={id}
            ref={containerRef}
            className="panel-slider-container"
            style={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {panelElements}
        </div>
    );
};

export default PanelSlider;
