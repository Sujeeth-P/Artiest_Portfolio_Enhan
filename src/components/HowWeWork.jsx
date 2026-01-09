import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
    const sectionRef = useRef(null);
    const stepsRef = useRef([]);

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
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate each step as it comes into view
            stepsRef.current.forEach((step, index) => {
                if (step) {
                    const circle = step.querySelector('.step-circle');
                    const content = step.querySelector('.step-content');

                    // Set initial state
                    gsap.set(circle, {
                        backgroundColor: '#fcf7e7',
                        borderColor: '#d4c4a0',
                        color: '#b9963f'
                    });
                    gsap.set(content, { opacity: 0.5, y: 10 });

                    // Create scroll trigger for this step
                    ScrollTrigger.create({
                        trigger: step,
                        start: "top 75%",
                        end: "bottom 25%",
                        onEnter: () => {
                            // Fill circle with gold
                            gsap.to(circle, {
                                backgroundColor: '#b9963f',
                                borderColor: '#b9963f',
                                color: '#ffffff',
                                duration: 0.5,
                                ease: "power2.out"
                            });
                            // Fade in content
                            gsap.to(content, {
                                opacity: 1,
                                y: 0,
                                duration: 0.4,
                                ease: "power2.out"
                            });
                        },
                        onLeaveBack: () => {
                            // Reset circle
                            gsap.to(circle, {
                                backgroundColor: '#fcf7e7',
                                borderColor: '#d4c4a0',
                                color: '#b9963f',
                                duration: 0.3,
                                ease: "power2.out"
                            });
                            // Fade out content
                            gsap.to(content, {
                                opacity: 0.5,
                                y: 10,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                    });
                }
            });

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-[#fcf7e7] text-[#1a1a1a] py-16 md:py-20 px-4"
            id="process"
        >
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
                <h3 className="font-[var(--font-display)] text-[1.5rem] md:text-[2rem] font-semibold text-[#1a1a1a] text-center mb-12 md:mb-16">
                    HOW DO WE WORK?
                </h3>

                {/* Steps container - 2x2 grid on mobile/tablet, 4 columns on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            ref={el => stepsRef.current[index] = el}
                            className="flex flex-col items-center"
                        >
                            {/* The step circle - original style */}
                            <div className="step-circle w-14 h-14 md:w-16 md:h-16 flex items-center justify-center 
                                font-[var(--font-display)] text-[1.3rem] md:text-[1.5rem] font-bold text-[#b9963f] 
                                bg-[#fcf7e7] rounded-full border-[3px] border-[#d4c4a0]
                                transition-all duration-300 shadow-md">
                                {step.number}
                            </div>

                            {/* Step content */}
                            <div className="step-content text-center mt-5 md:mt-6 px-2 max-w-[200px] md:max-w-[180px]">
                                <h4 className="font-[var(--font-display)] text-[1rem] md:text-[1.1rem] font-semibold text-[#1a1a1a] mb-2">
                                    {step.title}
                                </h4>
                                <p className="text-[0.8rem] md:text-[0.85rem] text-[#7a7a7a] leading-[1.6]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowWeWork;
