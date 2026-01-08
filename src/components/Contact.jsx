import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        service: '',
        details: ''
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

    const serviceOptions = [
        'Floral Preservation',
        'Personalised Frames',
        'Letter Blocks',
        'Name Boards',
        'Keychains',
        'Wooden Serving Trays',
        'Resin Nail Art',
        'Teak Wood Frames',
        'Other'
    ];

    const contactInfo = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: 'Email',
            value: 'contact@pittura.in',
            href: 'mailto:contact@pittura.in'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            ),
            label: 'Phone Number',
            value: '+91 XXXXX XXXXX',
            href: 'tel:+91XXXXXXXXXX'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            label: 'WhatsApp',
            value: '+91 XXXXX XXXXX',
            href: 'https://wa.me/91XXXXXXXXXX'
        }
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
        <section className="relative py-12 px-4 md:py-16 lg:py-[120px] md:px-6 lg:px-10 bg-[#fcf7e7]" id="contact">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fcf7e7] to-[#f5f0e8]" />
            </div>

            <div className="relative z-[1] max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-8 lg:gap-[60px]">
                {/* Contact Info - Left Side */}
                <div className="md:w-2/5 lg:w-2/5" data-animate="fade-left">
                    <span className="inline-block text-[0.75rem] md:text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[10px] md:mb-[15px]">
                        Contact
                    </span>
                    <h2 className="font-[var(--font-display)] text-[clamp(1.6rem,4vw,3rem)] font-semibold text-[#2a2a2a] mb-3 md:mb-5">
                        Let's Create  <span className="text-gold-500 italic">Something</span>
                    </h2>
                    <p className="text-[0.9rem] md:text-[1rem] text-[#525252] leading-[1.7] md:leading-[1.8] mb-6 md:mb-10">
                        Fill out the form and I'll get back to you within 24-48 hours to discuss your project and provide a
                        personalized quote.
                    </p>

                    <div className="space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-8 lg:mb-10">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex items-start gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#e8dfd3] rounded-lg md:rounded-xl text-gold-500">
                                    {info.icon}
                                </div>
                                <div>
                                    <span className="block text-[0.8rem] md:text-[0.85rem] text-[#8a8a8a] mb-0.5 md:mb-1">{info.label}</span>
                                    {info.href ? (
                                        <a href={info.href} className="text-[0.9rem] md:text-base text-[#2a2a2a] hover:text-gold-500 transition-colors">
                                            {info.value}
                                        </a>
                                    ) : (
                                        <span className="text-[0.9rem] md:text-base text-[#2a2a2a]">{info.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 md:gap-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#e8dfd3] rounded-lg md:rounded-xl text-[#2a2a2a]
                  hover:bg-gold-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Form - Right Side */}
                <div className="md:w-3/5 lg:w-3/5" data-animate="fade-right">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 lg:p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                    Full Name <span className="text-red-500">*</span>
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

                            <div className="mb-6">
                                <label htmlFor="contact" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                    Phone number / Email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Your phone or email"
                                    required
                                    className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                      focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="service" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                    Service Type
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 text-[0.95rem] border border-cream-300 rounded-xl 
                    focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all
                    bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select a service</option>
                                    {serviceOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="details" className="block text-[0.9rem] font-medium text-[#1a1a1a] mb-2">
                                    Details
                                </label>
                                <textarea
                                    id="details"
                                    name="details"
                                    rows="5"
                                    value={formData.details}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project... What would you like me to create? Any specific colors, sizes, or preferences?"
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
                                <span>{isSubmitting ? 'Sending...' : 'CALL TO ENQUIRE'}</span>
                                {!isSubmitting && (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="form-success show bg-white p-5 md:p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3 className="font-[var(--font-display)] text-[1.8rem] font-semibold text-[#1a1a1a] mb-4">
                                Thank You!
                            </h3>
                            <p className="text-[#4a4a4a] leading-[1.7]">
                                Your enquiry has been sent. I'll review your project details and get back to you
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
