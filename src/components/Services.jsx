import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);
    const ctaTextRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [ctaAnimated, setCtaAnimated] = useState(false);

    const services = [
        {
            label: 'Floral',
            title: 'Floral Preservation',
            description: 'Your special flowers—wedding, farewell, or celebration—preserved forever, exactly as they were.',
            image: '/assets1/IMG_2094.JPG'
        },
        {
            label: 'Frames',
            title: 'Personalised Frames',
            description: 'Thoughtfully designed frames that hold names, dates, messages, and emotions.',
            image: '/assets1/IMG_2095.JPG'
        },
        {
            label: 'Decor',
            title: 'Letter Blocks',
            description: 'Custom letter creations that spell stories—perfect for gifting or décor.',
            image: '/assets1/IMG_2096.JPG'
        },
        {
            label: 'Signage',
            title: 'Name Boards',
            description: 'Handmade name boards that add warmth and personality to any space.',
            image: '/assets1/IMG_2011.JPG'
        },
        {
            label: 'Gifts',
            title: 'Keychains',
            description: 'Small, personal keepsakes made to carry a memory wherever you go.',
            image: '/assets1/IMG_2092.JPG'
        },
        {
            label: 'Functional',
            title: 'Wooden Serving Trays',
            description: 'Functional, elegant trays crafted to elevate everyday moments.',
            image: '/assets1/IMG_2011.JPG'
        },
        {
            label: 'Nail Art',
            title: 'Resin Nail Art',
            description: 'Tiny art pieces for your hands—customised, detailed, and unique.',
            image: '/assets1/IMG_2092.JPG'
        },
        {
            label: 'Teak',
            title: 'Teak Wood Frames',
            description: 'Timeless teak wood frames that give your memories the strength and elegance they deserve.',
            image: '/assets1/IMG_2011.JPG'
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

            // Cards initial reveal (all cards fade in)
            cards.forEach((card, index) => {
                gsap.set(card, { opacity: 0 });

                gsap.to(card, {
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3 + index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Main circular rotation scroll animation
            // 300° rotation = 5 steps to go from image 1 to image 6 without looping
            const rotationAmount = (services.length - 1) * (360 / services.length); // Stops at last image
            const horizontalTween = gsap.to(track, {
                rotationY: -rotationAmount,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 3}`, // 3 viewport heights of scroll
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        setProgress(self.progress);
                        const newIndex = Math.min(
                            Math.floor(self.progress * services.length),
                            services.length - 1
                        );
                        setCurrentIndex(newIndex);

                        // Scale animation for active card
                        const cardsLength = services.length;
                        const currentRotation = -rotationAmount * self.progress;

                        cards.forEach((card, index) => {
                            const cardAngle = (index * (360 / cardsLength)) + currentRotation;
                            const normalizedAngle = ((cardAngle % 360) + 360) % 360;

                            // Card is "active" when it's facing front (angle close to 0 or 360)
                            const distanceFromFront = Math.min(
                                Math.abs(normalizedAngle),
                                Math.abs(360 - normalizedAngle)
                            );

                            // Scale based on distance from front (0 = front, 180 = back)
                            const scale = distanceFromFront < 30
                                ? 1.15 - (distanceFromFront / 30) * 0.15 // 1.15 to 1.0
                                : 1;

                            // Opacity based on distance from front (1.0 at front, 0.4 at back)
                            const opacity = distanceFromFront < 60
                                ? 1 - (distanceFromFront / 60) * 0.6 // 1.0 to 0.4
                                : 0.4;

                            gsap.to(card, {
                                scale: scale,
                                opacity: opacity,
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                        });
                    }
                }
            });

        }, section);

        return () => ctx.revert();
    }, [services.length]);

    // CTA Text Animation (SplitText-like effect)
    useEffect(() => {
        // Small delay to ensure DOM is ready after pinned section
        const timer = setTimeout(() => {
            const ctaSection = ctaTextRef.current;
            if (!ctaSection) return;

            const chars = ctaSection.querySelectorAll('.cta-char');
            const ctaBtn = ctaSection.querySelector('.services-cta');

            if (chars.length === 0) return;

            // Set initial state with GSAP
            gsap.set(chars, { opacity: 0, y: 30, immediateRender: true });
            gsap.set(ctaBtn, { opacity: 0, y: 30, immediateRender: true });

            // Create scroll trigger for animation
            ScrollTrigger.create({
                trigger: ctaSection,
                start: "top 85%",
                // markers: true,
                onEnter: () => {
                    // Animate characters with stagger
                    gsap.to(chars, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.015,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: () => {
                            // Animate button after text
                            gsap.to(ctaBtn, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "back.out(1.5)"
                            });
                        }
                    });
                }
            });

            // Refresh ScrollTrigger after pinned sections
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power2.inOut'
            });
        }
    };

    return (
        <section ref={sectionRef} className="services-section" id="services">
            {/* Pinned Container - Header + Carousel together */}
            <div ref={containerRef} className="services-container">
                {/* Header - Now inside the pinned container */}
                <div ref={headerRef} className="services-header">
                    <div className="services-header-content">
                        <span className="services-label">Services</span>
                        <h2 className="services-title">WHAT CAN I DO FOR YOU?</h2>
                    </div>
                </div>

                <div className="services-inner">
                    {/* 3D Circular Track - Left Side */}
                    <div ref={trackRef} className="services-carousel">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className="service-card"
                                style={{
                                    transform: `rotateY(${index * (360 / services.length)}deg) translateZ(380px)`
                                }}
                            >
                                <div className="service-card-image">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        loading="lazy"
                                        className="service-image"
                                    />
                                    <div className="service-card-overlay">
                                        <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                </div>
                                <div className="service-card-info">
                                    <h3 className="service-card-title">{service.title}</h3>
                                    <p className="service-card-desc">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Active Service Content */}
                    <div className="service-content-box">
                        <div className="service-content-inner">
                            <span className="service-content-label">
                                {services[currentIndex].label}
                            </span>
                            <h3 className="service-content-title">
                                {services[currentIndex].title}
                            </h3>
                            <p className="service-content-desc">
                                {services[currentIndex].description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fixed UI Elements */}
                <div className="services-ui">
                    <div className="services-counter"></div>
                    {/* <div className="services-progress-bar">
                        <div
                            className="services-progress-fill"
                            style={{ width: `${progress * 100}%` }}
                        ></div>
                    </div> */}
                    <div className="services-scroll-hint">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        </svg>
                    </div>
                </div>
            </div>

            {/* Bottom CTA - No box, animated text */}
            <div className="services-cta-section" ref={ctaTextRef}>
                <p className="services-cta-text">
                    {'Everything is custom-made to suit your idea, your occasion, and your preferences. You can choose    the colours, materials, size, and details!'.split('').map((char, i) => (
                        <span key={i} className="cta-char" style={{ display: 'inline-block' }}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </p>
                <a href="#contact" onClick={scrollToContact} className="services-cta">
                    Start Your Custom Order
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            {/* Spacer for smooth transition */}
            <div className="services-spacer"></div>

            <style>{`
                .services-section {
                    background: #fcf7e7;
                }

                .services-spacer {
                    height: 40px;
                    background: #fcf7e7;
                }

                .services-header-content {
                    max-width: 700px;
                    margin: 0 auto;
                    position: relative;
                }

                .services-label {
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

                .services-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 400;
                    color: #1a1a1a;
                    margin: 0 0 20px 0;
                    line-height: 1.1;
                    letter-spacing: 6px;
                }

                .services-subtitle {
                    font-size: 1rem;
                    color: #6b6b6b;
                    margin: 0;
                    line-height: 1.8;
                }

                /* Pinned Container - Header + Carousel together */
                .services-container {
                    height: 100vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    background: #fcf7e7;
                }

                /* Header inside pinned container */
                .services-header {
                    padding: 20px 40px 20px;
                    text-align: center;
                    flex-shrink: 0;
                    background: #fcf7e7;
                    position: relative;
                    z-index: 10;
                }

                .services-inner {
                    position: relative;
                    flex: 1;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    padding: 20px 60px 0 280px;
                    perspective: 2000px;
                    overflow: hidden;
                    min-height: 0;
                }

                /* 3D Circular Carousel */
                .services-carousel {
                    position: relative;
                    width: 400px;
                    height: 470px;
                    transform-style: preserve-3d;
                    will-change: transform;
                    flex-shrink: 0;
                }

                /* Service Card */
                .service-card {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -150px;
                    margin-top: -190px;
                    width: 300px;
                    cursor: pointer;
                    will-change: opacity, transform;
                    backface-visibility: hidden;
                    transition: transform 0.3s ease-out;
                }

                .service-card-image {
                    position: relative;
                    width: 100%;
                    height: 310px;
                    border-radius: 10px;
                    overflow: hidden;
                    background: #e8dfd3;
                }

                .service-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }

                .service-card:hover .service-image {
                    transform: scale(1.05);
                }

                .service-card-overlay {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .service-card:hover .service-card-overlay {
                    opacity: 1;
                }

                .service-number {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 45px;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 50%;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.17rem;
                    font-weight: 600;
                    color: #b8963f;
                }

                .service-card-info {
                    display: none;
                }

                /* Right Side - Content Box */
                .service-content-box {
                    flex: 0 0 520px;
                    max-width: 520px;
                    margin-top: 90px;
                    padding-left: 40px;
                    margin-left: 20%;
                    margin-right: 60px;
                }

                .service-content-inner {
                    position: relative;
                }

                .service-content-label {
                    display: inline-block;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: #b8963f;
                    margin-bottom: 20px;
                    padding: 8px 16px;
                    border: 1px solid rgba(185, 150, 63, 0.3);
                    border-radius: 30px;
                    background: rgba(185, 150, 63, 0.05);
                }

                .service-content-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2.8rem;
                    font-weight: 500;
                    font-style: italic;
                    color: #1a1a1a;
                    margin: 0 0 24px 0;
                    line-height: 1.2;
                }

                .service-content-desc {
                    font-size: 1.05rem;
                    color: #666;
                    line-height: 1.9;
                    margin: 0;
                }

                .service-content-cta {
                    display: none;
                }

                .service-card-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    font-style: italic;
                    color: #1a1a1a;
                    margin: 0 0 6px 0;
                    transition: color 0.3s ease;
                }

                .service-card:hover .service-card-title {
                    color: #b8963f;
                }

                .service-card-desc {
                    font-size: 0.475rem;
                    color: #666;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Fixed UI */
                .services-ui {
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

                .services-counter {
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                }

                .services-counter-current {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    font-weight: 600;
                    color: #b8963f;
                }

                .services-counter-sep {
                    color: #ccc;
                    font-size: 1rem;
                }

                .services-counter-total {
                    font-size: 0.9rem;
                    color: #8a8a8a;
                }

                .services-progress-bar {
                    flex: 1;
                    max-width: 300px;
                    height: 2px;
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 2px;
                    margin: 0 40px;
                    overflow: hidden;
                }

                .services-progress-fill {
                    height: 100%;
                    background: #b8963f;
                    border-radius: 2px;
                    transition: width 0.1s ease-out;
                }

                .services-scroll-hint {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #8a8a8a;
                }

                .services-scroll-hint svg {
                    animation: slideArrow 1.5s ease-in-out infinite;
                }

                @keyframes slideArrow {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }

                /* Bottom CTA Section - No box, clean layout */
                .services-cta-section {
                    text-align: center;
                    padding: 100px 40px;
                    background: #fcf7e7;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .services-cta-text {
                    font-size: 2.15rem;
                    color: #505050ff;
                    line-height: 2;
                    margin: 0 0 50px 0;
                    font-weight: 800;
                }

                .cta-char {
                    display: inline-block;
                }

                .services-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: linear-gradient(135deg, #c9a961 0%, #b8963f 100%);
                    color: #1a1a1a;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    border-radius: 50px;
                    transition: box-shadow 0.3s ease, background 0.3s ease;
                    box-shadow: 0 4px 15px rgba(185, 150, 63, 0.3);
                    pointer-events: all;
                }

                .services-cta:hover {
                    box-shadow: 0 8px 25px rgba(185, 150, 63, 0.4);
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .services-header {
                        padding: 80px 30px 30px;
                    }

                    .services-inner {
                        flex-direction: column;
                        padding: 20px 30px;
                        gap: 20px;
                        overflow: hidden;
                    }

                    .services-carousel {
                        width: 100%;
                        max-width: 350px;
                        height: 320px;
                        margin: 0 auto;
                    }

                    .service-content-box {
                        flex: 0 0 auto;
                        max-width: 100%;
                        width: 100%;
                        margin-right: 0;
                        margin-left: 0;
                        padding: 15px 20px;
                        padding-top: 52px;
                        order: -1;
                        text-align: center;
                    }

                    .service-content-label {
                        margin-bottom: 10px;
                    }

                    .service-content-title {
                        font-size: 1.6rem;
                        margin-bottom: 10px;
                    }

                    .service-content-desc {
                        font-size: 0.95rem;
                    }

                    .service-card {
                        width: 260px;
                        margin-left: -130px;
                        margin-top: -220px;
                        backface-visibility: hidden;
                    }

                    .service-card-image {
                        height: 260px;
                    }

                    .services-ui {
                        left: 30px;
                        right: 30px;
                        bottom: 25px;
                    }
                }

                @media (max-width: 768px) {
                    .services-header {
                        padding: 40px 20px 0px;
                    }

                    .services-inner {
                        padding: 0px 20px;
                        gap: 15px;
                    }

                    .service-content-box {
                        padding: 0px 15px;
                        margin-left: 0;
                    }

                    .service-content-label {
                        margin-top: 65px;
                        margin-bottom: 20px;
                        padding: 6px 14px;
                        font-size: 0.65rem;
                    }

                    .service-content-number {
                        font-size: 2rem;
                    }

                    .service-content-title {
                        font-size: 1.4rem;
                        margin: 0 0 8px 0;
                    }

                    .service-content-desc {
                        font-size: 0.85rem;
                        margin: 0 0 10px 0;
                        line-height: 1.6;
                    }

                    .service-card {
                        width: 234px;
                        margin-top: -210px;
                        margin-left: -130px;
                    }

                    .service-card-image {
                        height: 300px;
                    }

                    .services-carousel {
                        height: 370px;
                        transform-style: preserve-3d;
                    }

                    /* Hide back-facing cards on mobile for cleaner initial view */
                    .service-card {
                        backface-visibility: hidden;
                    }

                    /* Reduce translateZ for mobile to prevent overlap */
                    .services-carousel .service-card {
                        transform-origin: center center;
                    }

                    .services-ui {
                        left: 20px;
                        right: 20px;
                        bottom: 20px;
                    }

                    .services-progress-bar {
                        display: none;
                    }

                    .services-counter-current {
                        font-size: 1.6rem;
                    }

                    .services-cta-section {
                        padding: 30px 15px;
                    }

                    .services-cta-box {
                        padding: 30px 25px;
                        border-radius: 16px;
                    }

                    .services-cta-box .services-subtitle {
                        font-size: 0.95rem;
                        line-height: 1.7;
                        margin: 0 0 20px 0;
                    }

                    .services-cta {
                        padding: 14px 28px;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </section >
    );
};

export default Services;
