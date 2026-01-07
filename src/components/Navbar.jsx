import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

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

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
        if (target) {
            // Use GSAP scrollTo which properly handles ScrollTrigger pins
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
        <nav className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center transition-all duration-500
            ${scrolled ? 'pt-2' : 'pt-6'}`}
        >
            {/* Floating Pill Container - Centered */}
            <div className={`inline-flex items-center gap-2 transition-all duration-500
                bg-[#3a3632] rounded-full pl-2 pr-2 py-2
                shadow-[0_4px_24px_rgba(0,0,0,0.15)]
                ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]' : ''}`}
            >
                {/* Logo - Pittura by Sandhiya */}
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, '#home')}
                    className="relative flex items-center justify-center w-11 h-11 
                        rounded-full overflow-hidden
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

                {/* Navigation Links - Clean minimal style */}
                <div className="hidden md:flex items-center gap-0.5 px-2">
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

                {/* CTA Button - Gold with rounded pill shape + shiny effect */}
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="shiny-btn hidden md:flex items-center gap-2 px-5 py-2.5 ml-1
                        text-[0.82rem] font-semibold text-[#2a2a2a] 
                        bg-gradient-to-r from-[#c9a961] to-[#d4af6a] rounded-full
                        border-2 border-[#c9a961]/30
                        transition-all duration-300
                        hover:from-[#d4af6a] hover:to-[#c9a961] 
                        hover:shadow-[0_4px_20px_rgba(185,150,63,0.4)]"
                >
                    Call to Enquire
                </a>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden flex flex-col gap-[5px] p-2.5 rounded-full 
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
            <div className={`md:hidden fixed left-4 right-4 top-20 bg-[#3a3632]/98 backdrop-blur-xl 
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
    );
};

export default Navbar;
