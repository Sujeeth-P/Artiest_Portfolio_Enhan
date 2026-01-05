import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
}) => {
    // Color & font config - Using Elena's theme colors
    const colorName = colors.name ?? "#1a1a1a";
    const colorDesignation = colors.designation ?? "#b8963f";
    const colorTestimony = colors.testimony ?? "#4b5563";
    const colorArrowBg = colors.arrowBackground ?? "#b8963f";
    const colorArrowFg = colors.arrowForeground ?? "#fcf7e7";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "#d4af5a";
    const fontSizeName = fontSizes.name ?? "1.8rem";
    const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(
        () => testimonials[activeIndex],
        [activeIndex, testimonials]
    );

    // Responsive gap calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonialsLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [activeIndex, testimonialsLength]);

    // Navigation handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    // Compute transforms for each image (always show 3: left, center, right)
    function getImageStyle(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
        const isRight = (activeIndex + 1) % testimonialsLength === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        // Hide all other images
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    // Framer Motion variants for quote
    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="circular-testimonial-container">
            <div className="circular-testimonial-grid">
                {/* Images */}
                <div className="circular-image-container" ref={imageContainerRef}>
                    {testimonials.map((testimonial, index) => (
                        <img
                            key={testimonial.src}
                            src={testimonial.src}
                            alt={testimonial.name}
                            className="circular-testimonial-image"
                            data-index={index}
                            style={getImageStyle(index)}
                        />
                    ))}
                </div>
                {/* Content */}
                <div className="circular-testimonial-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={quoteVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h3
                                className="circular-name"
                                style={{ color: colorName, fontSize: fontSizeName }}
                            >
                                {activeTestimonial.name}
                            </h3>
                            <p
                                className="circular-designation"
                                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                            >
                                {activeTestimonial.designation}
                            </p>
                            <motion.p
                                className="circular-quote"
                                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                            >
                                {activeTestimonial.quote.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.22,
                                            ease: "easeInOut",
                                            delay: 0.025 * i,
                                        }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                    <div className="circular-arrow-buttons">
                        <button
                            className="circular-arrow-button"
                            onClick={handlePrev}
                            style={{
                                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                            }}
                            onMouseEnter={() => setHoverPrev(true)}
                            onMouseLeave={() => setHoverPrev(false)}
                            aria-label="Previous"
                        >
                            <FaArrowLeft size={20} color={colorArrowFg} />
                        </button>
                        <button
                            className="circular-arrow-button"
                            onClick={handleNext}
                            style={{
                                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                            }}
                            onMouseEnter={() => setHoverNext(true)}
                            onMouseLeave={() => setHoverNext(false)}
                            aria-label="Next"
                        >
                            <FaArrowRight size={20} color={colorArrowFg} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        .circular-testimonial-container {
          width: 100%;
          max-width: 64rem;
          padding: 2rem;
          margin: 0 auto;
        }
        .circular-testimonial-grid {
          display: grid;
          gap: 4rem;
        }
        .circular-image-container {
          position: relative;
          width: 100%;
          height: 22rem;
          perspective: 1000px;
        }
        .circular-testimonial-image {
          position: absolute;
          width: 100%;
          max-width: 320px;
          height: 100%;
          left: 50%;
          top: 50%;
          margin-left: -160px;
          margin-top: -176px;
          object-fit: cover;
          border-radius: 1.25rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }
        .circular-testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }
        .circular-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-style: italic;
        }
        .circular-designation {
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.875rem;
        }
        .circular-quote {
          font-family: 'Georgia', serif;
          line-height: 1.9;
          max-width: 600px;
          margin: 0 auto;
        }
        .circular-arrow-buttons {
          display: flex;
          gap: 1rem;
          padding-top: 2rem;
          justify-content: center;
        }
        .circular-arrow-button {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 15px rgba(184, 150, 63, 0.3);
        }
        .circular-arrow-button:hover {
          transform: scale(1.1);
        }
        @media (min-width: 768px) {
          .circular-testimonial-grid {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
          .circular-testimonial-content {
            text-align: left;
          }
          .circular-quote {
            margin: 0;
          }
          .circular-arrow-buttons {
            justify-content: flex-start;
          }
        }
      `}</style>
        </div>
    );
};

export default CircularTestimonials;
