import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
    const processRef = useRef(null);
    const stepsRef = useRef([]);
    const linesRef = useRef([]);

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

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create a timeline for the step-by-step animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: processRef.current,
                    start: "top 70%",
                    end: "bottom 50%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate each step sequentially
            stepsRef.current.forEach((step, index) => {
                if (step) {
                    const circle = step.querySelector('.step-circle');
                    const content = step.querySelector('.step-content');

                    // Animate step appearing
                    tl.fromTo(step,
                        { opacity: 0.3, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                        index * 0.6
                    );

                    // Animate circle filling with gold
                    tl.to(circle, {
                        backgroundColor: '#b9963f',
                        borderColor: '#b9963f',
                        color: '#fff',
                        duration: 0.3,
                        ease: "power2.out"
                    }, index * 0.6 + 0.2);

                    // Animate content
                    tl.fromTo(content,
                        { opacity: 0.5 },
                        { opacity: 1, duration: 0.3, ease: "power2.out" },
                        index * 0.6 + 0.1
                    );

                    // Animate the connector line AFTER this step (if it exists)
                    if (linesRef.current[index]) {
                        const progressFill = linesRef.current[index].querySelector('.progress-fill');
                        if (progressFill) {
                            tl.to(progressFill, {
                                scaleX: 1,
                                duration: 0.4,
                                ease: "power2.inOut"
                            }, index * 0.6 + 0.4);
                        }
                    }
                }
            });
        }, processRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            className="bg-[#fcf7e7] text-[#1a1a1a] py-12 sm:py-16 px-4"
            id="process"
        >
            <div ref={processRef} className="max-w-[1100px] mx-auto px-4 sm:px-6">
                <h3 className="font-[var(--font-display)] text-[1.5rem] md:text-[1.8rem] font-semibold text-[#1a1a1a] text-center mb-8 md:mb-12" data-animate="fade-up">
                    HOW DO WE WORK?
                </h3>

                {/* Steps container - 2x2 grid on tablet, horizontal on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-4">
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                        >
                            {/* Step item */}
                            <div
                                ref={el => stepsRef.current[index] = el}
                                className="flex flex-col items-center opacity-30"
                            >
                                {/* The step circle */}
                                <div className="step-circle w-14 h-14 md:w-16 md:h-16 flex items-center justify-center 
                                    font-[var(--font-display)] text-[1.3rem] md:text-[1.5rem] font-bold text-[#b9963f] 
                                    bg-[#fcf7e7] rounded-full border-[3px] border-[#d4c4a0]
                                    transition-all duration-300 shadow-md">
                                    {step.number}
                                </div>

                                {/* Step content */}
                                <div className="step-content text-center mt-4 md:mt-5 px-2 max-w-[200px] md:max-w-[180px]">
                                    <h4 className="font-[var(--font-display)] text-[1rem] md:text-[1.1rem] font-semibold text-[#1a1a1a] mb-2">
                                        {step.title}
                                    </h4>
                                    <p className="text-[0.8rem] md:text-[0.85rem] text-[#7a7a7a] leading-[1.6]">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector line between steps (only visible on large screens) */}
                            {index < processSteps.length - 1 && (
                                <div
                                    ref={el => linesRef.current[index] = el}
                                    className="hidden lg:hidden flex-1 items-center self-start mt-8 px-2"
                                >
                                    {/* Base gray line */}
                                    <div className="relative w-full h-[3px] bg-[#e8dfd3] rounded-full overflow-hidden">
                                        {/* Animated gold progress line */}
                                        <div className="progress-fill absolute inset-0 bg-[#b9963f] origin-left scale-x-0 transition-transform duration-500" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowWeWork;
