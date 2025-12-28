import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Services = () => {
    const wrapperRef = useRef(null);
    const navRef = useRef(null);
    const bgRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const services = [
        {
            title: 'Custom Portraits',
            heading: 'Timeless Portraits',
            description: 'Capture the essence of your loved ones with a beautifully crafted portrait. Perfect for gifts, memorials, or personal collections.',
            features: ['Individual & Family Portraits', 'Pet Portraits', 'Memorial Paintings', 'Work from Photos'],
            price: '$800',
            image: '/assets/portrait_artwork.png'
        },
        {
            title: 'Custom Paintings',
            heading: 'Bespoke Artworks',
            description: 'Commission a unique artwork tailored to your space and style. From abstract to realism, I create pieces that speak to you.',
            features: ['Any Size & Style', 'Interior Design Matching', 'Corporate Art', 'Multiple Revisions'],
            price: '$1,200',
            image: '/assets/landscape_painting.png'
        },
        {
            title: 'Illustration & Design',
            heading: 'Creative Illustrations',
            description: 'Professional illustrations for books, branding, events, and more. High-quality artwork for commercial and personal use.',
            features: ['Book Covers & Interiors', 'Wedding Invitations', 'Brand Illustrations', 'Digital & Print Ready'],
            price: '$500',
            image: '/assets/abstract_art.png'
        }
    ];

    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    // Initialize GSAP animations
    useEffect(() => {
        gsap.registerPlugin();

        // Create custom ease
        gsap.config({ force3D: true });
    }, []);

    // Handle Flip button animations
    useEffect(() => {
        const wrapper = navRef.current;
        const bg = bgRef.current;
        if (!wrapper || !bg) return;

        const buttons = wrapper.querySelectorAll('.service-tab-button');
        const activeButton = buttons[activeIndex];

        // Move bg to active button on mount/change
        if (activeButton && bg.parentElement !== activeButton) {
            activeButton.appendChild(bg);
            gsap.set(bg, { x: 0, y: 0, width: '100%', height: '100%' });
        }

        const handleMouseEnter = (button) => {
            if (!bg) return;
            const state = {
                x: bg.offsetLeft,
                y: bg.offsetTop,
                width: bg.offsetWidth,
                height: bg.offsetHeight
            };
            button.appendChild(bg);

            gsap.fromTo(bg,
                {
                    x: state.x - bg.offsetLeft,
                    y: state.y - bg.offsetTop,
                    width: state.width,
                    height: state.height
                },
                {
                    x: 0,
                    y: 0,
                    width: '100%',
                    height: '100%',
                    duration: 0.4,
                    ease: 'power2.out'
                }
            );
        };

        const handleMouseLeave = () => {
            if (!bg) return;
            const currentActiveButton = wrapper.querySelector('.service-tab-button.active');
            if (currentActiveButton && bg.parentElement !== currentActiveButton) {
                const state = {
                    x: bg.offsetLeft,
                    y: bg.offsetTop
                };
                currentActiveButton.appendChild(bg);

                gsap.fromTo(bg,
                    {
                        x: state.x - bg.offsetLeft,
                        y: state.y - bg.offsetTop
                    },
                    {
                        x: 0,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    }
                );
            }
        };

        buttons.forEach((button) => {
            button.addEventListener('mouseenter', () => handleMouseEnter(button));
            button.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            buttons.forEach((button) => {
                button.removeEventListener('mouseenter', () => handleMouseEnter(button));
                button.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [activeIndex]);

    // Handle tab switching with animations
    const switchTab = (index) => {
        if (isAnimating || index === activeIndex) return;
        setIsAnimating(true);

        const wrapper = wrapperRef.current;
        const outgoingContent = wrapper.querySelector('.service-content-item.active');
        const incomingContent = wrapper.querySelectorAll('.service-content-item')[index];
        const outgoingVisual = wrapper.querySelector('.service-visual-item.active');
        const incomingVisual = wrapper.querySelectorAll('.service-visual-item')[index];

        const outgoingLines = outgoingContent?.querySelectorAll('.fade-element') || [];
        const incomingLines = incomingContent?.querySelectorAll('.fade-element') || [];

        const timeline = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
                outgoingContent?.classList.remove('active');
                outgoingVisual?.classList.remove('active');
                setActiveIndex(index);
                setIsAnimating(false);
            }
        });

        incomingContent?.classList.add('active');
        incomingVisual?.classList.add('active');

        timeline
            .to(outgoingLines, { y: '-2em', autoAlpha: 0, duration: 0.4 }, 0)
            .to(outgoingVisual, { autoAlpha: 0, xPercent: 3, duration: 0.5 }, 0)
            .fromTo(incomingLines,
                { y: '2em', autoAlpha: 0 },
                { y: '0em', autoAlpha: 1, stagger: 0.075, duration: 0.5 },
                0.4
            )
            .fromTo(incomingVisual,
                { autoAlpha: 0, xPercent: 3 },
                { autoAlpha: 1, xPercent: 0, duration: 0.6 },
                0.35
            );
    };

    return (
        <section className="services-tab-section" id="services">
            <div className="services-tab-wrapper" ref={wrapperRef}>
                {/* Centered Header - Above columns */}
                <div className="services-header" data-animate="fade-up">
                    <span className="services-label">What I Offer</span>
                    <h2 className="services-heading">
                        Commission <span className="services-heading-accent">Services</span>
                    </h2>
                </div>

                <div className="services-tab-layout">
                    {/* Left Column - Content */}
                    <div className="services-tab-col services-tab-col-left">
                        <div className="services-tab-container">
                            {/* Top Section - Main Heading & Tabs */}
                            <div className="services-tab-top">
                                <h1 className="services-tab-main-heading">
                                    Explore the Layers of Abstract Design and Depth
                                </h1>

                                {/* Tab Navigation */}
                                <div className="services-filter-bar" ref={navRef}>
                                    {services.map((service, index) => (
                                        <button
                                            key={service.title}
                                            className={`service-tab-button ${index === activeIndex ? 'active' : ''}`}
                                            onClick={() => switchTab(index)}
                                        >
                                            <span className="service-tab-button-text">{service.title}</span>
                                            {index === 0 && (
                                                <div className="service-tab-bg" ref={bgRef}></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Section - Content Items */}
                            <div className="services-tab-bottom">
                                <div className="services-content-wrap">
                                    {services.map((service, index) => (
                                        <div
                                            key={index}
                                            className={`service-content-item ${index === activeIndex ? 'active' : ''}`}
                                        >
                                            <h2 className="service-content-heading fade-element">
                                                {service.heading}
                                            </h2>
                                            <p className="service-content-description fade-element">
                                                {service.description}
                                            </p>
                                            <ul className="service-features fade-element">
                                                {service.features.map((feature, fIndex) => (
                                                    <li key={fIndex} className="service-feature-item">
                                                        <span className="feature-check">✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            {/* Price and CTA in a row */}
                                            <div className="service-price-cta-row fade-element">
                                                <div className="service-price-wrap">
                                                    <span className="service-price-label">Starting from</span>
                                                    <span className="service-price">{service.price}</span>
                                                </div>
                                                <a
                                                    href="#contact"
                                                    onClick={scrollToContact}
                                                    className="service-cta-button"
                                                >
                                                    <span>Request a Quote</span>
                                                    <div className="service-cta-bg"></div>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visuals */}
                    <div className="services-tab-col services-tab-col-right">
                        <div className="services-visual-wrap">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`service-visual-item ${index === activeIndex ? 'active' : ''}`}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="service-visual-image"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
