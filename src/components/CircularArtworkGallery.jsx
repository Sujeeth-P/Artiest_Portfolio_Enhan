import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function calculateGap(width) {
    const minWidth = 768;
    const maxWidth = 1200;
    const minGap = 50;
    const maxGap = 80;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return maxGap;
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const CircularArtworkGallery = ({ onViewArtwork }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const imageContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(800);

    // All artworks
    const artworks = [
        {
            id: 1,
            src: '/assets1/IMG_2011.JPG',
            title: 'Wedding Floral Preservation',
            category: 'Floral',
            description: 'Your special wedding flowers preserved forever in elegant resin art, capturing the magic and emotions of your most cherished day.',
        },
        {
            id: 2,
            src: '/assets1/IMG_2092.JPG',
            title: 'Custom Name Frame',
            category: 'Personalized Frames',
            description: 'Thoughtfully designed frames that hold names, dates, messages, and emotions—crafted to celebrate your unique story.',
        },
        {
            id: 3,
            src: '/assets1/IMG_2093.JPG',
            title: 'Letter Block Creation',
            category: 'Home Décor',
            description: 'Custom letter creations that spell out your stories—perfect for gifting, nursery décor, or adding personality to any space.',
        },
        {
            id: 4,
            src: '/assets1/IMG_2094.JPG',
            title: 'Baby Name Board',
            category: 'Name Boards',
            description: 'Handmade name boards that add warmth and personality to nurseries and children\'s rooms, celebrating new beginnings.',
        },
        {
            id: 5,
            src: '/assets1/IMG_2095.JPG',
            title: 'Teak Wood Frame',
            category: 'Premium Collection',
            description: 'Timeless teak wood frames that give your memories the strength, elegance, and durability they truly deserve.',
        },
        {
            id: 6,
            src: '/assets1/IMG_2096.JPG',
            title: 'Personalized Gift Set',
            category: 'Gift Collections',
            description: 'Thoughtfully curated gift sets perfect for celebrations, anniversaries, and those special moments worth remembering.',
        },
    ];

    const activeArtwork = artworks[activeIndex];

    // Handle responsive gap
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll-triggered gallery rotation with PINNING
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Kill any existing ScrollTriggers on this element
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger === container) st.kill();
                });

                // Pin the container and scrub through artworks
                ScrollTrigger.create({
                    trigger: container,
                    start: "top top",
                    end: `+=${window.innerHeight * artworks.length}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    // markers: true, // Uncomment for debugging
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const newIndex = Math.min(
                            Math.floor(progress * artworks.length),
                            artworks.length - 1
                        );
                        setActiveIndex(newIndex);
                    }
                });

                // Refresh ScrollTrigger after setup
                ScrollTrigger.refresh();
            });

            return () => ctx.revert();
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === container) st.kill();
            });
        };
    }, [artworks.length]);

    // Get image styles for 3D circular effect
    function getImageStyle(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.7;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + artworks.length) % artworks.length === index;
        const isRight = (activeIndex + 1) % artworks.length === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.6s cubic-bezier(.4,.2,.2,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 0.7,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(20deg)`,
                transition: "all 0.6s cubic-bezier(.4,.2,.2,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 0.7,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-20deg)`,
                transition: "all 0.6s cubic-bezier(.4,.2,.2,1)",
            };
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.6s cubic-bezier(.4,.2,.2,1)",
        };
    }

    const handleImageClick = (index) => {
        if (index === activeIndex && onViewArtwork) {
            onViewArtwork(artworks[index]);
        }
    };

    // Animation variants for text
    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <section ref={sectionRef} className="circular-gallery-section" id="artworks">
            {/* Header - scrolls normally */}
            <div className="gallery-header">
                <span className="gallery-label">Portfolio</span>
                <h2 className="gallery-title">ART WORKS</h2>
            </div>

            {/* Pinned Container - this gets fixed during scroll */}
            <div ref={containerRef} className="gallery-pinned-container">
                {/* Main Content - Split Layout */}
                <div className="gallery-content">
                    {/* Left Side - Artwork Info */}
                    <div className="artwork-info-panel">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="info-content"
                            >
                                <span className="artwork-category">{activeArtwork.category}</span>
                                <h3 className="artwork-title">{activeArtwork.title}</h3>
                                <motion.p className="artwork-description">
                                    {activeArtwork.description.split(" ").map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * i }}
                                            style={{ display: "inline-block" }}
                                        >
                                            {word}&nbsp;
                                        </motion.span>
                                    ))}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Counter */}
                        <div className="artwork-counter">
                            <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                            <span className="counter-sep">/</span>
                            <span className="counter-total">{String(artworks.length).padStart(2, '0')}</span>
                        </div>

                        {/* Scroll hint */}
                        <div className="scroll-hint">
                            <span>Scroll to explore</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Right Side - Circular Image Gallery */}
                    <div className="image-gallery-panel" ref={imageContainerRef}>
                        <div className="circular-image-container">
                            {artworks.map((artwork, index) => (
                                <img
                                    key={artwork.id}
                                    src={artwork.src}
                                    alt={artwork.title}
                                    className="gallery-image"
                                    style={getImageStyle(index)}
                                    onClick={() => handleImageClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .circular-gallery-section {
                    background: #fcf7e7;
                }

                .gallery-header {
                    text-align: center;
                    padding: 80px 40px 40px;
                    background: #fcf7e7;
                }

                .gallery-pinned-container {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fcf7e7;
                    padding: 0 40px;
                }

                .gallery-label {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                    color: #b8963f;
                    margin-bottom: 20px;
                    padding: 8px 20px;
                    border: 1px solid rgba(185, 150, 63, 0.3);
                    border-radius: 30px;
                    background: rgba(185, 150, 63, 0.05);
                }

                .gallery-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(2.5rem, 6vw, 4rem);
                    font-weight: 400;
                    color: #1a1a1a;
                    margin: 0;
                    letter-spacing: 8px;
                }

                .gallery-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    max-width: 1300px;
                    margin: 0 auto;
                    align-items: center;
                    min-height: 500px;
                }

                /* Left Panel - Artwork Info */
                .artwork-info-panel {
                    padding: 40px 20px 40px 0;
                }

                .info-content {
                    margin-bottom: 40px;
                }

                .artwork-category {
                    display: inline-block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #b8963f;
                    margin-bottom: 15px;
                    padding: 6px 16px;
                    background: rgba(185, 150, 63, 0.1);
                    border-radius: 20px;
                }

                .artwork-title {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: clamp(2rem, 4vw, 2.8rem);
                    font-weight: 600;
                    font-style: italic;
                    color: #1a1a1a;
                    margin: 0 0 20px 0;
                    line-height: 1.2;
                }

                .artwork-description {
                    font-family: 'Georgia', serif;
                    font-size: 1.1rem;
                    line-height: 1.9;
                    color: #4b5563;
                    margin: 0;
                }

                .artwork-counter {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    margin-bottom: 30px;
                }

                .counter-current {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 3rem;
                    font-weight: 600;
                    color: #b8963f;
                }

                .counter-sep {
                    color: #d4c4a0;
                    font-size: 1.5rem;
                }

                .counter-total {
                    font-size: 1.2rem;
                    color: #8a8a8a;
                }

                .scroll-hint {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #8a8a8a;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                .scroll-hint svg {
                    animation: bounce 2s ease-in-out infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }

                /* Right Panel - Circular Gallery */
                .image-gallery-panel {
                    position: relative;
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .circular-image-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    perspective: 1000px;
                }

                .gallery-image {
                    position: absolute;
                    width: 380px;
                    height: 500px;
                    left: 50%;
                    top: 50%;
                    margin-left: -190px;
                    margin-top: -250px;
                    object-fit: cover;
                    border-radius: 16px;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                }

                .gallery-image:hover {
                    box-shadow: 0 30px 70px rgba(185, 150, 63, 0.3);
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .gallery-content {
                        gap: 40px;
                    }

                    .gallery-image {
                        width: 320px;
                        height: 420px;
                        margin-left: -160px;
                        margin-top: -210px;
                    }
                }

                @media (max-width: 768px) {
                    .circular-gallery-section {
                        padding: 60px 20px 80px;
                    }

                    .gallery-content {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }

                    .artwork-info-panel {
                        padding: 0;
                        text-align: center;
                        order: 2;
                    }

                    .image-gallery-panel {
                        order: 1;
                        height: 400px;
                    }

                    .gallery-image {
                        width: 240px;
                        height: 320px;
                        margin-left: -120px;
                        margin-top: -160px;
                    }

                    .artwork-counter {
                        justify-content: center;
                    }

                    .scroll-hint {
                        justify-content: center;
                    }

                    .counter-current {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default CircularArtworkGallery;
