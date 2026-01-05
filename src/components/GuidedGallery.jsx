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
    const maxGap = 100;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const GuidedGallery = () => {
    // Artworks data with descriptions
    const artworks = [
        {
            quote: "A stunning portrayal of peacocks amidst vibrant poppies, showcasing the harmonious dance between wildlife and flora.",
            name: "Paons et Pavots",
            designation: "Nature Collection",
            src: "/assets/gallery/paons-et-pavots.jpg",
        },
        {
            quote: "Elegant cockatoos perched among delicate magnolia blooms, capturing the gentle beauty of nature's finest moments.",
            name: "Cacatoës et Magnolia",
            designation: "Botanical Collection",
            src: "/assets/gallery/cacatoës-et-magnolia.jpg",
        },
        {
            quote: "The wild swan in its natural habitat, expressing grace and freedom through fluid brushstrokes and ethereal colors.",
            name: "Cygne Sauvage",
            designation: "Wildlife Collection",
            src: "/assets/gallery/cygne-sauvage.jpg",
        },
        {
            quote: "Water lilies floating serenely on still waters, inspired by impressionist masters and the tranquility of nature.",
            name: "Nénuphar",
            designation: "Botanical Collection",
            src: "/assets/gallery/nénuphar.jpg",
        },
        {
            quote: "Majestic eagles captured in their powerful glory with bold compositions and dynamic lines that command attention.",
            name: "Aigles Majestueux",
            designation: "Nature Collection",
            src: "/assets/aigles.jpg",
        },
    ];

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    const artworksLength = useMemo(() => artworks.length, [artworks]);
    const activeArtwork = useMemo(
        () => artworks[activeIndex],
        [activeIndex, artworks]
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
        autoplayIntervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % artworksLength);
        }, 6000);
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [artworksLength]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [activeIndex, artworksLength]);

    // Navigation handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % artworksLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [artworksLength]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + artworksLength) % artworksLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [artworksLength]);

    // Compute transforms for each image (always show 3: left, center, right)
    function getImageStyle(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.7;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + artworksLength) % artworksLength === index;
        const isRight = (activeIndex + 1) % artworksLength === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                filter: 'brightness(1)',
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 0.85,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(18deg)`,
                filter: 'brightness(0.7)',
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 0.85,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(-18deg)`,
                filter: 'brightness(0.7)',
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
        <section className="guided-gallery-section" id="gallery">
            <div className="guided-gallery-container">
                <div className="guided-gallery-grid">
                    {/* Images - Circular Effect */}
                    <div className="guided-image-container" ref={imageContainerRef}>
                        {artworks.map((artwork, index) => (
                            <img
                                key={artwork.src}
                                src={artwork.src}
                                alt={artwork.name}
                                className="guided-artwork-image"
                                data-index={index}
                                style={getImageStyle(index)}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="guided-content">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                variants={quoteVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="guided-content-inner"
                            >
                                <span className="guided-number">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </span>
                                <p className="guided-designation">
                                    {activeArtwork.designation}
                                </p>
                                <h3 className="guided-name">
                                    {activeArtwork.name}
                                </h3>
                                <motion.p className="guided-quote">
                                    {activeArtwork.quote.split(" ").map((word, i) => (
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

                        {/* Navigation */}
                        <div className="guided-navigation">
                            <div className="guided-arrow-buttons">
                                <button
                                    className="guided-arrow-button"
                                    onClick={handlePrev}
                                    style={{
                                        backgroundColor: hoverPrev ? '#d4af5a' : '#b8963f',
                                    }}
                                    onMouseEnter={() => setHoverPrev(true)}
                                    onMouseLeave={() => setHoverPrev(false)}
                                    aria-label="Previous artwork"
                                >
                                    <FaArrowLeft size={18} color="#fcf7e7" />
                                </button>
                                <button
                                    className="guided-arrow-button"
                                    onClick={handleNext}
                                    style={{
                                        backgroundColor: hoverNext ? '#d4af5a' : '#b8963f',
                                    }}
                                    onMouseEnter={() => setHoverNext(true)}
                                    onMouseLeave={() => setHoverNext(false)}
                                    aria-label="Next artwork"
                                >
                                    <FaArrowRight size={18} color="#fcf7e7" />
                                </button>
                            </div>
                            <div className="guided-progress">
                                <div
                                    className="guided-progress-bar"
                                    style={{ width: `${((activeIndex + 1) / artworksLength) * 100}%` }}
                                />
                            </div>
                            <span className="guided-progress-label">
                                {activeIndex + 1} of {artworksLength}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .guided-gallery-section {
          background: #fcf7e7;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 60px 0;
        }

        .guided-gallery-container {
          width: 100%;
          max-width: 1400px;
          padding: 2rem 3rem;
          margin: 0 auto;
        }

        .guided-gallery-grid {
          display: grid;
          gap: 4rem;
          align-items: center;
        }

        /* Image Container with 3D perspective */
        .guided-image-container {
          position: relative;
          width: 100%;
          height: 420px;
          perspective: 1200px;
        }

        .guided-artwork-image {
          position: absolute;
          width: 100%;
          max-width: 320px;
          height: 420px;
          left: 50%;
          top: 50%;
          margin-left: -160px;
          margin-top: -210px;
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
        }

        /* Content Section */
        .guided-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .guided-content-inner {
          margin-bottom: 2rem;
        }

        .guided-number {
          display: block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 4.5rem;
          font-weight: 300;
          color: rgba(184, 150, 63, 0.2);
          line-height: 1;
          margin-bottom: -10px;
        }

        .guided-designation {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #b8963f;
          margin-bottom: 12px;
          padding: 6px 14px;
          background: rgba(184, 150, 63, 0.12);
          border-radius: 20px;
        }

        .guided-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 16px;
          line-height: 1.2;
          font-style: italic;
        }

        .guided-quote {
          font-family: 'Georgia', serif;
          font-size: 1.05rem;
          line-height: 1.85;
          color: #555;
          max-width: 500px;
        }

        /* Navigation */
        .guided-navigation {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .guided-arrow-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .guided-arrow-button {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 15px rgba(184, 150, 63, 0.35);
        }

        .guided-arrow-button:hover {
          transform: scale(1.1);
        }

        .guided-progress {
          flex: 1;
          max-width: 150px;
          height: 3px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .guided-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #b8963f, #d4af5a);
          transition: width 0.5s ease;
        }

        .guided-progress-label {
          font-size: 0.85rem;
          color: #999;
          letter-spacing: 1px;
        }

        /* Responsive - Desktop */
        @media (min-width: 1024px) {
          .guided-gallery-grid {
            grid-template-columns: 1.1fr 1fr;
            gap: 5rem;
          }

          .guided-image-container {
            height: 480px;
          }

          .guided-artwork-image {
            max-width: 360px;
            height: 480px;
            margin-left: -180px;
            margin-top: -240px;
          }

          .guided-name {
            font-size: 2.8rem;
          }

          .guided-number {
            font-size: 5rem;
          }
        }

        /* Responsive - Tablet */
        @media (max-width: 1023px) {
          .guided-gallery-container {
            padding: 2rem;
          }

          .guided-content {
            text-align: center;
          }

          .guided-quote {
            margin: 0 auto;
          }

          .guided-navigation {
            justify-content: center;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 640px) {
          .guided-gallery-section {
            padding: 40px 0;
          }

          .guided-image-container {
            height: 320px;
          }

          .guided-artwork-image {
            max-width: 240px;
            height: 320px;
            margin-left: -120px;
            margin-top: -160px;
          }

          .guided-name {
            font-size: 1.8rem;
          }

          .guided-number {
            font-size: 3.5rem;
          }

          .guided-quote {
            font-size: 0.95rem;
          }

          .guided-navigation {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
        </section>
    );
};

export default GuidedGallery;
