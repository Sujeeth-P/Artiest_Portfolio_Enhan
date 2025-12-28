import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ConversationIntro = () => {
    const sectionRef = useRef(null);
    const leftCharRef = useRef(null);
    const rightCharRef = useRef(null);
    const leftBubbleRef = useRef(null);
    const rightBubbleRef = useRef(null);
    const leftWrapperRef = useRef(null);
    const prevIndexRef = useRef(0);
    const sophieCenteredRef = useRef(false);
    const [currentMsgIndex, setCurrentMsgIndex] = useState(-1); // Start at -1 (not started)
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [exitProgress, setExitProgress] = useState(0);
    const [sectionActive, setSectionActive] = useState(false);

    // Conversation messages
    const messages = [
        { side: 'left', name: 'Sophie', text: "Hey Marcus! Have you seen Elena's new collection? 🎨" },
        { side: 'right', name: 'Marcus', text: "Not yet! I've heard amazing things about it." },
        { side: 'left', name: 'Sophie', text: "The botanical illustrations are breathtaking!" },
        { side: 'right', name: 'Marcus', text: "I love her wildlife pieces too. The peacocks!" },
        { side: 'left', name: 'Sophie', text: "Her color palette is so elegant " },
        { side: 'right', name: 'Marcus', text: "Should we explore her gallery?" },
        { side: 'left', name: 'Sophie', text: "Yes! Let's dive in! " },
        { side: 'center', isAction: true }
    ];

    const currentMessage = currentMsgIndex >= 0 ? messages[currentMsgIndex] : null;

    // Typewriter effect - only runs when section is active
    useEffect(() => {
        if (currentMsgIndex < 0 || !sectionActive) return;

        const msg = messages[currentMsgIndex];
        if (msg.isAction) {
            setDisplayedText(msg.text || '');
            setIsTyping(false);
            return;
        }

        setDisplayedText('');
        setIsTyping(true);

        let charIndex = 0;
        const text = msg.text;

        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                setDisplayedText(text.substring(0, charIndex + 1));
                charIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typeInterval);
            }
        }, 35);

        return () => clearInterval(typeInterval);
    }, [currentMsgIndex, sectionActive]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const totalMessages = messages.length;
            const scrollPerMessage = window.innerHeight * 0.5;
            const exitScrollDistance = window.innerHeight * 0.8; // Extra scroll for Sophie's exit

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${(totalMessages * scrollPerMessage) + exitScrollDistance}`,
                pin: true,
                scrub: 0.5,
                onEnter: () => {
                    // Section reached - start the conversation
                    setSectionActive(true);
                    if (currentMsgIndex < 0) {
                        setCurrentMsgIndex(0);
                    }
                },
                onLeaveBack: () => {
                    // Scrolled back above section
                    setSectionActive(false);
                    setCurrentMsgIndex(-1);
                    setDisplayedText('');
                },
                onUpdate: (self) => {
                    const conversationEnd = (totalMessages * scrollPerMessage);
                    const totalDistance = conversationEnd + exitScrollDistance;
                    const currentScroll = self.progress * totalDistance;

                    if (currentScroll < conversationEnd) {
                        // During conversation
                        const conversationProgress = currentScroll / conversationEnd;
                        const newIndex = Math.min(
                            Math.floor(conversationProgress * totalMessages),
                            totalMessages - 1
                        );
                        if (newIndex >= 0) {
                            setCurrentMsgIndex(newIndex);
                        }
                        setExitProgress(0);
                    } else {
                        // During exit phase - Sophie staggers out
                        setCurrentMsgIndex(totalMessages - 1);
                        const exitPhaseProgress = (currentScroll - conversationEnd) / exitScrollDistance;
                        setExitProgress(Math.min(exitPhaseProgress, 1));
                    }
                }
            });

            // Left character entrance
            gsap.fromTo(leftCharRef.current,
                { scale: 0, opacity: 0, x: -80 },
                {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Right character entrance
            gsap.fromTo(rightCharRef.current,
                { scale: 0, opacity: 0, x: 80 },
                {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    delay: 0.2,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

        }, section);

        return () => ctx.revert();
    }, []);

    // Animate bubbles on message change + exit animation
    useEffect(() => {
        if (currentMsgIndex < 0) return; // Not started yet

        const msg = messages[currentMsgIndex];
        const isLeft = msg.side === 'left';
        const isRight = msg.side === 'right';
        const isAction = msg.isAction;
        prevIndexRef.current = currentMsgIndex;

        const activeBubble = isLeft ? leftBubbleRef.current : rightBubbleRef.current;

        // When conversation ends, Sophie moves to center
        if (isAction && !sophieCenteredRef.current) {
            const leftWrapper = leftCharRef.current?.parentElement;
            const rightWrapper = rightCharRef.current?.parentElement;

            // Store reference
            leftWrapperRef.current = leftWrapper;

            // Hide BOTH thought bubbles immediately
            gsap.to([leftBubbleRef.current, rightBubbleRef.current], {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in'
            });

            // Hide Marcus immediately
            gsap.to(rightCharRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
            });

            // Move Sophie's wrapper to center (without bubble)
            if (leftWrapper) {
                // Calculate center position
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const wrapperRect = leftWrapper.getBoundingClientRect();

                const targetX = (windowWidth / 2) - wrapperRect.left - (wrapperRect.width / 2);
                const targetY = (windowHeight / 2) - wrapperRect.top - (wrapperRect.height / 2);

                // Store target position for scroll-driven exit
                leftWrapper.dataset.targetY = targetY;

                // Animate Sophie to center - make her bigger (she stays here until scroll)
                gsap.to(leftWrapper, {
                    x: targetX,
                    y: targetY,
                    scale: 1.5,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        sophieCenteredRef.current = true;
                    }
                });
            }
        } else {
            // Reset characters if scrolling back
            sophieCenteredRef.current = false;

            const leftWrapper = leftCharRef.current?.parentElement;
            const rightWrapper = rightCharRef.current?.parentElement;

            // Reset wrapper positions (no opacity - let CSS handle it)
            if (leftWrapper) {
                gsap.to(leftWrapper, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    clearProps: 'opacity' // Clear GSAP opacity so CSS takes over
                });
            }

            gsap.to([leftCharRef.current, rightCharRef.current], {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                clearProps: 'opacity' // Clear GSAP opacity so CSS takes over
            });

            gsap.to([leftBubbleRef.current, rightBubbleRef.current], {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        if (activeBubble && !msg.isAction) {
            gsap.fromTo(activeBubble,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
            );
        }

        // Character pulse when speaking
        if (isLeft && leftCharRef.current && !isAction) {
            gsap.to(leftCharRef.current, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        } else if (isRight && rightCharRef.current && !isAction) {
            gsap.to(rightCharRef.current, {
                scale: 1.02,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }

    }, [currentMsgIndex]);

    // Scroll-driven Sophie stagger out
    useEffect(() => {
        const leftWrapper = leftWrapperRef.current;
        if (!leftWrapper || !sophieCenteredRef.current) return;

        const targetY = parseFloat(leftWrapper.dataset.targetY) || 0;

        // Animate Sophie based on scroll progress
        gsap.to(leftWrapper, {
            y: targetY + (exitProgress * 300),
            opacity: 1 - exitProgress,
            scale: 1.5 - (exitProgress * 0.3),
            duration: 0.1,
            ease: 'none',
            overwrite: true
        });

    }, [exitProgress]);

    return (
        <section ref={sectionRef} className="conv-section">
            <div className="conv-container">

                {/* LEFT CHARACTER - SOPHIE with thought bubble */}
                <div className={`character-wrapper left-wrapper ${currentMessage?.side !== 'left' ? 'inactive' : ''}`}>
                    <div
                        ref={leftCharRef}
                        className={`character ${currentMessage?.side === 'left' ? 'speaking' : ''}`}
                    >
                        <div className="char-image">
                            <img src="/assets/todol/convooo.png" alt="Sophie" />
                        </div>
                        <div className="char-label">
                            <span className="char-name">SOPHIE</span>
                            {currentMessage?.side === 'left' && (
                                <div className="typing-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sophie's thought bubble - positioned above/beside */}
                    <div
                        ref={leftBubbleRef}
                        className={`thought-bubble left-bubble ${currentMessage?.side === 'left' ? 'active' : ''}`}
                    >
                        <div className="bubble-cloud">
                            <div className="bubble-content">
                                <span className="speaker-name">{currentMessage?.side === 'left' ? currentMessage.name : 'Sophie'}</span>
                                <p className="message-text">
                                    {currentMessage?.side === 'left' ? displayedText : ''}
                                    {currentMessage?.side === 'left' && isTyping && <span className="typing-cursor">|</span>}
                                </p>
                            </div>
                        </div>
                        <div className="bubble-tail left-tail">
                            <div className="tail-dot t1"></div>
                            <div className="tail-dot t2"></div>
                            <div className="tail-dot t3"></div>
                        </div>
                    </div>
                </div>

                {/* CENTER - Action message */}
                {currentMessage?.isAction && (
                    <div className="center-action">
                        <p className="action-text">{currentMessage.text}</p>
                        <div className="scroll-indicator">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* RIGHT CHARACTER - MARCUS with thought bubble */}
                <div className={`character-wrapper right-wrapper ${currentMessage?.side !== 'right' ? 'inactive' : ''}`}>
                    {/* Marcus's thought bubble */}
                    <div
                        ref={rightBubbleRef}
                        className={`thought-bubble right-bubble ${currentMessage?.side === 'right' ? 'active' : ''}`}
                    >
                        <div className="bubble-cloud">
                            <div className="bubble-content">
                                <span className="speaker-name">{currentMessage?.side === 'right' ? currentMessage.name : 'Marcus'}</span>
                                <p className="message-text">
                                    {currentMessage?.side === 'right' ? displayedText : ''}
                                    {currentMessage?.side === 'right' && isTyping && <span className="typing-cursor">|</span>}
                                </p>
                            </div>
                        </div>
                        <div className="bubble-tail right-tail">
                            <div className="tail-dot t1"></div>
                            <div className="tail-dot t2"></div>
                            <div className="tail-dot t3"></div>
                        </div>
                    </div>

                    <div
                        ref={rightCharRef}
                        className={`character ${currentMessage?.side === 'right' ? 'speaking' : ''}`}
                    >
                        <div className="char-image">
                            <img src="/assets/todol/convoo.png" alt="Marcus" />
                        </div>
                        <div className="char-label">
                            <span className="char-name">MARCUS</span>
                            {currentMessage?.side === 'right' && (
                                <div className="typing-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Progress dots */}
                {/* <div className="progress-dots">
                    {messages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`dot ${idx === currentMsgIndex ? 'active' : ''} ${idx < currentMsgIndex ? 'done' : ''}`}
                        />
                    ))}
                </div> */}
            </div>

            <style>{`
                .conv-section {
                    height: 100vh;
                    background: #fcf7e7;
                    overflow: hidden;
                    position: relative;
                }

                .conv-container {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                /* Character Wrappers - Centered Layout */
                .character-wrapper {
                    position: absolute;
                    display: flex;
                    align-items: flex-start;
                }

                .left-wrapper {
                    top: 160px;
                    left: 17%;
                    transform: none;
                }

                .right-wrapper {
                    bottom: 100px;
                    right: 17%;
                    left: auto;
                    transform: none;
                }

                /* Fade entire wrapper (character + bubble) when not speaking */
                .character-wrapper {
                    transition: all 0.4s ease;
                    filter: none;
                    opacity: 1;
                }

                .character-wrapper.inactive {
                    filter: grayscale(0.3);
                    opacity: 0.5;
                }

                /* Hide bubbles in inactive wrappers */
                .character-wrapper.inactive .thought-bubble {
                    opacity: 0 !important;
                    visibility: hidden;
                }

                /* Character */
                .character {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    transition: all 0.4s ease;
                }

                .char-image {
                    width: 180px;
                    height: auto;
                }

                .char-image img {
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                }

                .char-label {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                }

                .char-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 0.85rem;
                    letter-spacing: 4px;
                    color: #333;
                    font-weight: 400;
                }

                .typing-dots {
                    display: flex;
                    gap: 4px;
                }

                .typing-dots span {
                    width: 5px;
                    height: 5px;
                    background: #333;
                    border-radius: 50%;
                    animation: dotBounce 1.4s infinite ease-in-out;
                }

                .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
                .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

                @keyframes dotBounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
                    40% { transform: translateY(-5px); opacity: 1; }
                }

                /* THOUGHT BUBBLE */
                .thought-bubble {
                    position: relative;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }

                .thought-bubble.active {
                    opacity: 1;
                    pointer-events: auto;
                }

                .left-bubble {
                    position: absolute;
                    top: -20px;
                    left: 100%;
                    margin-left: 20px;
                }

                .right-bubble {
                    position: absolute;
                    top: -20px;
                    right: 100%;
                    margin-right: 20px;
                }

                .bubble-cloud {
                    position: relative;
                }

                .bubble-content {
                    background: #fff;
                    border: 2.5px solid #2d3436;
                    border-radius: 50% 50% 50% 50% / 40% 40% 55% 55%;
                    padding: 22px 28px;
                    min-width: 250px;
                    max-width: 300px;
                    min-height: 150px;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
                }

                .speaker-name {
                    display: block;
                    font-size: 0.6rem;
                    font-weight: 600;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #888;
                    margin-bottom: 8px;
                }

                .message-text {
                    font-family: 'Georgia', serif;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    padding-top: 10px;
                    color: #1a1a1a;
                    margin: 0;
                    min-height: 1.4em;
                }

                .typing-cursor {
                    display: inline-block;
                    animation: cursorBlink 0.7s step-end infinite;
                    color: #b8963f;
                    font-weight: bold;
                }

                @keyframes cursorBlink {
                    50% { opacity: 0; }
                }

                /* Bubble tail - trailing circles */
                .bubble-tail {
                    position: absolute;
                    display: flex;
                    gap: 5px;
                }

                .left-tail {
                    bottom: -8px;
                    left: 20px;
                    flex-direction: row;
                    transform: translateY(100%);
                }

                .right-tail {
                    bottom: -8px;
                    right: 20px;
                    flex-direction: row-reverse;
                    transform: translateY(100%);
                }

                .tail-dot {
                    background: #fff;
                    border: 2.5px solid #2d3436;
                    border-radius: 50%;
                }

                .t1 {
                    width: 18px;
                    height: 18px;
                }

                .t2 {
                    width: 12px;
                    height: 12px;
                }

                .t3 {
                    width: 7px;
                    height: 7px;
                }

                /* Center Action */
                .center-action {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }

                .action-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.8rem;
                    color: #1a1a1a;
                    letter-spacing: 3px;
                    margin: 0;
                    animation: fadeInText 0.6s ease forwards;
                }

                @keyframes fadeInText {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 40px;
                    right: 40px;
                    left: auto;
                    transform: none;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #1a1a1a;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeInRight 0.6s ease forwards, bounceDown 2s ease-in-out 0.6s infinite;
                    opacity: 0;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes bounceDown {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(8px); }
                }

                /* Progress dots */
                .progress-dots {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                }

                .dot.active {
                    background: #1a1a1a;
                    transform: scale(1.2);
                }

                .dot.done {
                    background: rgba(0, 0, 0, 0.4);
                }

                /* RESPONSIVE */
                @media (max-width: 1100px) {
                    .char-image {
                        width: 150px;
                    }
                    
                    .bubble-content {
                        min-width: 180px;
                        max-width: 220px;
                        padding: 18px 22px;
                    }

                    .message-text {
                        font-size: 0.85rem;
                    }

                    .left-wrapper {
                        top: 60px;
                        left: 10%;
                    }

                    .right-wrapper {
                        bottom: 80px;
                        right: 10%;
                    }
                }

                @media (max-width: 900px) {
                    .left-wrapper {
                        top: 50px;
                        left: 5%;
                    }

                    .right-wrapper {
                        bottom: 100px;
                        right: 5%;
                    }

                    .char-image {
                        width: 130px;
                    }

                    .bubble-content {
                        min-width: 160px;
                        max-width: 200px;
                        padding: 16px 20px;
                    }

                    .left-bubble {
                        margin-left: 15px;
                    }

                    .right-bubble {
                        margin-right: 15px;
                    }
                }

                @media (max-width: 700px) {
                    .conv-container {
                        flex-direction: column;
                        justify-content: space-around;
                        padding: 40px 20px;
                    }

                    .character-wrapper {
                        position: relative;
                        top: auto !important;
                        left: auto !important;
                        right: auto !important;
                        bottom: auto !important;
                        flex-direction: column;
                        align-items: center;
                    }

                    .left-bubble,
                    .right-bubble {
                        position: relative;
                        top: auto;
                        left: auto;
                        right: auto;
                        margin: 0 0 15px 0;
                    }

                    .left-tail,
                    .right-tail {
                        left: 50%;
                        right: auto;
                        transform: translateX(-50%) translateY(100%);
                    }

                    .char-image {
                        width: 120px;
                    }

                    .bubble-content {
                        min-width: 200px;
                        max-width: 260px;
                    }

                    .progress-dots {
                        bottom: 15px;
                    }
                }

                @media (max-width: 480px) {
                    .char-image {
                        width: 100px;
                    }

                    .bubble-content {
                        min-width: 180px;
                        max-width: 220px;
                        padding: 14px 18px;
                    }

                    .message-text {
                        font-size: 0.8rem;
                    }

                    .char-name {
                        font-size: 0.75rem;
                        letter-spacing: 3px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ConversationIntro;
