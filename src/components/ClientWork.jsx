import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Testimonial data for the art portfolio
const testimonials = [
    {
        author: {
            name: "Priya & Karthik",
            handle: "Wedding Floral Preservation",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        },
        text: "The preserved wedding flowers are absolutely stunning! Sandhiya captured every detail so beautifully. Now our special day lives on in this gorgeous piece."
    },
    {
        author: {
            name: "Meera S.",
            handle: "Custom Name Board",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        text: "The personalized name board for our baby's nursery exceeded all expectations. The craftsmanship and attention to detail is remarkable!"
    },
    {
        author: {
            name: "Anjali Menon",
            handle: "Resin Art Commission",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        text: "Sandhiya's resin art pieces are simply breathtaking. The colors and depth she creates are unlike anything I've seen. Perfect for our living room!"
    },
    {
        author: {
            name: "Rahul Sharma",
            handle: "Pet Portrait",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        text: "The custom portrait of our family pet was incredibly moving. Sandhiya captured his personality perfectly. It's our most treasured piece."
    },
    {
        author: {
            name: "Sneha Patel",
            handle: "Office Art Installation",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
        },
        text: "Her mixed media artwork brought new life to our office space. Creative, professional, and delivered ahead of schedule!"
    },
    {
        author: {
            name: "Vikram Singh",
            handle: "Custom Jewelry Box",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        text: "Exceptional craftsmanship on the custom jewelry box. The hand-painted details are exquisite. A perfect anniversary gift!"
    }
];

const ClientWork = () => {
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
                    // linesRef[index] is the line that comes AFTER step[index]
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
            id="client-work"
        >
            {/* Client Stories Header */}
            <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-8 mb-10">
                <div className="flex flex-col items-center gap-3 px-4 sm:gap-4">
                    <div className="border border-[#d4c4a0] py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-[#b9963f] bg-[#f5efd9]">
                        Client Stories
                    </div>
                    <h2 className="max-w-[720px] text-3xl font-[var(--font-display)] font-semibold leading-tight sm:text-4xl sm:leading-tight text-[#1a1a1a]">
                        What Our Customers Say
                    </h2>
                    <p className="text-md max-w-[600px] font-medium text-[#7a7a7a] sm:text-lg">
                        Discover how customers cherish their personalized art pieces and preserved memories.
                    </p>
                </div>

                {/* Marquee Testimonials */}
                <div className="relative w-full overflow-hidden py-4">
                    <div
                        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
                        style={{ gap: '1.5rem' }}
                    >
                        {/* First set of cards */}
                        {testimonials.map((testimonial, i) => (
                            <TestimonialCard
                                key={`first-${i}`}
                                {...testimonial}
                            />
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {testimonials.map((testimonial, i) => (
                            <TestimonialCard
                                key={`second-${i}`}
                                {...testimonial}
                            />
                        ))}
                    </div>

                    {/* Gradient overlays for fade effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fcf7e7] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fcf7e7] to-transparent z-10" />
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-[800px] mx-auto my-10 px-10">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4c4a0] to-transparent"></div>
            </div>

            {/* Process Section - HOW DO WE WORK? */}
            <div ref={processRef} className="max-w-[1100px] mx-auto px-4 sm:px-10">
                <h3 className="font-[var(--font-display)] text-[1.8rem] font-semibold text-[#1a1a1a] text-center mb-12" data-animate="fade-up">
                    HOW DO WE WORK?
                </h3>

                {/* Steps container - horizontal layout with inline connectors */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col lg:flex-row items-center flex-1"
                        >
                            {/* Step item */}
                            <div
                                ref={el => stepsRef.current[index] = el}
                                className="flex flex-col items-center opacity-30"
                            >
                                {/* The step circle */}
                                <div className="step-circle w-16 h-16 flex items-center justify-center 
                                    font-[var(--font-display)] text-[1.5rem] font-bold text-[#b9963f] 
                                    bg-[#fcf7e7] rounded-full border-[3px] border-[#d4c4a0]
                                    transition-all duration-300 shadow-md">
                                    {step.number}
                                </div>

                                {/* Step content */}
                                <div className="step-content text-center mt-5 px-2 max-w-[180px]">
                                    <h4 className="font-[var(--font-display)] text-[1.1rem] font-semibold text-[#1a1a1a] mb-2">
                                        {step.title}
                                    </h4>
                                    <p className="text-[0.85rem] text-[#7a7a7a] leading-[1.6]">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector line between steps (not after last step) */}
                            {index < processSteps.length - 1 && (
                                <div
                                    ref={el => linesRef.current[index] = el}
                                    className="hidden lg:flex flex-1 items-center self-start mt-8 px-2"
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

export default ClientWork;

