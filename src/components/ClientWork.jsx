import TestimonialsWithMarquee from './ui/testimonials-with-marquee';

const ClientWork = () => {
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
        <>
            {/* Marquee Testimonials Section */}
            <TestimonialsWithMarquee />

            {/* Process Section - HOW DO WE WORK? */}
            <section className="py-10 px-10 bg-[#fcf7e7]" id="client-work">
                <div className="max-w-[1200px] mx-auto">
                    <h3 className="font-[var(--font-display)] text-[1.8rem] font-semibold text-[#1a1a1a] text-center mb-8" data-animate="fade-up">
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
        </>
    );
};

export default ClientWork;
