import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const WorksGallery = ({ onViewArtwork }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // All artworks from the assets folder
    const artworks = [
        {
            id: 1,
            image: '/assets/aigles.jpg',
            title: 'Aigles Majestueux',
            category: 'Nature',
            medium: 'Illustration',
            year: '2024'
        },
        {
            id: 2,
            image: '/assets/coqs-et-poules.jpg',
            title: 'Coqs et Poules',
            category: 'Wildlife',
            medium: 'Traditional Art',
            year: '2024'
        },
        {
            id: 3,
            image: '/assets/portrait_artwork.png',
            title: 'Elegant Grace',
            category: 'Portraits',
            medium: 'Oil on Canvas',
            year: '2024'
        },
        {
            id: 4,
            image: '/assets/landscape_painting.png',
            title: 'Golden Horizon',
            category: 'Landscapes',
            medium: 'Acrylic on Canvas',
            year: '2023'
        },
        {
            id: 5,
            image: '/assets/abstract_art.png',
            title: 'Geometric Harmony',
            category: 'Abstract',
            medium: 'Mixed Media',
            year: '2024'
        },
        {
            id: 6,
            image: '/assets/still_life.png',
            title: 'Floral Symphony',
            category: 'Still Life',
            medium: 'Oil on Canvas',
            year: '2023'
        },
        {
            id: 7,
            image: '/assets/environment_art.png',
            title: 'Enchanted Forest',
            category: 'Environment',
            medium: 'Digital Art',
            year: '2024'
        },
        {
            id: 8,
            image: '/assets/gallery/cacatoës-et-magnolia.jpg',
            title: 'Cacatoës et Magnolia',
            category: 'Nature',
            medium: 'Illustration',
            year: '2024'
        },
        {
            id: 9,
            image: '/assets/gallery/carpocoris.jpg',
            title: 'Carpocoris',
            category: 'Nature',
            medium: 'Scientific Illustration',
            year: '2024'
        },
        {
            id: 10,
            image: '/assets/gallery/couronne-imperiale.jpg',
            title: 'Couronne Impériale',
            category: 'Botanical',
            medium: 'Watercolor',
            year: '2023'
        },
        {
            id: 11,
            image: '/assets/gallery/cygne-sauvage.jpg',
            title: 'Cygne Sauvage',
            category: 'Wildlife',
            medium: 'Illustration',
            year: '2024'
        },
        {
            id: 12,
            image: '/assets/gallery/cytises-et-digitales.jpg',
            title: 'Cytises et Digitales',
            category: 'Botanical',
            medium: 'Traditional Art',
            year: '2023'
        },
        {
            id: 13,
            image: '/assets/gallery/faisans-ordinaires.jpg',
            title: 'Faisans Ordinaires',
            category: 'Wildlife',
            medium: 'Illustration',
            year: '2024'
        },
        {
            id: 14,
            image: '/assets/gallery/martinets-et-chèvrefeuille.jpg',
            title: 'Martinets et Chèvrefeuille',
            category: 'Nature',
            medium: 'Watercolor',
            year: '2024'
        },
        {
            id: 15,
            image: '/assets/gallery/nénuphar.jpg',
            title: 'Nénuphar',
            category: 'Botanical',
            medium: 'Watercolor',
            year: '2023'
        },
        {
            id: 16,
            image: '/assets/gallery/paons-et-pavots.jpg',
            title: 'Paons et Pavots',
            category: 'Nature',
            medium: 'Illustration',
            year: '2024'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const track = trackRef.current;
        const header = headerRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!section || !container || !track || cards.length === 0) return;

        const ctx = gsap.context(() => {
            // Calculate scroll distance
            const totalWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth + 100;

            // Header entrance animation (vertical scroll in)
            gsap.fromTo(
                header.children,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        end: 'top 30%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Cards initial reveal (during vertical scroll)
            cards.forEach((card, index) => {
                gsap.set(card, { opacity: 0, y: 50 });

                if (index < 4) { // First visible cards
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 50%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            });

            // Main horizontal scroll animation
            const horizontalTween = gsap.to(track, {
                x: -scrollDistance,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        setProgress(self.progress);
                        const newIndex = Math.min(
                            Math.floor(self.progress * artworks.length),
                            artworks.length - 1
                        );
                        setCurrentIndex(newIndex);
                    }
                }
            });

            // Animate cards as they enter view during horizontal scroll
            cards.forEach((card, index) => {
                if (index >= 4) { // Cards that appear during horizontal scroll
                    ScrollTrigger.create({
                        trigger: card,
                        containerAnimation: horizontalTween,
                        start: 'left 95%',
                        onEnter: () => {
                            gsap.to(card, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                        }
                    });
                }
            });

        }, section);

        return () => ctx.revert();
    }, [artworks.length]);

    const handleViewClick = (artwork) => {
        if (onViewArtwork) {
            onViewArtwork(artwork);
        }
    };

    return (
        <section ref={sectionRef} className="works-section" id="works">
            {/* Header - Scrolls in vertically first */}
            <div ref={headerRef} className="works-header">
                <div className="header-content">
                    <span className="works-label">Collection</span>
                    <h2 className="works-title">Artist Works</h2>
                    <p className="works-subtitle">Explore the complete portfolio of artworks</p>
                </div>
            </div>

            {/* Pinned Container for Horizontal Scroll */}
            <div ref={containerRef} className="works-container">
                <div className="works-inner">
                    {/* Track */}
                    <div ref={trackRef} className="works-track">
                        {artworks.map((artwork, index) => (
                            <div
                                key={artwork.id}
                                ref={el => cardsRef.current[index] = el}
                                className="work-card"
                                onClick={() => handleViewClick(artwork)}
                            >
                                <div className="card-image">
                                    <img
                                        src={artwork.image}
                                        alt={artwork.title}
                                        loading="lazy"
                                    />
                                    <div className="card-hover">
                                        <button className="expand-btn">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <span className="card-category">{artwork.category}</span>
                                    <h3 className="card-title">{artwork.title}</h3>
                                    <p className="card-meta">{artwork.medium} • {artwork.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fixed UI Elements */}
                    <div className="works-ui">
                        <div className="counter">
                            <span className="counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
                            <span className="counter-sep">/</span>
                            <span className="counter-total">{String(artworks.length).padStart(2, '0')}</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress * 100}%` }}
                            ></div>
                        </div>
                        <div className="scroll-hint">
                            <span>Scroll</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .works-section {
                    background: #fcf7e7;
                }

                /* Header Section - Vertical Scroll Entry */
                .works-header {
                    padding: 120px 60px 60px;
                    text-align: center;
                }

                .header-content {
                    max-width: 600px;
                    margin: 0 auto;
                }

                .works-label {
                    display: inline-block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: #b8963f;
                    margin-bottom: 15px;
                }

                .works-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 500;
                    color: #1a1a1a;
                    margin: 0 0 15px 0;
                }

                .works-subtitle {
                    font-size: 1.05rem;
                    color: #6b6b6b;
                    margin: 0;
                }

                /* Pinned Container */
                .works-container {
                    height: 100vh;
                    overflow: hidden;
                }

                .works-inner {
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 60px;
                }

                /* Horizontal Track */
                .works-track {
                    display: flex;
                    gap: 35px;
                    padding-right: 150px;
                    will-change: transform;
                }

                /* Work Card */
                .work-card {
                    flex-shrink: 0;
                    width: 350px;
                    cursor: pointer;
                    will-change: opacity, transform;
                }

                .card-image {
                    position: relative;
                    width: 100%;
                    height: 440px;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #e8dfd3;
                }

                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .work-card:hover .card-image img {
                    transform: scale(1.05);
                }

                .card-hover {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.25);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .work-card:hover .card-hover {
                    opacity: 1;
                }

                .expand-btn {
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    color: #1a1a1a;
                    cursor: pointer;
                    transform: scale(0.85);
                    transition: all 0.3s ease;
                }

                .work-card:hover .expand-btn {
                    transform: scale(1);
                }

                .expand-btn:hover {
                    background: #b8963f;
                    color: white;
                }

                .card-info {
                    padding: 18px 4px;
                }

                .card-category {
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #b8963f;
                }

                .card-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.35rem;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin: 8px 0;
                    transition: color 0.3s ease;
                }

                .work-card:hover .card-title {
                    color: #b8963f;
                }

                .card-meta {
                    font-size: 0.85rem;
                    color: #8a8a8a;
                    margin: 0;
                }

                /* Fixed UI */
                .works-ui {
                    position: fixed;
                    bottom: 20px;
                    left: 60px;
                    right: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    z-index: 100;
                    pointer-events: none;
                }

                .counter {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                }

                .counter-current {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    font-weight: 600;
                    color: #b8963f;
                }

                .counter-sep {
                    color: #ccc;
                    font-size: 1rem;
                }

                .counter-total {
                    font-size: 0.9rem;
                    color: #8a8a8a;
                }

                .progress-bar {
                    flex: 1;
                    max-width: 300px;
                    height: 2px;
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 2px;
                    margin: 0 40px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: #b8963f;
                    border-radius: 2px;
                    transition: width 0.1s ease-out;
                }

                .scroll-hint {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #8a8a8a;
                }

                .scroll-hint svg {
                    animation: slideArrow 1.5s ease-in-out infinite;
                }

                @keyframes slideArrow {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .works-header {
                        padding: 100px 40px 50px;
                    }

                    .works-inner {
                        padding-left: 40px;
                    }

                    .work-card {
                        width: 300px;
                    }

                    .card-image {
                        height: 380px;
                    }

                    .works-ui {
                        left: 40px;
                        right: 40px;
                        bottom: 40px;
                    }
                }

                @media (max-width: 768px) {
                    .works-header {
                        padding: 80px 25px 40px;
                    }

                    .works-inner {
                        padding-left: 25px;
                    }

                    .works-track {
                        gap: 20px;
                    }

                    .work-card {
                        width: 260px;
                    }

                    .card-image {
                        height: 320px;
                    }

                    .works-ui {
                        left: 25px;
                        right: 25px;
                        bottom: 30px;
                    }

                    .progress-bar {
                        display: none;
                    }

                    .counter-current {
                        font-size: 1.6rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default WorksGallery;
