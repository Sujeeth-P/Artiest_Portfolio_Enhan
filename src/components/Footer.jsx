import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const waveRef = useRef(null);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const footerLinks = [
        { href: '#home', label: 'Home' },
        { href: '#artworks', label: 'Art Works' },
        { href: '#services', label: 'Services' },
        { href: '#contact', label: 'Contact' }
    ];

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/pitturabysandhiya/',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            href: 'https://www.youtube.com/@pitturabysandhiya174',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        }
    ];

    // Bouncy wave animation on scroll
    useEffect(() => {
        const footer = footerRef.current;
        const wave = waveRef.current;
        if (!footer || !wave) return;

        const ctx = gsap.context(() => {
            // Initial state - wave is curved/bouncy
            gsap.set(wave, {
                scaleY: 1.5,
                transformOrigin: 'bottom center'
            });

            ScrollTrigger.create({
                trigger: footer,
                start: 'top bottom',
                onEnter: (self) => {
                    const velocity = Math.abs(self.getVelocity()) / 10000;
                    const elasticity = Math.min(1.5 + velocity, 2);
                    const damping = Math.max(0.3 - velocity * 0.1, 0.2);

                    // Bouncy elastic animation
                    gsap.to(wave, {
                        scaleY: 1,
                        duration: 1.5,
                        ease: `elastic.out(${elasticity}, ${damping})`,
                        overwrite: true
                    });
                },
                onLeaveBack: () => {
                    // Reset wave when scrolling back up
                    gsap.to(wave, {
                        scaleY: 1.5,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true
                    });
                }
            });
        }, footer);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative bg-[#fcf7e7]">
            {/* Bouncy Wave SVG */}
            <div className="footer-wave-container">
                <svg
                    ref={waveRef}
                    className="footer-wave"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c9a961" />
                            <stop offset="50%" stopColor="#d4af6a" />
                            <stop offset="100%" stopColor="#b8963f" />
                        </linearGradient>
                    </defs>
                    <path
                        className="footer-wave-path"
                        fill="url(#footer-gradient)"
                        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
                    />
                </svg>
                {/* Noise texture overlay */}
                <div className="footer-wave-noise" />
            </div>

            {/* Footer Content */}
            <div className="footer-content py-10 px-4 md:py-16 md:px-10 bg-gradient-to-b from-[#c9a961] to-[#b8963f]">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 md:mb-10">
                        {/* Brand with Logo */}
                        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
                            <a href="#home" onClick={(e) => scrollToSection(e, '#home')}
                                className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden
                               ring-2 ring-white/50 hover:ring-white
                               transition-all duration-300
                               hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                <img
                                    src="/logo.png"
                                    alt="Pittura by Sandhiya"
                                    className="w-full h-full object-cover"
                                />
                            </a>
                            <div className="text-center md:text-left">
                                <span className="font-[var(--font-display)] text-[1.5rem] md:text-[1.8rem] font-semibold text-white tracking-[1px]">
                                    Sandhiya
                                </span>
                                <p className="text-white/80 text-sm mt-1">Professional Artist & Painter</p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex gap-5 md:gap-8 flex-wrap justify-center">
                            {footerLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-sm md:text-base text-white/80 hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white
                  hover:bg-white hover:text-[#b8963f] hover:-translate-y-1 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/30 mb-6 md:mb-8" />

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-white/80 text-[0.85rem] mb-2">
                            <span className="font-[var(--font-display)] text-[1rem] text-white font-medium">PITTURA</span>
                            {' '}by Sandhiya
                        </p>
                        <p className="text-white/60 text-[0.85rem]">
                            © 2025 All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-wave-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    line-height: 0;
                }

                .footer-wave {
                    display: block;
                    width: 100%;
                    height: 80px;
                    transform-origin: bottom center;
                }

                @media (min-width: 768px) {
                    .footer-wave {
                        height: 120px;
                    }
                }

                .footer-wave-path {
                    filter: drop-shadow(0 -4px 6px rgba(0, 0, 0, 0.1));
                }

                .footer-wave-noise {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    mix-blend-mode: overlay;
                    pointer-events: none;
                }

                .footer-content {
                    position: relative;
                    margin-top: -1px;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
