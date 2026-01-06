import { cn } from "@/lib/utils"
import { TestimonialCard } from "@/components/ui/testimonial-card"

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
]

export function TestimonialsWithMarquee({
    title = "What Our Customers Say",
    description = "Discover how customers cherish their personalized art pieces and preserved memories.",
    className
}) {
    return (
        <section
            className={cn(
                "bg-[#fcf7e7] text-[#1a1a1a]",
                "py-12 sm:py-16 px-0",
                className
            )}
            id="client-stories"
        >
            <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-10">
                {/* Header */}
                <div className="flex flex-col items-center gap-3 px-4 sm:gap-4">
                    <div className="border border-[#d4c4a0] py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-[#b9963f] bg-[#f5efd9]">
                        Client Stories
                    </div>
                    <h2 className="max-w-[720px] text-3xl font-[var(--font-display)] font-semibold leading-tight sm:text-4xl sm:leading-tight text-[#1a1a1a]">
                        {title}
                    </h2>
                    <p className="text-md max-w-[600px] font-medium text-[#7a7a7a] sm:text-lg">
                        {description}
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden">
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
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fcf7e7] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fcf7e7] to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default TestimonialsWithMarquee
