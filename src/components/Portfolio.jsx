import { useState, useEffect, useRef } from 'react';

const Portfolio = ({ onViewArtwork }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const cardsRef = useRef([]);

    const filters = [
        { value: 'all', label: 'All Works' },
        { value: 'portraits', label: 'Portraits' },
        { value: 'landscapes', label: 'Landscapes' },
        { value: 'abstract', label: 'Abstract' },
        { value: 'still-life', label: 'Still Life' }
    ];

    const artworks = [
        {
            id: 'portrait',
            category: 'portraits',
            image: '/assets/portrait_artwork.png',
            title: 'Elegant Grace',
            medium: 'Oil on Canvas',
            size: '24" × 36"',
            price: '$2,400'
        },
        {
            id: 'landscape',
            category: 'landscapes',
            image: '/assets/landscape_painting.png',
            title: 'Golden Horizon',
            medium: 'Acrylic on Canvas',
            size: '30" × 40"',
            price: '$3,200'
        },
        {
            id: 'abstract',
            category: 'abstract',
            image: '/assets/abstract_art.png',
            title: 'Geometric Harmony',
            medium: 'Mixed Media',
            size: '36" × 36"',
            price: '$2,800'
        },
        {
            id: 'stilllife',
            category: 'still-life',
            image: '/assets/still_life.png',
            title: 'Floral Symphony',
            medium: 'Oil on Canvas',
            size: '20" × 24"',
            price: '$1,800'
        }
    ];

    const filteredArtworks = activeFilter === 'all'
        ? artworks
        : artworks.filter(art => art.category === activeFilter);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [filteredArtworks]);

    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-[120px] px-10 bg-[#fcf7e7]" id="portfolio">
            {/* Section Header */}
            <div className="text-center max-w-[600px] mx-auto mb-[60px]">
                <span className="inline-block text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[15px]">
                    My Work
                </span>
                <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#1a1a1a] mb-5">
                    Featured <span className="text-gold-500 italic">Portfolio</span>
                </h2>
                <p className="text-[1.05rem] text-[#4a4a4a] leading-[1.7]">
                    Explore a curated selection of my finest paintings across various styles and subjects
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-[15px] mb-[50px] flex-wrap">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-7 py-3 text-[0.85rem] font-medium rounded-[30px] transition-all duration-200
              ${activeFilter === filter.value
                                ? 'text-[#2a2a2a] bg-gold-400'
                                : 'text-[#4a4a4a] bg-white hover:text-[#2a2a2a] hover:bg-gold-300'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[30px] max-w-[1400px] mx-auto">
                {filteredArtworks.map((artwork, index) => (
                    <div
                        key={artwork.id}
                        ref={el => cardsRef.current[index] = el}
                        className="reveal bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
              transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
              hover:-translate-y-[10px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src={artwork.image}
                                alt={`${artwork.title} - ${artwork.medium}`}
                                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center 
                opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                <button
                                    onClick={() => onViewArtwork(artwork)}
                                    className="w-[60px] h-[60px] flex items-center justify-center text-white bg-gold-500 
                    rounded-full scale-[0.8] group-hover:scale-100 transition-all duration-400
                    hover:bg-white hover:text-gold-500"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-[var(--font-display)] text-[1.4rem] font-semibold text-[#1a1a1a] mb-[10px]">
                                {artwork.title}
                            </h3>
                            <div className="flex gap-[15px] mb-[15px]">
                                <span className="text-[0.85rem] text-[#7a7a7a]">{artwork.medium}</span>
                                <span className="text-[0.85rem] text-[#7a7a7a]">{artwork.size}</span>
                            </div>
                            <p className="font-[var(--font-display)] text-[1.3rem] font-semibold text-gold-500">
                                {artwork.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-[60px]">
                <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-[10px] px-8 py-4 text-[0.9rem] font-semibold rounded-[50px] 
            text-[#2a2a2a] bg-gold-400 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:bg-gold-500 hover:-translate-y-[3px] hover:shadow-[0_15px_40px_rgba(185,150,63,0.3)]"
                >
                    <span>Request Custom Artwork</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Portfolio;
