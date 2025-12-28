const About = () => {
    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const highlights = [
        'Fine Arts Degree, Royal Academy',
        'Featured in Art Galleries Worldwide',
        '100% Client Satisfaction'
    ];

    return (
        <section className="py-[120px] px-10 bg-[#fcf7e7]" id="about">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[80px] items-center">
                {/* Image */}
                <div className="relative flex-shrink-0" data-animate="fade-left">
                    <div className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                        <img
                            src="/assets/todol/elena.jpg"
                            alt="Elena Ross - Artist"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-[#f5f0e8] border border-[#e8dfd3] text-[#2a2a2a] px-8 py-6 rounded-xl 
            shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                        <span className="block font-[var(--font-display)] text-[2.5rem] font-semibold text-gold-500 leading-none">
                            8+
                        </span>
                        <span className="text-[0.9rem] text-[#6b6b6b]">Years Creating Art</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1" data-animate="fade-right">
                    <span className="inline-block text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[15px]">
                        About Me
                    </span>
                    <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#1a1a1a] mb-6">
                        Hello, I'm <span className="text-gold-500 italic">Elena Ross</span>
                    </h2>

                    <div className="space-y-5 text-[1rem] text-[#4a4a4a] leading-[1.8] mb-8">
                        <p>
                            I'm a professional artist specializing in portraits, landscapes, and custom paintings. With over
                            8 years of experience, I've had the privilege of creating meaningful artwork for clients worldwide.
                        </p>
                        <p>
                            My passion lies in capturing emotions and stories through art. Whether it's a treasured family
                            portrait, a serene landscape for your home, or a bold piece for your office, I approach each
                            commission with dedication and creativity.
                        </p>
                        <p>
                            I work primarily with oil and acrylic paints, blending classical techniques with contemporary
                            vision. Every piece is created with premium materials to ensure lasting beauty for generations.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-4 mb-10">
                        {highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-gold-500 flex-shrink-0"
                                >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span className="text-[#4a4a4a]">{highlight}</span>
                            </div>
                        ))}
                    </div>

                    <a
                        href="#contact"
                        onClick={scrollToContact}
                        className="shiny-btn inline-flex items-center gap-[10px] px-8 py-4 text-[0.9rem] font-semibold rounded-[50px] 
              text-[#2a2a2a] bg-gold-400 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
              hover:bg-gold-500 hover:-translate-y-[3px] hover:shadow-[0_15px_40px_rgba(185,150,63,0.3)]"
                    >
                        <span>Let's Work Together</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
