/**
 * HERO SECTION - EXAMPLE CONFIGURATIONS
 * 
 * Copy and paste these configurations into your Hero.jsx file
 * to quickly switch between different styles and effects.
 */

// ============================================
// EXAMPLE 1: Image-based Hero (Current)
// ============================================
const IMAGE_HERO_CONFIG = {
    mediaType: 'image',
    content: {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1280&auto=format&fit=crop',
        background: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
        title: 'Where Art Speaks',
        date: 'Elena Ross • Digital Artist',
        scrollToExpand: 'Scroll to Explore',
    }
};


// ============================================
// EXAMPLE 2: Video-based Hero
// ============================================
const VIDEO_HERO_CONFIG = {
    mediaType: 'video',
    content: {
        src: 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-canvas-43866-large.mp4',
        poster: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1280&auto=format&fit=crop',
        background: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
        title: 'Creative Journey',
        date: 'Elena Ross • Digital Artist',
        scrollToExpand: 'Scroll to Begin',
    }
};


// ============================================
// EXAMPLE 3: YouTube Video Hero
// ============================================
const YOUTUBE_HERO_CONFIG = {
    mediaType: 'video',
    content: {
        // Replace VIDEO_ID with your YouTube video ID
        src: 'https://www.youtube.com/watch?v=VIDEO_ID',
        background: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
        title: 'My Creative Process',
        date: 'Watch & Learn',
        scrollToExpand: 'Scroll to Expand',
    }
};


// ============================================
// EXAMPLE 4: Artistic Portfolio Piece
// ============================================
const PORTFOLIO_PIECE_CONFIG = {
    mediaType: 'image',
    content: {
        // Use your best artwork here
        src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1280&auto=format&fit=crop',
        background: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1920&auto=format&fit=crop',
        title: 'Digital Dreams',
        date: '2024 • Featured Work',
        scrollToExpand: 'Discover More',
    }
};


// ============================================
// EXAMPLE 5: Minimalist Style
// ============================================
const MINIMALIST_CONFIG = {
    mediaType: 'image',
    content: {
        src: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1280&auto=format&fit=crop',
        background: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1920&auto=format&fit=crop',
        title: 'Simplicity in Art',
        date: 'Less is More',
        scrollToExpand: 'Scroll Down',
    }
};


// ============================================
// HOW TO USE THESE CONFIGS
// ============================================

/*
1. Copy one of the configs above
2. In your Hero.jsx, replace the mediaContent state:

const [mediaContent] = useState({
  image: IMAGE_HERO_CONFIG.content,
  video: VIDEO_HERO_CONFIG.content,
});

const mediaType = IMAGE_HERO_CONFIG.mediaType;

*/


// ============================================
// CUSTOM ARTWORK SUGGESTIONS
// ============================================

/*
For the BEST results with YOUR artwork:

1. **Main Image (src)**
   - Size: 1280x720 or larger
   - Format: JPG or PNG
   - High quality, but optimized (< 500KB)
   - Your best artwork or signature piece

2. **Background Image (bgImageSrc)**
   - Size: 1920x1080 or larger
   - Slightly blurred version of main image
   - OR: Complementary artwork
   - OR: Abstract texture that matches your style

3. **Video Options (if using video)**
   - Format: MP4 (H.264)
   - Size: Under 10MB for smooth loading
   - Duration: 10-30 seconds (will loop)
   - No audio needed (plays muted)

4. **Color Scheme**
   - Match your brand colors
   - Ensure text is readable
   - Use textBlend={true} for artistic text effects
*/


// ============================================
// ADVANCED CUSTOMIZATION
// ============================================

const ADVANCED_CONFIG = {
    mediaType: 'image',
    content: {
        src: '/assets/your-artwork.jpg',  // Use local assets
        background: '/assets/your-bg.jpg',
        title: 'Your Custom Title',
        date: 'Your Subtitle',
        scrollToExpand: 'Your CTA',
    },
    // Additional options you can pass to ScrollExpandMedia:
    textBlend: true,  // Enable mix-blend-difference effect
    // Add more custom props as needed
};


// ============================================
// FREQUENTLY USED UNSPLASH CATEGORIES
// ============================================

/*
Replace the URLs with Unsplash images from these categories:

Digital Art:
https://images.unsplash.com/photo-{ID}?q=80&w=1280&auto=format&fit=crop
- photo-1618005182384-a83a8bd57fbe (abstract art)
- photo-1549887534-1541e9326642 (digital art)
- photo-1557672172-298e090bd0f1 (geometric)

Nature/Artistic:
- photo-1579783902614-a3fb3927b6a5 (flowers)
- photo-1574169208507-84376144848b (abstract nature)
- photo-1557672172-298e090bd0f1 (minimalist)

Portrait/Character Art:
- photo-1513364776144-60967b0f800f (portrait)
- photo-1561214115-f2f134cc4912 (character)

*/


// ============================================
// EXPORT FOR QUICK USE
// ============================================

export {
    IMAGE_HERO_CONFIG,
    VIDEO_HERO_CONFIG,
    YOUTUBE_HERO_CONFIG,
    PORTFOLIO_PIECE_CONFIG,
    MINIMALIST_CONFIG,
    ADVANCED_CONFIG,
};
