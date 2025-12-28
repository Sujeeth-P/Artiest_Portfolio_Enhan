import React, { useState, useEffect, useRef, useMemo } from 'react';

// Characters used for the encryption effect
const CIPHER_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Helper to generate scrambled chars
const generateScrambledChars = (text) => {
    return text.split('').map((char) =>
        char === ' ' ? ' ' : CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
    );
};

/**
 * EncryptedText - A text component that reveals text with a Matrix-style decryption animation
 */
export const EncryptedText = ({
    text,
    encryptedClassName = 'encrypted-cipher',
    revealedClassName = 'revealed-text',
    revealDelayMs = 50,
    initialDelayMs = 500, // Delay before starting animation
    triggerOnView = true,
    autoStart = false,
    onComplete,
    className = '',
    ...props
}) => {
    // Initialize with scrambled characters immediately
    const [scrambledChars, setScrambledChars] = useState(() => generateScrambledChars(text));
    const [revealedCount, setRevealedCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);
    const scrambleIntervalRef = useRef(null);
    const delayTimeoutRef = useRef(null);

    console.log('[EncryptedText] Render - text:', text, 'revealedCount:', revealedCount, 'hasStarted:', hasStarted);

    // Continuously scramble unrevealed characters while animating
    useEffect(() => {
        if (isAnimating || (isInView && !hasStarted)) {
            console.log('[EncryptedText] Starting continuous scramble');
            scrambleIntervalRef.current = setInterval(() => {
                setScrambledChars(prev =>
                    prev.map((char, i) =>
                        i >= revealedCount && text[i] !== ' '
                            ? CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
                            : char
                    )
                );
            }, 50);
        }

        return () => {
            if (scrambleIntervalRef.current) {
                clearInterval(scrambleIntervalRef.current);
            }
        };
    }, [isAnimating, isInView, hasStarted, revealedCount, text]);

    // Start the reveal animation
    const startRevealAnimation = () => {
        console.log('[EncryptedText] startRevealAnimation called');
        if (hasStarted) return;

        setHasStarted(true);
        setIsAnimating(true);
        setRevealedCount(0);

        intervalRef.current = setInterval(() => {
            setRevealedCount(prev => {
                const next = prev + 1;
                console.log('[EncryptedText] Revealing char', next, '/', text.length);
                if (next >= text.length) {
                    console.log('[EncryptedText] Animation complete');
                    clearInterval(intervalRef.current);
                    setIsAnimating(false);
                    onComplete?.();
                    return text.length;
                }
                return next;
            });
        }, revealDelayMs);
    };

    // Handle when element comes into view
    const handleInView = () => {
        console.log('[EncryptedText] handleInView called, hasStarted:', hasStarted);
        if (hasStarted) return;

        setIsInView(true);

        // Start scrambling immediately, but delay the reveal
        delayTimeoutRef.current = setTimeout(() => {
            console.log('[EncryptedText] Initial delay complete, starting reveal');
            startRevealAnimation();
        }, initialDelayMs);
    };

    // Intersection Observer for triggering on view
    useEffect(() => {
        if (!triggerOnView || autoStart) {
            console.log('[EncryptedText] Skipping IntersectionObserver (triggerOnView:', triggerOnView, 'autoStart:', autoStart, ')');
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    console.log('[EncryptedText] Observer entry:', entry.isIntersecting);
                    if (entry.isIntersecting && !hasStarted) {
                        handleInView();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            console.log('[EncryptedText] Observing element');
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            if (delayTimeoutRef.current) {
                clearTimeout(delayTimeoutRef.current);
            }
        };
    }, [triggerOnView, hasStarted, autoStart]);

    // Auto start
    useEffect(() => {
        if (autoStart && !hasStarted) {
            console.log('[EncryptedText] Auto-starting');
            handleInView();
        }

        return () => {
            if (delayTimeoutRef.current) {
                clearTimeout(delayTimeoutRef.current);
            }
        };
    }, [autoStart]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
            if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
        };
    }, []);

    // Render characters
    const characters = useMemo(() => {
        console.log('[EncryptedText] Rendering chars, revealedCount:', revealedCount);
        return text.split('').map((char, index) => {
            const isRevealed = index < revealedCount;
            const isSpace = char === ' ';

            if (isSpace) {
                return <span key={index}>&nbsp;</span>;
            }

            const displayChar = isRevealed ? char : scrambledChars[index];
            const charClass = isRevealed ? revealedClassName : encryptedClassName;

            return (
                <span
                    key={index}
                    className={`encrypted-char ${charClass}`}
                    style={{
                        display: 'inline-block',
                    }}
                >
                    {displayChar}
                </span>
            );
        });
    }, [text, revealedCount, scrambledChars, encryptedClassName, revealedClassName]);

    return (
        <span
            ref={containerRef}
            className={`encrypted-text ${className}`}
            {...props}
        >
            {characters}
        </span>
    );
};

export default EncryptedText;


