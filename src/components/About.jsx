const About = () => {
    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    return (
        <section className="pt-12 pb-16 px-4 md:pt-16 md:pb-[120px] md:px-10 bg-[#fcf7e7]" id="about">
            <div className="max-w-[1200px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16" data-animate="fade-up">
                    <span className="inline-block text-[0.75rem] md:text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[10px] md:mb-[15px]">
                        About Me
                    </span>
                    <h2 className="font-[var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-semibold text-[#1a1a1a]">
                        MY JOURNEY
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-[60px] items-center">
                    {/* Image - Left Side */}
                    <div className="relative flex-shrink-0 w-full md:w-2/5" data-animate="fade-left">
                        <div className="relative w-full max-w-[280px] md:max-w-[345px] lg:max-w-[400px] h-[350px] md:h-[450px] lg:h-[500px] mx-auto rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                            <img
                                src="/assets1/Untitled.jpg"
                                alt="Sandhiya - PITTURA Artist"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-3 right-2 md:-bottom-4 md:right-4 lg:-bottom-6 lg:-right-6 bg-[#f5f0e8] border border-[#e8dfd3] text-[#2a2a2a] px-4 py-3 md:px-5 md:py-4 lg:px-8 lg:py-6 rounded-xl 
                shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
                            <span className="block font-[var(--font-display)] text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] font-semibold text-gold-500 leading-none">
                                200+
                            </span>
                            <span className="text-[0.75rem] md:text-[0.8rem] lg:text-[0.9rem] text-[#6b6b6b]">Artworks Created</span>
                        </div>
                    </div>

                    {/* Content - Right Side */}
                    <div className="flex-1 mt-4 md:mt-0" data-animate="fade-right">
                        <div className="space-y-3 md:space-y-4 lg:space-y-5 text-[0.9rem] md:text-[0.95rem] lg:text-[1rem] text-[#4a4a4a] leading-[1.7] md:leading-[1.8] lg:leading-[1.9] mb-5 md:mb-6 lg:mb-8">
                            <p className="text-[1.05rem] md:text-[1.15rem] font-medium text-[#1a1a1a]">
                                Hello, I am <span className="text-gold-500 italic">Sandhiya</span>.
                            </p>
                            <p>
                                Art has been part of me for as long as I can remember. What began as a quiet love
                                for colours and handmade details grew stronger when I studied Architecture where
                                I learned that before anything is built, it must first be imagined. While juggling
                                college, deadlines, and life, I kept creating—late nights, weekends, and countless
                                experiments with paint.
                            </p>
                            <p>
                                What started as personal expression slowly became purpose. After three years of
                                consistent work, I finally exhibited my art — all 200 pieces, each carrying a part
                                of my journey. Watching people connect with my work made one thing clear: art has
                                the power to hold emotions, memories, and moments far beyond time.
                            </p>
                            <p className="text-[1rem] md:text-[1.1rem] font-medium text-gold-500 italic">
                                Today, I create not just art—but keepsakes that last!
                            </p>
                        </div>

                        <a
                            href="#contact"
                            onClick={scrollToContact}
                            className="shiny-btn inline-flex items-center gap-[10px] px-6 py-3 md:px-8 md:py-4 text-[0.85rem] md:text-[0.9rem] font-semibold rounded-[50px] 
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
            </div>
        </section>
    );
};

export default About;
