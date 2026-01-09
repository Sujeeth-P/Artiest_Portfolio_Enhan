import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Refs for GSAP animations
    const navRef = useRef(null);
    const pillRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);

            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP Animation on scroll change
    useEffect(() => {
        if (!navRef.current || !menuRef.current || !pillRef.current) return;

        // Kill any running animations to prevent conflicts
        gsap.killTweensOf([navRef.current, menuRef.current, pillRef.current]);

        if (scrolled) {
            // Step 1: Collapse menu items (stay centered)
            gsap.to(menuRef.current, {
                width: 0,
                opacity: 0,
                scale: 0.8,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => {
                    // Step 2: Move navbar to left
                    gsap.to(navRef.current, {
                        left: 24,
                        xPercent: 0,
                        x: 0,
                        duration: 0.45,
                        delay: 0.2,
                        ease: "back.out(1.2)"
                    });
                }
            });

            // Shrink pill padding
            gsap.to(pillRef.current, {
                paddingRight: 8,
                gap: 0,
                duration: 0.35,
                ease: "power2.inOut"
            });

            // Update nav padding
            gsap.to(navRef.current, {
                paddingTop: 12,
                duration: 0.3,
                ease: "power2.out"
            });

        } else {
            // Reverse: Move back to center first
            gsap.to(navRef.current, {
                left: "50%",
                xPercent: -50,
                x: 0,
                paddingTop: 24,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    // Then expand menu
                    gsap.to(menuRef.current, {
                        width: "auto",
                        opacity: 1,
                        scale: 1,
                        duration: 0.45,
                        delay: 0.15,
                        ease: "back.out(1.4)"
                    });

                    // Expand pill padding
                    gsap.to(pillRef.current, {
                        paddingRight: 8,
                        gap: 8,
                        duration: 0.35,
                        ease: "power2.out"
                    });
                }
            });
        }
    }, [scrolled]);

    // GSAP Animation on hover (when scrolled)
    useEffect(() => {
        if (!menuRef.current || !pillRef.current || !scrolled) return;

        if (isHovered) {
            // Expand menu on hover
            gsap.to(menuRef.current, {
                width: "auto",
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "back.out(1.7)"
            });
            gsap.to(pillRef.current, {
                gap: 8,
                duration: 0.25,
                ease: "power2.out"
            });
        } else {
            // Collapse menu on mouse leave
            gsap.to(menuRef.current, {
                width: 0,
                opacity: 0,
                scale: 0.8,
                duration: 0.25,
                ease: "power2.inOut"
            });
            gsap.to(pillRef.current, {
                gap: 0,
                duration: 0.25,
                ease: "power2.inOut"
            });
        }
    }, [isHovered, scrolled]);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
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
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#artworks', label: 'Art Works' }
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <nav
                ref={navRef}
                className="fixed top-0 z-[1000] hidden md:flex"
                style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: 24
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Floating Pill Container */}
                <div
                    ref={pillRef}
                    className="inline-flex items-center bg-[#3a3632] rounded-full py-2 shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
                    style={{
                        paddingLeft: 8,
                        paddingRight: 8,
                        gap: 8
                    }}
                >
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, '#home')}
                        className="relative flex items-center justify-center w-11 h-11 
                            rounded-full overflow-hidden flex-shrink-0
                            ring-2 ring-[#c9a961]/50 hover:ring-[#c9a961]
                            transition-all duration-300 group
                            hover:scale-105 hover:shadow-[0_0_20px_rgba(201,169,97,0.4)]"
                    >
                        <img
                            src="/logo.png"
                            alt="Pittura by Sandhiya"
                            className="w-full h-full object-cover"
                        />
                    </a>

                    {/* Navigation Links - Animated with GSAP */}
                    <div
                        ref={menuRef}
                        className="flex items-center overflow-hidden"
                        style={{ width: 'auto', opacity: 1 }}
                    >
                        <div className="flex items-center gap-0.5 px-2 whitespace-nowrap">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`px-5 py-2 text-[0.82rem] font-medium rounded-full
                                        transition-all duration-300
                                        ${activeSection === link.href.slice(1)
                                            ? 'text-[#c9a961] bg-[#c9a961]/15'
                                            : 'text-[#e8e4dc] hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="shiny-btn flex items-center gap-2 px-5 py-2.5 ml-1
                                text-[0.82rem] font-semibold text-[#2a2a2a] whitespace-nowrap
                                bg-gradient-to-r from-[#c9a961] to-[#d4af6a] rounded-full
                                border-2 border-[#c9a961]/30
                                transition-all duration-300
                                hover:from-[#d4af6a] hover:to-[#c9a961] 
                                hover:shadow-[0_4px_20px_rgba(185,150,63,0.4)]"
                        >
                            Call to Enquire
                        </a>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation - Always centered */}
            <nav className="fixed top-0 left-0 right-0 z-[1000] flex md:hidden justify-center transition-all duration-500"
                style={{ paddingTop: scrolled ? '8px' : '12px' }}
            >
                <div className={`inline-flex items-center gap-1.5 transition-all duration-500
                    bg-[#3a3632] rounded-full pl-1.5 pr-1.5 py-1.5
                    shadow-[0_4px_24px_rgba(0,0,0,0.15)]
                    ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : ''}`}
                >
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, '#home')}
                        className="relative flex items-center justify-center w-9 h-9 
                            rounded-full overflow-hidden
                            ring-2 ring-[#c9a961]/50 hover:ring-[#c9a961]
                            transition-all duration-300 group"
                    >
                        <img
                            src="/logo.png"
                            alt="Pittura by Sandhiya"
                            className="w-full h-full object-cover"
                        />
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        className="flex flex-col gap-[5px] p-2.5 rounded-full 
                            bg-[#c9a961]/20 hover:bg-[#c9a961]/30 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-5 h-[2px] bg-[#e8e4dc] transition-all duration-300 origin-center
                            ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`w-5 h-[2px] bg-[#e8e4dc] transition-all duration-300
                            ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                        <span className={`w-5 h-[2px] bg-[#e8e4dc] transition-all duration-300 origin-center
                            ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`fixed left-4 right-4 top-20 bg-[#3a3632]/98 backdrop-blur-xl 
                    rounded-2xl overflow-hidden border border-[#c9a961]/20
                    transition-all duration-400 shadow-[0_16px_48px_rgba(0,0,0,0.25)]
                    ${mobileMenuOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                    }`}
                >
                    <div className="p-4 flex flex-col gap-1">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`block px-4 py-3 text-[0.95rem] font-medium rounded-xl
                                    transition-all duration-200
                                    ${activeSection === link.href.slice(1)
                                        ? 'text-[#2a2a2a] bg-gradient-to-r from-[#c9a961] to-[#d4af6a]'
                                        : 'text-[#e8e4dc]/80 hover:text-[#e8e4dc] hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-2 pt-2 border-t border-[#c9a961]/20">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, '#contact')}
                                className="shiny-btn flex items-center justify-center gap-2 px-4 py-3 text-[0.95rem] 
                                    font-semibold text-[#2a2a2a] bg-gradient-to-r from-[#c9a961] to-[#d4af6a] rounded-xl
                                    hover:from-[#d4af6a] hover:to-[#c9a961] transition-all duration-200"
                            >
                                Call to Enquire
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
