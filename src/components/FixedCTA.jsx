import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const FixedCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show CTA after scrolling past 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
        <>
            <a
                href="#contact"
                onClick={scrollToContact}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed-cta-button ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
                aria-label="Call to Enquire"
            >
                <span className="fixed-cta-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                </span>
                <span className="fixed-cta-text">CALL TO ENQUIRE</span>
            </a>

            <style>{`
                .fixed-cta-button {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 24px;
                    background: linear-gradient(135deg, #c9a961 0%, #b8963f 100%);
                    color: #1a1a1a;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-decoration: none;
                    border-radius: 50px;
                    box-shadow: 0 8px 32px rgba(185, 150, 63, 0.4),
                                0 4px 16px rgba(0, 0, 0, 0.2);
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    overflow: hidden;
                }

                .fixed-cta-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    transition: left 0.5s ease;
                }

                .fixed-cta-button.visible {
                    transform: translateY(0);
                    opacity: 1;
                }

                .fixed-cta-button.hovered {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 40px rgba(185, 150, 63, 0.5),
                                0 6px 20px rgba(0, 0, 0, 0.25);
                }

                .fixed-cta-button.hovered::before {
                    left: 100%;
                }

                .fixed-cta-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse 2s ease-in-out infinite;
                }

                .fixed-cta-text {
                    white-space: nowrap;
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                /* Mobile responsive */
                @media (max-width: 768px) {
                    .fixed-cta-button {
                        bottom: 20px;
                        right: 20px;
                        padding: 12px 18px;
                        font-size: 0.75rem;
                    }

                    .fixed-cta-text {
                        display: none;
                    }

                    .fixed-cta-button {
                        padding: 14px;
                        border-radius: 50%;
                    }
                }

                /* Hide when in works section to avoid overlap */
                @media (max-width: 768px) {
                    .fixed-cta-button {
                        bottom: 80px;
                    }
                }
            `}</style>
        </>
    );
};

export default FixedCTA;
