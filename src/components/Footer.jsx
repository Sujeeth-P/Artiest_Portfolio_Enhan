const Footer = () => {
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

    return (
        <footer className="py-10 px-4 md:py-16 md:px-10 bg-[#fcf7e7] border-t border-[#e8dfd3]">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 md:mb-10">
                    {/* Brand with Logo */}
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
                        <a href="#home" onClick={(e) => scrollToSection(e, '#home')}
                            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden
                               ring-2 ring-[#c9a961]/50 hover:ring-[#c9a961]
                               transition-all duration-300
                               hover:scale-105 hover:shadow-[0_0_20px_rgba(201,169,97,0.3)]">
                            <img
                                src="/logo.png"
                                alt="Pittura by Sandhiya"
                                className="w-full h-full object-cover"
                            />
                        </a>
                        <div className="text-center md:text-left">
                            <span className="font-[var(--font-display)] text-[1.5rem] md:text-[1.8rem] font-semibold text-[#2a2a2a] tracking-[1px]">
                                Sandhiya
                            </span>
                            <p className="text-[#6b6b6b] text-sm mt-1">Professional Artist & Painter</p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-5 md:gap-8 flex-wrap justify-center">
                        {footerLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-sm md:text-base text-[#6b6b6b] hover:text-gold-500 transition-colors duration-200"
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
                                className="w-10 h-10 flex items-center justify-center bg-[#e8dfd3] rounded-full text-[#2a2a2a]
                  hover:bg-gold-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e8dfd3] mb-6 md:mb-8" />

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-[#8a8a8a] text-[0.85rem] mb-2">
                        <span className="font-[var(--font-display)] text-[1rem] text-[#2a2a2a] font-medium">PITTURA</span>
                        {' '}by Sandhiya
                    </p>
                    <p className="text-[#8a8a8a] text-[0.85rem]">
                        © 2025 All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
