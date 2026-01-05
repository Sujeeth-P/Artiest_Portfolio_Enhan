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
      // REPLACE WITH YOUR OWN ARTWORK
      src: '/assets/todol/Hero.webp',
      background: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
      title: 'Where Art Speaks',
      date: 'Elena Ross • Digital Artist',
      scrollToExpand: 'Scroll to Explore',
    },
    video: {
      // Example with video - you can use your own video URL
      src: 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-canvas-43866-large.mp4',
      // poster: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1280&auto=format&fit=crop',
      // background: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
      // src: '/assets/todol/Hero.webp',
      // poster: ,
      background: '/assets/todol/Hero.webp',
      title: 'Where Art Speaks',
      date: 'Elena Ross • Digital Artist',
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
