import { useState, useEffect } from 'react';
import ScrollExpandMedia from './ui/ScrollExpandMedia';

const MediaContent = ({ mediaType }) => {
  const content = {
    video: {
      overview: 'Welcome to my creative universe. As a digital artist, I transform imagination into visual narratives that speak to the soul. Every brushstroke, every pixel is carefully crafted to tell a story.',
      conclusion: 'Scroll down to explore my gallery of works, each piece a journey into different worlds and emotions. Let\'s create something extraordinary together.'
    },
    image: {
      overview: 'Art is my language, and pixels are my poetry. Through digital illustration, I bring dreams to life and capture moments that words cannot express.',
      conclusion: 'Discover the stories behind each creation and join me on this artistic adventure.'
    }
  };

  const current = content[mediaType] || content.image;

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6' style={{ color: '#2a2a2a' }}>
        About My Art
      </h2>
      <p className='text-lg mb-8' style={{ color: '#2a2a2a' }}>
        {current.overview}
      </p>
      <p className='text-lg mb-8' style={{ color: '#2a2a2a' }}>
        {current.conclusion}
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
