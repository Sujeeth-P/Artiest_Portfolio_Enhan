import { useEffect, useRef } from 'react';

/**
 * Hook that adds scroll-triggered animations to elements
 * Uses IntersectionObserver for wide browser compatibility
 */
export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.2,
        rootMargin = '0px 0px -100px 0px',
        animationClass = 'animate-visible'
    } = options;

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animationClass);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, animationClass]);

    return ref;
};

/**
 * Component that wraps children with scroll animation
 */
export const ScrollReveal = ({
    children,
    animation = 'fade-up', // fade-up, fade-left, fade-right, scale
    delay = 0,
    duration = 600,
    className = '',
    ...props
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Set initial styles
        const initialStyles = {
            'fade-up': { opacity: 0, transform: 'translateY(40px)' },
            'fade-left': { opacity: 0, transform: 'translateX(-40px)' },
            'fade-right': { opacity: 0, transform: 'translateX(40px)' },
            'scale': { opacity: 0, transform: 'scale(0.85)' },
            'blur': { opacity: 0, filter: 'blur(10px)' }
        };

        const initial = initialStyles[animation] || initialStyles['fade-up'];
        Object.assign(element.style, initial);
        element.style.transition = `all ${duration}ms ease-out ${delay}ms`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate to visible state
                        element.style.opacity = '1';
                        element.style.transform = 'none';
                        element.style.filter = 'none';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [animation, delay, duration]);

    return (
        <div ref={ref} className={className} {...props}>
            {children}
        </div>
    );
};

/**
 * Initialize scroll animations on elements with data-animate attribute
 * Call this once in your app
 * Animations trigger only when 20% of element is visible AND it's at least 100px into viewport
 */
export const initScrollAnimations = () => {
    if (typeof window === 'undefined') return;

    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay || '0', 10);

                    setTimeout(() => {
                        el.classList.add('scroll-animated');
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                        el.style.filter = 'none';
                    }, delay);

                    observer.unobserve(el);
                }
            });
        },
        {
            threshold: 0.2,  // 20% of element must be visible
            rootMargin: '0px 0px -100px 0px'  // Must be 100px into viewport from bottom
        }
    );

    animatedElements.forEach((el) => {
        const animation = el.dataset.animate || 'fade-up';

        // Set initial state based on animation type
        if (animation === 'fade-up') {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
        } else if (animation === 'fade-left') {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-40px)';
        } else if (animation === 'fade-right') {
            el.style.opacity = '0';
            el.style.transform = 'translateX(40px)';
        } else if (animation === 'scale') {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.85)';
        } else if (animation === 'blur') {
            el.style.opacity = '0';
            el.style.filter = 'blur(10px)';
        }

        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
};

export default ScrollReveal;

