import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ElenaIntro = ({ onComplete }) => {
    const containerRef = useRef(null);
    const [phase, setPhase] = useState('animating'); // 'animating', 'fading', 'done'

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Disable scroll during intro
        document.body.style.overflow = 'hidden';

        // Elements
        const loadingLetters = container.querySelectorAll('.elena__letter');
        const box = container.querySelector('.elena-loader__box');
        const growingImage = container.querySelector('.elena__growing-image');
        const headingStart = container.querySelector('.elena__h1-start');
        const headingEnd = container.querySelector('.elena__h1-end');
        const coverImageExtras = container.querySelectorAll('.elena__cover-image-extra');

        // Set initial states BEFORE animation starts
        gsap.set(loadingLetters, { yPercent: 100 });
        gsap.set(box, { width: '0em' });
        gsap.set(growingImage, { width: '0%' });

        // GSAP Timeline
        const tl = gsap.timeline({
            defaults: {
                ease: 'expo.inOut',
            },
            onComplete: () => {
                setPhase('fading');

                // Smooth fade out the entire intro overlay
                gsap.to(container, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        setPhase('done');
                        document.body.style.overflow = '';
                        if (onComplete) onComplete();
                    }
                });
            }
        });

        // 1. Letters animate in from bottom (staggered)
        tl.to(loadingLetters, {
            yPercent: 0,
            stagger: 0.025,
            duration: 1.25,
            ease: 'expo.out'
        });

        // 2. Box grows in the middle (starts after letters begin)
        tl.to(box, {
            width: '1em',
            duration: 1.25
        }, '-=0.5');

        // 3. Image grows inside box (same time as box)
        tl.to(growingImage, {
            width: '100%',
            duration: 1.25
        }, '<');

        // 4. Letters spread apart slightly
        tl.to(headingStart, {
            x: '-0.05em',
            duration: 1.25
        }, '<');

        tl.to(headingEnd, {
            x: '0.05em',
            duration: 1.25
        }, '<');

        // 5. Extra images flash through (fade out one by one)
        tl.to(coverImageExtras, {
            opacity: 0,
            duration: 0.08,
            ease: 'none',
            stagger: 0.4
        }, '-=0.1');
tl.add(() => {
    const rect = growingImage.getBoundingClientRect();

    gsap.set(growingImage, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0
    });
});

tl.to(growingImage, {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    duration: 1.8,
    ease: 'expo.inOut'
}, '+=0.3');

        // 7. Box also expands
        tl.to(box, {
            width: '110vw',
            duration: 1.8
        }, '<');

        return () => {
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    // When done, render nothing - Hero is already visible behind
    if (phase === 'done') return null;

    return (
        <section
            ref={containerRef}
            className="elena-header"
            style={{ pointerEvents: phase === 'fading' ? 'none' : 'auto' }}
        >
            <div className="elena-loader">
                <div className="elena__h1">
                    {/* Left side letters: E-l-e */}
                    <div className="elena__h1-start">
                        <div className="elena__letter-wrap"><span className="elena__letter">E</span></div>
                        <div className="elena__letter-wrap"><span className="elena__letter">l</span></div>
                        <div className="elena__letter-wrap"><span className="elena__letter">e</span></div>
                    </div>

                    {/* Center box with growing image */}
                    <div className="elena-loader__box">
                        <div className="elena-loader__box-inner">
                            <div className="elena__growing-image">
                                <div className="elena__growing-image-wrap">
                                    {/* Preview images that flash and fade */}
                                    <img className="elena__cover-image-extra is--1" src="/assets/gallery/paons-et-pavots.jpg" alt="" />
                                    <img className="elena__cover-image-extra is--2" src="/assets/gallery/cacatoës-et-magnolia.jpg" alt="" />
                                    <img className="elena__cover-image-extra is--3" src="/assets/gallery/cygne-sauvage.jpg" alt="" />
                                    {/* Final image - will crossfade smoothly to Hero */}
                                    <img className="elena__cover-image" src="/assets/gallery/faisans-ordinaires.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side letters: n-a */}
                    <div className="elena__h1-end">
                        <div className="elena__letter-wrap"><span className="elena__letter">n</span></div>
                        <div className="elena__letter-wrap"><span className="elena__letter">a</span></div>
                    </div>
                </div>
            </div>

            <style>{`
                .elena-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: #fcf7e7;
                    z-index: 9999;
                    overflow: hidden;
                }

                .elena-loader {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #1a1a1a;
                    overflow: hidden;
                }

                .elena__h1 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    white-space: nowrap;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(4rem, 12vw, 12.5rem);
                    font-weight: 500;
                    line-height: 0.85;
                    position: relative;
                }

                .elena__h1-start {
                    display: flex;
                    justify-content: flex-end;
                }

                .elena__h1-end {
                    display: flex;
                    justify-content: flex-start;
                }

                .elena__letter-wrap {
                    overflow: hidden;
                    display: inline-block;
                    line-height: 1;
                }

                .elena__letter {
                    display: block;
                    position: relative;
                    will-change: transform;
                }

                .elena-loader__box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 0;
                    height: 1em;
                    position: relative;
                    overflow: visible;
                }

                .elena-loader__box-inner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 1em;
                    height: 100%;
                    position: relative;
                }

                .elena__growing-image {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 0%;
                    height: 100%;
                    position: absolute;
                    overflow: hidden;
                }

                .elena__growing-image-wrap {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                .elena__cover-image,
                .elena__cover-image-extra {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    pointer-events: none;
                    user-select: none;
                }

                .elena__cover-image-extra.is--1 { z-index: 3; }
                .elena__cover-image-extra.is--2 { z-index: 2; }
                .elena__cover-image-extra.is--3 { z-index: 1; }

                @media screen and (max-width: 768px) {
                    .elena__h1 {
                        font-size: clamp(2.5rem, 10vw, 4rem);
                    }
                }
            `}</style>
        </section>
    );
};

export default ElenaIntro;