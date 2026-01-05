import { useRef, useState } from 'react';

const Services = () => {
    const containerRef = useRef(null);
    const [activeService, setActiveService] = useState(null);

    const services = [
        {
            title: 'Floral Preservation',
            description: 'Your special flowers—wedding, farewell, or celebration—preserved forever, exactly as they were.',
            image: '/assets1/IMG_2094.JPG'
        },
        {
            title: 'Personalised Frames',
            description: 'Thoughtfully designed frames that hold names, dates, messages, and emotions.',
            image: '/assets1/IMG_2095.JPG'
        },
        {
            title: 'Letter Blocks',
            description: 'Custom letter creations that spell stories—perfect for gifting or décor.',
            image: '/assets1/IMG_2096.JPG'
        },
        {
            title: 'Name Boards',
            description: 'Handmade name boards that add warmth and personality to any space.',
            image: '/assets1/IMG_2011.JPG'
        },
        {
            title: 'Keychains',
            description: 'Small, personal keepsakes made to carry a memory wherever you go.',
            image: '/assets1/IMG_2092.JPG'
        },
        {
            title: 'Wooden Serving Trays',
            description: 'Functional, elegant trays crafted to elevate everyday moments.',
            image: '/assets1/IMG_2093.JPG'
        },
        {
            title: 'Resin Nail Art',
            description: 'Tiny art pieces for your hands—customised, detailed, and unique.',
            image: '/assets1/IMG_2094.JPG'
        },
        {
            title: 'Teak Wood Frames',
            description: 'Timeless teak wood frames that give your memories the strength and elegance they deserve.',
            image: '/assets1/IMG_2095.JPG'
        }
    ];

    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    return (
        <section className="services-section" id="services" ref={containerRef}>
            <div className="services-container">
                {/* Quote Section */}
                <div className="services-quote" data-animate="fade-up">
                    <blockquote>
                        "Art enables us to find ourselves and lose ourselves at the same time." — Thomas Merton
                    </blockquote>
                </div>

                {/* Header */}
                <div className="services-header" data-animate="fade-up">
                    <h2 className="services-title">WHAT CAN I DO FOR YOU?</h2>
                </div>

                {/* Services Grid */}
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`service-card ${activeService === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveService(index)}
                            onMouseLeave={() => setActiveService(null)}
                            data-animate="fade-up"
                            data-delay={index * 100}
                        >
                            <div className="service-card-inner">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                            <div
                                className="service-bg-image"
                                style={{ backgroundImage: `url(${service.image})` }}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="services-custom-text" data-animate="fade-up">
                    <p>
                        Everything is custom-made to suit your idea, your occasion, and your preferences.
                        We don't work with fixed designs or ready-made templates. You can choose the colours,
                        materials, size, and details—so the final piece feels like yours, not something picked off a shelf!
                    </p>
                    <a href="#contact" onClick={scrollToContact} className="services-cta">
                        Start Your Custom Order
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>

            <style>{`
                .services-section {
                    padding: 100px 40px;
                    background: #fcf7e7;
                }

                .services-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .services-quote {
                    text-align: center;
                    margin-bottom: 60px;
                }

                .services-quote blockquote {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
                    font-style: italic;
                    color: #c9a961;
                    margin: 0;
                    line-height: 1.5;
                }

                .services-header {
                    text-align: center;
                    margin-bottom: 60px;
                }

                .services-title {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 500;
                    color: #1a1a1a;
                    margin: 0;
                    letter-spacing: 3px;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
                    margin-bottom: 60px;
                }

                .service-card {
                    position: relative;
                    background: #fff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }

                .service-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
                }

                .service-card-inner {
                    position: relative;
                    z-index: 2;
                    padding: 32px;
                    background: rgba(255, 255, 255, 0.95);
                    transition: all 0.4s ease;
                }

                .service-card:hover .service-card-inner {
                    background: rgba(255, 255, 255, 0.85);
                }

                .service-bg-image {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    z-index: 1;
                }

                .service-card:hover .service-bg-image {
                    opacity: 0.2;
                }



                .service-card .service-title {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin: 0 0 12px;
                    transition: color 0.3s ease;
                }

                .service-card:hover .service-title {
                    color: #b8963f;
                }

                .service-description {
                    font-size: 0.95rem;
                    color: #666;
                    line-height: 1.7;
                    margin: 0;
                }

                .services-custom-text {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                    background: linear-gradient(135deg, rgba(201, 169, 97, 0.08) 0%, rgba(184, 150, 63, 0.12) 100%);
                    border-radius: 20px;
                    border: 1px solid rgba(201, 169, 97, 0.2);
                }

                .services-custom-text p {
                    font-size: 1.1rem;
                    color: #4a4a4a;
                    line-height: 1.8;
                    margin: 0 0 24px;
                }

                .services-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #c9a961 0%, #b8963f 100%);
                    color: #1a1a1a;
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-decoration: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(185, 150, 63, 0.3);
                }

                .services-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(185, 150, 63, 0.4);
                }

                .services-cta svg {
                    transition: transform 0.3s ease;
                }

                .services-cta:hover svg {
                    transform: translateX(4px);
                }

                @media (max-width: 768px) {
                    .services-section {
                        padding: 60px 20px;
                    }

                    .services-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .service-card-inner {
                        padding: 24px;
                    }

                    .services-custom-text {
                        padding: 24px;
                    }

                    .services-custom-text p {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Services;
