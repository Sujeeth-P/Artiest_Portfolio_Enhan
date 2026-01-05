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

    // All artworks from the assets folder - PITTURA products
    const artworks = [
        {
            id: 1,
            image: '/assets1/IMG_2011.JPG',
            title: 'Wedding Floral Preservation',
            category: 'Floral',
            medium: 'Resin Art',
            year: '2025'
        },
        {
            id: 2,
            image: '/assets1/IMG_2092.JPG',
            title: 'Custom Name Frame',
            category: 'Frames',
            medium: 'Handcrafted',
            year: '2025'
        },
        {
            id: 3,
            image: '/assets1/IMG_2093.JPG',
            title: 'Letter Block Creation',
            category: 'Decor',
            medium: 'Mixed Media',
            year: '2025'
        },
        {
            id: 4,
            image: '/assets1/IMG_2094.JPG',
            title: 'Baby Name Board',
            category: 'Name Boards',
            medium: 'Wood & Paint',
            year: '2025'
        },
        {
            id: 5,
            image: '/assets1/IMG_2095.JPG',
            title: 'Teak Wood Frame',
            category: 'Premium',
            medium: 'Teak Wood',
            year: '2025'
        },
        {
            id: 6,
            image: '/assets1/IMG_2096.JPG',
            title: 'Personalized Gift Set',
            category: 'Gifts',
            medium: 'Handcrafted',
            year: '2025'
        },
        {
            id: 7,
            image: '/assets1/IMG_2011.JPG',
            title: 'Anniversary Floral Frame',
            category: 'Floral',
            medium: 'Resin & Flowers',
            year: '2025'
        },
        {
            id: 8,
            image: '/assets1/IMG_2092.JPG',
            title: 'Wooden Serving Tray',
            category: 'Trays',
            medium: 'Wood & Resin',
            year: '2025'
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
        <section ref={sectionRef} className="works-section" id="artworks">
            {/* Header - Scrolls in vertically first */}
            <div ref={headerRef} className="works-header">
                <div className="header-content">
                    <span className="works-label">Portfolio</span>
                    <h2 className="works-title">ART WORKS</h2>
                    <p className="works-subtitle">
                        Some moments are too important to fade with time. I believe preserving them allows us to
                        relive emotions, stories, and connections, long after the moment has passed.
                    </p>
                    <p className="works-subtitle" style={{ marginTop: '10px', fontSize: '0.95rem' }}>
                        Explore my complete portfolio to see how your memories are transformed into handcrafted art.
                    </p>
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

                /* Header Section - Modern Design */
                .works-header {
                    padding: 100px 40px 80px;
                    text-align: center;
                    position: relative;
                    background: linear-gradient(180deg, #fcf7e7 0%, #f8f3e3 100%);
                }

                .header-content {
                    max-width: 700px;
                    margin: 0 auto;
                    position: relative;
                }

                /* Decorative top element */
                .header-decoration {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 25px;
                }

                .decoration-line {
                    width: 60px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, #c9a961 50%, transparent 100%);
                }

                .decoration-diamond {
                    color: #c9a961;
                    font-size: 0.7rem;
                    animation: pulse-diamond 2s ease-in-out infinite;
                }

                @keyframes pulse-diamond {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                .works-label {
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

                .works-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(3rem, 7vw, 5rem);
                    font-weight: 400;
                    color: #1a1a1a;
                    margin: 0 0 20px 0;
                    line-height: 1.1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0;
                }

                .title-accent {
                    color: #c9a961;
                    font-weight: 300;
                    font-style: italic;
                    font-size: 0.7em;
                    letter-spacing: 8px;
                }

                .title-main {
                    letter-spacing: 12px;
                    font-weight: 500;
                }

                /* Decorative underline */
                .title-underline {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 35px;
                }

                .underline-wing {
                    width: 50px;
                    height: 1px;
                    background: #c9a961;
                }

                .underline-wing.left {
                    background: linear-gradient(90deg, transparent, #c9a961);
                }

                .underline-wing.right {
                    background: linear-gradient(90deg, #c9a961, transparent);
                }

                .underline-center {
                    width: 8px;
                    height: 8px;
                    background: #c9a961;
                    transform: rotate(45deg);
                }

                /* Description text */
                .works-description {
                    max-width: 550px;
                    margin: 0 auto 40px;
                }

                .works-subtitle {
                    font-size: 1rem;
                    color: #6b6b6b;
                    margin: 0 0 12px;
                    line-height: 1.8;
                }

                .works-subtitle.main-text {
                    font-size: 1.2rem;
                    color: #4a4a4a;
                    font-weight: 500;
                    margin-bottom: 15px;
                }

                .works-subtitle em {
                    color: #c9a961;
                    font-style: italic;
                }

                .works-cta-text {
                    font-size: 0.95rem;
                    color: #888;
                    margin-top: 20px;
                }

                .works-cta-text .highlight {
                    color: #b8963f;
                    font-weight: 500;
                }

                /* Scroll indicator */
                .header-scroll-hint {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    margin-top: 30px;
                }

                .scroll-text {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #b8963f;
                }

                .scroll-arrow {
                    color: #c9a961;
                    animation: bounce-arrow 2s ease-in-out infinite;
                }

                @keyframes bounce-arrow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(8px); }
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
