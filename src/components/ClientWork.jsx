const ClientWork = () => {
    const testimonials = [
        {
            image: '/assets1/IMG_2092.JPG',
            quote: `The preserved wedding flowers are absolutely stunning! Sandhiya captured every detail so beautifully. Now our special day lives on in this gorgeous piece.`,
            author: 'Priya & Karthik',
            project: 'Wedding Floral Preservation'
        },
        {
            image: '/assets1/IMG_2094.JPG',
            quote: `The personalized name board for our baby's nursery exceeded all expectations. The craftsmanship and attention to detail is remarkable. Highly recommend!`,
            author: 'Meera S.',
            project: 'Custom Name Board'
        }
    ];

    const processSteps = [
        {
            number: '01',
            title: 'Consultation',
            description: 'We discuss your vision, preferred style, size, and timeline for the artwork.'
        },
        {
            number: '02',
            title: 'Design & Approval',
            description: 'I create preliminary designs for your review and approval before creation begins.'
        },
        {
            number: '03',
            title: 'Handcrafting',
            description: 'Your artwork is carefully created with regular progress updates shared with you.'
        },
        {
            number: '04',
            title: 'Delivery',
            description: 'Final artwork is professionally packaged and delivered safely to you.'
        }
    ];

    return (
        <section className="py-[120px] px-10 bg-[#fcf7e7]" id="client-work">
            {/* Section Header */}
            <div className="text-center max-w-[600px] mx-auto mb-[60px]" data-animate="fade-up">
                <span className="inline-block text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[15px]">
                    Testimonials
                </span>
                <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#1a1a1a] mb-5">
                    WHAT OUR CUSTOMERS SAY
                </h2>
                <p className="text-[1.05rem] text-[#4a4a4a] leading-[1.7]">
                    See what clients say about their custom art experience
                </p>
            </div>

            {/* Testimonials */}
            <div className="flex gap-[30px] max-w-[1200px] mx-auto overflow-x-auto pb-5 snap-x snap-mandatory
        scrollbar-thin scrollbar-thumb-gold-500 scrollbar-track-cream-200">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="min-w-[calc(100%-40px)] md:min-w-[600px] bg-white rounded-2xl overflow-hidden 
              shadow-[0_4px_20px_rgba(0,0,0,0.08)] snap-center flex flex-col md:flex-row"
                        data-animate={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                        data-delay={index * 150}
                    >
                        <div className="w-full md:w-2/5 h-[250px] md:h-auto">
                            <img
                                src={testimonial.image}
                                alt={`Commissioned ${testimonial.project}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-8 md:w-3/5">
                            <div className="flex gap-1 mb-4 text-gold-500 text-xl">
                                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                            </div>
                            <blockquote className="text-[1rem] text-[#4a4a4a] leading-[1.8] mb-6 italic">
                                "{testimonial.quote}"
                            </blockquote>
                            <div>
                                <strong className="block text-[#1a1a1a] font-semibold">{testimonial.author}</strong>
                                <span className="text-[0.9rem] text-[#7a7a7a]">{testimonial.project}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Process Section - HOW DO WE WORK? */}
            <div className="mt-[100px] max-w-[1200px] mx-auto">
                <h3 className="font-[var(--font-display)] text-[1.8rem] font-semibold text-[#1a1a1a] text-center mb-[50px]" data-animate="fade-up">
                    HOW DO WE WORK?
                </h3>
                <div className="flex flex-wrap justify-center items-start gap-0 process-steps-container">
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-start process-step-item"
                            data-animate="scale"
                            data-delay={index * 200}
                        >
                            <div className="text-center px-6 py-4 max-w-[250px]">
                                <div className="process-step-circle w-16 h-16 mx-auto mb-4 flex items-center justify-center 
                  font-[var(--font-display)] text-[1.5rem] font-semibold text-gold-500 
                  bg-[rgba(185,150,63,0.1)] rounded-full">
                                    {step.number}
                                </div>
                                <h4 className="font-[var(--font-display)] text-[1.2rem] font-semibold text-[#1a1a1a] mb-2">
                                    {step.title}
                                </h4>
                                <p className="text-[0.9rem] text-[#7a7a7a] leading-[1.6]">
                                    {step.description}
                                </p>
                            </div>
                            {index < processSteps.length - 1 && (
                                <div className="process-step-line hidden lg:block w-[60px] h-[2px] bg-[#e8dfd3] mt-8 flex-shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientWork;
