import { useState, useEffect } from 'react';
import ScrollExpandMedia from './ui/ScrollExpandMedia';

const MediaContent = ({ mediaType }) => {
  const quotes = {
    video: {
      quote: '"Every artist dips his brush in his own soul, and paints his own nature into his pictures."',
      author: '— Henry Ward Beecher',
      subQuote: '"Art is not what you see, but what you make others see."',
      subAuthor: '— Edgar Degas'
    },
    image: {
      quote: '"Art enables us to find ourselves and lose ourselves at the same time."',
      author: '— Thomas Merton',
    }
  };

  const current = quotes[mediaType] || quotes.image;

  return (
    <div className='max-w-4xl mx-auto text-center py-12'>
      {/* Main Quote */}
      <blockquote
        className='text-2xl md:text-3xl font-light italic mb-4 leading-relaxed'
        style={{
          color: '#c9a961',
          fontFamily: 'Georgia, serif'
        }}
      >
        {current.quote}
      </blockquote>
      <p
        className='text-lg mb-12'
        style={{ color: '#1c1913ff' }}
      >
        {current.author}
      </p>
    </div>
  );
};

const Hero = ({ introComplete = false }) => {
  // Toggle between 'image' and 'video' to switch media types
  const mediaType = 'image';

  const [mediaContent] = useState({
    image: {
      // PITTURA Hero Image - MUST match the final image from intro (IMG_2093) for seamless transition
      src: '/assets1/IMG_2093.JPG',
      background: '/assets1/IMG_2093.JPG',  // Same as intro final image for smooth transition
      title: 'PITTURA Where The Art Speaks',
      // date: 'Sandhiya • Handcrafted Art',
      scrollToExpand: 'Scroll to Explore',
    },
    video: {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-canvas-43866-large.mp4',
      background: '/assets1/IMG_2093.JPG',
      title: 'PITTURA, Where The Art Speaks',
      // date: 'Sandhiya • Handcrafted Art',
      scrollToExpand: 'Scroll to Explore',
    }
  });

  // Reset scroll position on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const current = mediaContent[mediaType];

  return (
    <div className='min-h-screen' id="home">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={current.src}
        posterSrc={mediaType === 'video' ? current.poster : undefined}
        bgImageSrc={current.background}
        title={current.title}
        date={current.date}
        scrollToExpand={current.scrollToExpand}
        textBlend={false} // Set to true for text blend-mode effect
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Hero;
