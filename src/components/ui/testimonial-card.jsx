import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function TestimonialCard({
    author,
    text,
    href,
    className
}) {
    const Card = href ? 'a' : 'div'

    return (
        <Card
            {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
                "flex flex-col rounded-2xl border border-[#e8dfd3]",
                "bg-gradient-to-b from-[#fff9ed] to-[#fcf7e7]",
                "p-5 text-start sm:p-6",
                "hover:from-[#fff5e0] hover:to-[#f8f0dc]",
                "max-w-[320px] sm:max-w-[320px]",
                "transition-all duration-300 shadow-sm hover:shadow-md",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-[#e8dfd3]">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold leading-none text-[#1a1a1a]">
                        {author.name}
                    </h3>
                    <p className="text-sm text-[#7a7a7a] mt-1">
                        {author.handle}
                    </p>
                </div>
            </div>
            <p className="sm:text-md mt-4 text-sm text-[#4a4a4a] leading-relaxed">
                "{text}"
            </p>
        </Card>
    )
}
