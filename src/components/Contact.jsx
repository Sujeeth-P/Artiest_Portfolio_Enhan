import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        size: '',
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: 'Email',
            value: 'hello@elenaross.art',
            href: 'mailto:hello@elenaross.art'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            label: 'Studio',
            value: 'New York, USA'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            label: 'Response Time',
            value: 'Within 24-48 hours'
        }
    ];

    const socialLinks = [
        {
            name: 'Instagram',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: 'Pinterest',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            name: 'Facebook',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative py-[120px] px-10 bg-[#fcf7e7]" id="contact">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fcf7e7] to-[#f5f0e8]" />
            </div>

            <div className="relative z-[1] max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-[60px]">
                {/* Contact Info */}
                <div className="lg:w-2/5" data-animate="fade-left">
                    <span className="inline-block text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[15px]">
                        Get In Touch
                    </span>
                    <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#2a2a2a] mb-5">
                        Ready to Commission <span className="text-gold-500 italic">Your Artwork?</span>
                    </h2>
                    <p className="text-[1rem] text-[#525252] leading-[1.8] mb-10">
                        Fill out the form and I'll get back to you within 24-48 hours to discuss your project and provide a
                        personalized quote.
                    </p>

                    <div className="space-y-6 mb-10">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-[#e8dfd3] rounded-xl text-gold-500">
                                    {info.icon}
                                </div>
                                <div>
                                    <span className="block text-[0.85rem] text-[#8a8a8a] mb-1">{info.label}</span>
                                    {info.href ? (
                                        <a href={info.href} className="text-[#2a2a2a] hover:text-gold-500 transition-colors">
                                            {info.value}
                                        </a>
                                    ) : (
                                        <span className="text-[#2a2a2a]">{info.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                aria-label={social.name}
                                className="w-12 h-12 flex items-center justify-center bg-[#e8dfd3] rounded-xl text-[#2a2a2a]
                  hover:bg-gold-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:w-3/5" data-animate="fade-right">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                        className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                      focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                      focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="service" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                    Commission Type *
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                    focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all
                    bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select a service</option>
                                    <option value="portrait">Custom Portrait</option>
                                    <option value="landscape">Landscape Painting</option>
                                    <option value="abstract">Abstract Art</option>
                                    <option value="still-life">Still Life</option>
                                    <option value="illustration">Illustration & Design</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="size" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                        Preferred Size
                                    </label>
                                    <select
                                        id="size"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                      focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all
                      bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Select size</option>
                                        <option value="small">Small (up to 16")</option>
                                        <option value="medium">Medium (16" - 30")</option>
                                        <option value="large">Large (30" - 48")</option>
                                        <option value="xlarge">Extra Large (48"+)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="budget" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                        Budget Range
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                      focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all
                      bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Select budget</option>
                                        <option value="500-1000">$500 - $1,000</option>
                                        <option value="1000-2500">$1,000 - $2,500</option>
                                        <option value="2500-5000">$2,500 - $5,000</option>
                                        <option value="5000+">$5,000+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="message" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                    Project Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your vision... What would you like me to create? Do you have reference images? Any specific colors or style preferences?"
                                    required
                                    className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl resize-none
                    focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 text-[0.95rem] font-semibold 
                  text-[#2a2a2a] bg-gold-400 rounded-xl transition-all duration-400
                  hover:bg-gold-500 hover:shadow-[0_15px_40px_rgba(185,150,63,0.3)]
                  disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span>{isSubmitting ? 'Sending...' : 'Send Commission Request'}</span>
                                {!isSubmitting && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="form-success show">
                            <div className="success-icon">✓</div>
                            <h3 className="font-[var(--font-display)] text-[1.8rem] font-semibold text-[#1a1a1a] mb-4">
                                Thank You!
                            </h3>
                            <p className="text-[#4a4a4a] leading-[1.7]">
                                Your commission request has been sent. I'll review your project details and get back to you
                                within 24-48 hours.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
