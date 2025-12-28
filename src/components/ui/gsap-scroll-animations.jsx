/**
 * =================================================================
 * MODULAR GSAP SCROLL ANIMATION SYSTEM
 * =================================================================
 * 
 * A performance-optimized scroll animation system using GSAP + ScrollTrigger.
 * Works alongside existing animations without conflicts.
 * 
 * USAGE:
 * ------
 * 1. Import and call initGsapScrollAnimations() once in your app
 * 2. Add classes to elements you want to animate:
 *    - .section-heading  → Headings with fade + rise effect
 *    - .section-text     → Paragraphs with staggered fade
 *    - .bg-reveal        → Background reveal effect
 *    - .gsap-fade-up     → Generic fade up animation
 *    - .gsap-fade-left   → Fade from left
 *    - .gsap-fade-right  → Fade from right
 *    - .gsap-scale       → Scale up effect
 * 
 * 3. Optional data attributes for customization:
 *    - data-gsap-delay="0.2"     → Delay in seconds
 *    - data-gsap-duration="0.8"  → Duration in seconds
 *    - data-gsap-stagger="0.1"   → Stagger for child elements
 * 
 * =================================================================
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// =================================================================
// CONFIGURATION - Adjust these values to customize animations
// =================================================================

const CONFIG = {
    // Default animation timing
    duration: 0.8,           // Animation duration in seconds
    ease: 'power3.out',      // Easing function (smooth deceleration)

    // ScrollTrigger defaults
    start: 'top 85%',        // When animation starts (element top hits 85% viewport)
    toggleActions: 'play none none none',  // play on enter, don't reverse

    // Animation values
    fadeDistance: 50,        // How far elements move (in pixels)
    scaleFrom: 0.9,          // Starting scale for scale animations

    // Stagger timing for grouped elements
    staggerAmount: 0.12,     // Delay between staggered children

    // Performance
    markers: false,          // Set to true for debugging ScrollTrigger
};

// =================================================================
// ANIMATION DEFINITIONS
// =================================================================

/**
 * Fade Up Animation
 * Elements rise from below while fading in
 */
const animateFadeUp = (elements, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };

    gsap.set(elements, {
        opacity: 0,
        y: config.fadeDistance,
    });

    gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: config.staggerAmount,
        scrollTrigger: {
            trigger: elements[0] || elements,
            start: config.start,
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

/**
 * Fade Left Animation
 * Elements slide in from the left
 */
const animateFadeLeft = (elements, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };

    gsap.set(elements, {
        opacity: 0,
        x: -config.fadeDistance,
    });

    gsap.to(elements, {
        opacity: 1,
        x: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: config.staggerAmount,
        scrollTrigger: {
            trigger: elements[0] || elements,
            start: config.start,
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

/**
 * Fade Right Animation
 * Elements slide in from the right
 */
const animateFadeRight = (elements, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };

    gsap.set(elements, {
        opacity: 0,
        x: config.fadeDistance,
    });

    gsap.to(elements, {
        opacity: 1,
        x: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: config.staggerAmount,
        scrollTrigger: {
            trigger: elements[0] || elements,
            start: config.start,
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

/**
 * Scale Animation
 * Elements scale up while fading in
 */
const animateScale = (elements, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };

    gsap.set(elements, {
        opacity: 0,
        scale: config.scaleFrom,
    });

    gsap.to(elements, {
        opacity: 1,
        scale: 1,
        duration: config.duration,
        ease: 'back.out(1.2)',
        stagger: config.staggerAmount,
        scrollTrigger: {
            trigger: elements[0] || elements,
            start: config.start,
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

/**
 * Section Heading Animation
 * Special animation for headings with enhanced effects
 */
const animateSectionHeading = (element, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };
    const delay = parseFloat(element.dataset.gsapDelay) || 0;
    const duration = parseFloat(element.dataset.gsapDuration) || config.duration;

    gsap.set(element, {
        opacity: 0,
        y: 40,
    });

    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

/**
 * Section Text Animation
 * Paragraph text with subtle fade and rise
 */
const animateSectionText = (element, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };
    const delay = parseFloat(element.dataset.gsapDelay) || 0.15;
    const duration = parseFloat(element.dataset.gsapDuration) || 0.7;

    gsap.set(element, {
        opacity: 0,
        y: 30,
    });

    gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

/**
 * Background Reveal Animation
 * Reveals section background with a wipe effect
 */
const animateBgReveal = (element, customConfig = {}) => {
    const config = { ...CONFIG, ...customConfig };

    // Create a clip-path reveal effect
    gsap.set(element, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 1,
    });

    gsap.to(element, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: config.toggleActions,
            markers: config.markers,
        }
    });
};

// =================================================================
// MAIN INITIALIZATION FUNCTION
// =================================================================

/**
 * Initialize all GSAP scroll animations
 * Call this once after your app mounts
 * 
 * @param {Object} options - Custom configuration options
 */
export const initGsapScrollAnimations = (options = {}) => {
    // Skip if running server-side
    if (typeof window === 'undefined') return;

    // Merge custom options with defaults
    const config = { ...CONFIG, ...options };

    // Kill existing ScrollTriggers to prevent duplicates on re-init
    // Only kill triggers we created (marked with our custom class)
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger?.classList?.contains('gsap-animated')) {
            trigger.kill();
        }
    });

    // ===============================
    // SECTION HEADINGS (.section-heading)
    // ===============================
    const headings = document.querySelectorAll('.section-heading:not(.gsap-animated)');
    headings.forEach(heading => {
        heading.classList.add('gsap-animated');
        animateSectionHeading(heading, config);
    });

    // ===============================
    // SECTION TEXT (.section-text)
    // ===============================
    const texts = document.querySelectorAll('.section-text:not(.gsap-animated)');
    texts.forEach(text => {
        text.classList.add('gsap-animated');
        animateSectionText(text, config);
    });

    // ===============================
    // BACKGROUND REVEAL (.bg-reveal)
    // ===============================
    const bgReveals = document.querySelectorAll('.bg-reveal:not(.gsap-animated)');
    bgReveals.forEach(bg => {
        bg.classList.add('gsap-animated');
        animateBgReveal(bg, config);
    });

    // ===============================
    // GENERIC ANIMATIONS
    // ===============================

    // Fade Up
    const fadeUps = document.querySelectorAll('.gsap-fade-up:not(.gsap-animated)');
    if (fadeUps.length) {
        fadeUps.forEach(el => el.classList.add('gsap-animated'));
        animateFadeUp(fadeUps, config);
    }

    // Fade Left
    const fadeLefts = document.querySelectorAll('.gsap-fade-left:not(.gsap-animated)');
    if (fadeLefts.length) {
        fadeLefts.forEach(el => el.classList.add('gsap-animated'));
        animateFadeLeft(fadeLefts, config);
    }

    // Fade Right
    const fadeRights = document.querySelectorAll('.gsap-fade-right:not(.gsap-animated)');
    if (fadeRights.length) {
        fadeRights.forEach(el => el.classList.add('gsap-animated'));
        animateFadeRight(fadeRights, config);
    }

    // Scale
    const scales = document.querySelectorAll('.gsap-scale:not(.gsap-animated)');
    if (scales.length) {
        scales.forEach(el => el.classList.add('gsap-animated'));
        animateScale(scales, config);
    }

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    console.log('✨ GSAP Scroll Animations initialized');
};

// =================================================================
// REACT HOOK FOR COMPONENT-LEVEL ANIMATIONS
// =================================================================

import { useEffect, useRef } from 'react';

/**
 * React hook for applying GSAP scroll animation to a single element
 * 
 * @param {string} animation - Animation type: 'fade-up', 'fade-left', 'fade-right', 'scale'
 * @param {Object} options - Custom animation options
 * @returns {React.RefObject} - Ref to attach to your element
 * 
 * USAGE:
 * const headingRef = useGsapScrollAnimation('fade-up', { delay: 0.2 });
 * return <h2 ref={headingRef}>Animated Heading</h2>
 */
export const useGsapScrollAnimation = (animation = 'fade-up', options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const config = { ...CONFIG, ...options };
        const delay = options.delay || 0;
        const duration = options.duration || config.duration;

        // Set initial state based on animation type
        const initialStates = {
            'fade-up': { opacity: 0, y: config.fadeDistance },
            'fade-left': { opacity: 0, x: -config.fadeDistance },
            'fade-right': { opacity: 0, x: config.fadeDistance },
            'scale': { opacity: 0, scale: config.scaleFrom },
        };

        const initial = initialStates[animation] || initialStates['fade-up'];
        gsap.set(element, initial);

        // Create scroll-triggered animation
        const tween = gsap.to(element, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: duration,
            delay: delay,
            ease: config.ease,
            scrollTrigger: {
                trigger: element,
                start: config.start,
                toggleActions: config.toggleActions,
            }
        });

        // Cleanup on unmount
        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === element) t.kill();
            });
        };
    }, [animation, options]);

    return ref;
};

// =================================================================
// REACT COMPONENT FOR DECLARATIVE ANIMATIONS
// =================================================================

/**
 * GsapScrollReveal Component
 * Wrap any content to add scroll-triggered animation
 * 
 * USAGE:
 * <GsapScrollReveal animation="fade-up" delay={0.2}>
 *   <h2>Animated Content</h2>
 * </GsapScrollReveal>
 */
export const GsapScrollReveal = ({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 0.8,
    className = '',
    as: Component = 'div',
    ...props
}) => {
    const ref = useGsapScrollAnimation(animation, { delay, duration });

    return (
        <Component ref={ref} className={className} {...props}>
            {children}
        </Component>
    );
};

// =================================================================
// UTILITY: STAGGERED CHILDREN ANIMATION
// =================================================================

/**
 * Animate all children of a container with stagger effect
 * 
 * @param {HTMLElement} container - Parent container element
 * @param {Object} options - Animation options
 */
export const animateStaggeredChildren = (container, options = {}) => {
    const config = { ...CONFIG, ...options };
    const children = container.children;

    if (!children.length) return;

    gsap.set(children, {
        opacity: 0,
        y: 30,
    });

    gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: config.duration,
        ease: config.ease,
        stagger: options.stagger || config.staggerAmount,
        scrollTrigger: {
            trigger: container,
            start: config.start,
            toggleActions: config.toggleActions,
        }
    });
};

// =================================================================
// DEFAULT EXPORT
// =================================================================

export default {
    init: initGsapScrollAnimations,
    useAnimation: useGsapScrollAnimation,
    ScrollReveal: GsapScrollReveal,
    animateChildren: animateStaggeredChildren,
};
