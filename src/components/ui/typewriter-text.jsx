import React, { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText - A text component that reveals text character by character (no cursor)
 */
export const TypewriterText = ({
    text,
    typingSpeed = 50,
    initialDelay = 0,
    autoStart = false,
    onComplete,
    className = '',
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const timeoutRef = useRef(null);
    const indexRef = useRef(0);

    // Start typing animation
    const startTyping = () => {
        if (hasStarted) return;
        setHasStarted(true);
        indexRef.current = 0;
        setDisplayedText('');

        const typeNextChar = () => {
            if (indexRef.current < text.length) {
                setDisplayedText(text.slice(0, indexRef.current + 1));
                indexRef.current++;
                timeoutRef.current = setTimeout(typeNextChar, typingSpeed);
            } else {
                setIsComplete(true);
                onComplete?.();
            }
        };

        timeoutRef.current = setTimeout(typeNextChar, initialDelay);
    };

    // Auto start when prop changes
    useEffect(() => {
        if (autoStart && !hasStarted) {
            startTyping();
        }
    }, [autoStart]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <span className={`typewriter-text ${className}`} {...props}>
            {displayedText}
            {/* Invisible placeholder to maintain width/layout */}
            <span style={{ visibility: 'hidden', position: 'absolute' }}>
                {text.slice(displayedText.length)}
            </span>
        </span>
    );
};

export default TypewriterText;
