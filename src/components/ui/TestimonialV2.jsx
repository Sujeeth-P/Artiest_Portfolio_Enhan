import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

// --- Types ---
// Note: This component uses JavaScript, type annotations are for documentation only

// --- Data ---
const testimonials = [
    {
        text: "The preserved wedding flowers are absolutely stunning! Sandhiya captured every detail so beautifully. Now our special day lives on in this gorgeous piece.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Priya & Karthik",
        role: "Wedding Floral Preservation",
    },
    {
        text: "The personalized name board for our baby's nursery exceeded all expectations. The craftsmanship and attention to detail is remarkable. Highly recommend!",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Meera S.",
        role: "Custom Name Board",
    },
    {
        text: "Sandhiya's resin art pieces are simply breathtaking. The colors and depth she creates are unlike anything I've seen. Perfect addition to our living room!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Anjali Menon",
        role: "Resin Art Commission",
    },
    {
        text: "The custom portrait of our family pet was incredibly moving. Sandhiya captured his personality perfectly. It's our most treasured piece of art.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Rahul Sharma",
        role: "Pet Portrait",
    },
    {
        text: "Her mixed media artwork brought new life to our office space. Creative, professional, and delivered ahead of schedule. Will definitely order again!",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Sneha Patel",
        role: "Office Art Installation",
    },
    {
        text: "The birth flower bouquet preservation exceeded my expectations. Sandhiya turned my daughter's birth flowers into a stunning keepsake.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Lakshmi Reddy",
        role: "Birth Flower Preservation",
    },
    {
        text: "Exceptional craftsmanship on the custom jewelry box. The hand-painted details are exquisite. A perfect anniversary gift for my wife!",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Vikram Singh",
        role: "Custom Jewelry Box",
    },
    {
        text: "She created the most beautiful memorial piece from my grandmother's saree. Art and sentiment combined perfectly. Forever grateful!",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Divya Krishnan",
        role: "Memorial Art Piece",
    },
    {
        text: "The mandala artwork Sandhiya created for our meditation room is absolutely stunning. The energy and detail in every stroke is incredible!",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Arun Kumar",
        role: "Mandala Art Commission",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props) => {
    return (
        <div className={props.className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <motion.li
                                    key={`${index}-${i}`}
                                    aria-hidden={index === 1 ? "true" : "false"}
                                    tabIndex={index === 1 ? -1 : 0}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(185, 150, 63, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(185, 150, 63, 0.1)",
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    whileFocus={{
                                        scale: 1.03,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(185, 150, 63, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(185, 150, 63, 0.1)",
                                        transition: { type: "spring", stiffness: 400, damping: 17 }
                                    }}
                                    className="p-10 rounded-3xl border border-[#e8dfd3] shadow-lg shadow-black/5 max-w-xs w-full bg-white transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-[#b9963f]/30"
                                >
                                    <blockquote className="m-0 p-0">
                                        <p className="text-[#4a4a4a] leading-relaxed font-normal m-0 transition-colors duration-300">
                                            {text}
                                        </p>
                                        <footer className="flex items-center gap-3 mt-6">
                                            <img
                                                width={40}
                                                height={40}
                                                src={image}
                                                alt={`Avatar of ${name}`}
                                                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#e8dfd3] group-hover:ring-[#b9963f]/30 transition-all duration-300 ease-in-out"
                                            />
                                            <div className="flex flex-col">
                                                <cite className="font-semibold not-italic tracking-tight leading-5 text-[#1a1a1a] transition-colors duration-300">
                                                    {name}
                                                </cite>
                                                <span className="text-sm leading-5 tracking-tight text-[#7a7a7a] mt-0.5 transition-colors duration-300">
                                                    {role}
                                                </span>
                                            </div>
                                        </footer>
                                    </blockquote>
                                </motion.li>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.ul>
        </div>
    );
};

const TestimonialsSection = () => {
    return (
        <section
            aria-labelledby="client-stories-heading"
            className="bg-[#fcf7e7] py-24 relative overflow-hidden"
            id="client-stories"
        >
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.8 }
                }}
                className="container px-4 z-10 mx-auto"
            >
                <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
                    <div className="flex justify-center">
                        <div className="border border-[#d4c4a0] py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-[#b9963f] bg-[#f5efd9] transition-colors">
                            Client Stories
                        </div>
                    </div>

                    <h2 id="client-stories-heading" className="text-4xl md:text-5xl font-[var(--font-display)] font-extrabold tracking-tight mt-6 text-center text-[#1a1a1a] transition-colors">
                        What Our Customers Say
                    </h2>
                    <p className="text-center mt-5 text-[#7a7a7a] text-lg leading-relaxed max-w-sm transition-colors">
                        Discover how customers cherish their personalized art pieces and preserved memories.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                    role="region"
                    aria-label="Scrolling Client Stories"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </motion.div>
        </section>
    );
};

// --- Main Export Component ---
export default function TestimonialV2() {
    return <TestimonialsSection />;
}

// Also export the section component for flexibility
export { TestimonialsSection };
