import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const stepsRef = useRef([]);
    const circleRefs = useRef([]);

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
        const wrapper = wrapperRef.current;
        if (!section || !wrapper) return;

        const ctx = gsap.context(() => {
            const totalSteps = processSteps.length;

            // Set all circles to empty state initially
            circleRefs.current.forEach((circle) => {
                if (circle) {
                    gsap.set(circle, {
                        backgroundColor: 'transparent',
                        borderColor: '#d4c4a0',
                        color: '#d4c4a0'
                    });
                }
            });

            // Set all content to faded state initially
            stepsRef.current.forEach((step) => {
                if (step) {
                    const content = step.querySelector('.step-content');
                    if (content) {
                        gsap.set(content, { opacity: 0.4, y: 10 });
                    }
                }
            });

            // Create pinned scroll trigger with progressive circle fill
            ScrollTrigger.create({
                trigger: wrapper,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${window.innerHeight * 1.5}`, // Pin for 1.5x viewport height of scrolling
                onUpdate: (self) => {
                    const progress = self.progress;

                    // Calculate which step should be active based on scroll progress
                    circleRefs.current.forEach((circle, index) => {
                        if (!circle) return;

                        const step = stepsRef.current[index];
                        const content = step?.querySelector('.step-content');

                        // Each step takes up 1/totalSteps of the progress
                        const stepStart = index / totalSteps;
                        const stepEnd = (index + 1) / totalSteps;

                        // Calculate fill progress for this step (0 to 1)
                        let fillProgress = 0;
                        if (progress >= stepStart) {
                            fillProgress = Math.min((progress - stepStart) / (stepEnd - stepStart), 1);
                        }

                        // Interpolate colors based on fill progress
                        if (fillProgress > 0) {
                            gsap.to(circle, {
                                backgroundColor: fillProgress >= 1 ? '#b9963f' : `rgba(185, 150, 63, ${fillProgress})`,
                                borderColor: '#b9963f',
                                color: fillProgress >= 0.5 ? '#ffffff' : '#b9963f',
                                scale: 1 + (fillProgress * 0.1), // Slight scale up when filling
                                duration: 0.15,
                                overwrite: 'auto'
                            });

                            if (content) {
                                gsap.to(content, {
                                    opacity: 0.4 + (fillProgress * 0.6),
                                    y: 10 - (fillProgress * 10),
                                    duration: 0.15,
                                    overwrite: 'auto'
                                });
                            }
                        } else {
                            gsap.to(circle, {
                                backgroundColor: 'transparent',
                                borderColor: '#d4c4a0',
                                color: '#d4c4a0',
                                scale: 1,
                                duration: 0.15,
                                overwrite: 'auto'
                            });

                            if (content) {
                                gsap.to(content, {
                                    opacity: 0.4,
                                    y: 10,
                                    duration: 0.15,
                                    overwrite: 'auto'
                                });
                            }
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
            className="how-we-work-section bg-[#fcf7e7] overflow-hidden"
            id="process"
        >
            {/* Pinned Wrapper */}
            <div ref={wrapperRef} className="how-we-work-wrapper min-h-screen flex flex-col justify-center py-16 md:py-20 px-4">
                {/* Title */}
                <div className="text-center mb-12 md:mb-16">
                    <h3 className="font-[var(--font-display)] text-[1.5rem] md:text-[2rem] font-semibold text-[#1a1a1a]">
                        HOW DO WE WORK?
                    </h3>
                </div>

                {/* Steps container - 2x2 grid on mobile/tablet, 4 columns on desktop */}
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                ref={el => stepsRef.current[index] = el}
                                className="flex flex-col items-center"
                            >
                                {/* The step circle */}
                                <div
                                    ref={el => circleRefs.current[index] = el}
                                    className="step-circle w-14 h-14 md:w-16 md:h-16 flex items-center justify-center 
                                        font-[var(--font-display)] text-[1.3rem] md:text-[1.5rem] font-bold
                                        rounded-full border-[3px] border-[#d4c4a0]
                                        shadow-md will-change-transform"
                                >
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
            </div>
        </section>
    );
};

export default HowWeWork;
