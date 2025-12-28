import { useEffect } from 'react';

const Lightbox = ({ isOpen, artwork, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!artwork) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`lightbox ${isOpen ? 'active' : ''}`}
            onClick={handleBackdropClick}
        >
            <button
                className="lightbox-close"
                onClick={onClose}
                aria-label="Close lightbox"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            <div className="lightbox-content">
                <img
                    src={artwork.image}
                    alt={artwork.title}
                />
                <div className="lightbox-info">
                    <h3>{artwork.title}</h3>
                    <p>{artwork.medium} {artwork.size ? `• ${artwork.size}` : ''} {artwork.year ? `• ${artwork.year}` : ''}</p>
                    {artwork.description && <p style={{ marginTop: '10px', opacity: 0.7 }}>{artwork.description}</p>}
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
