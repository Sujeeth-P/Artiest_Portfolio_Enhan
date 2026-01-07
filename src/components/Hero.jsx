import { useState, useEffect } from 'react';
import ScrollExpandMedia from './ui/ScrollExpandMedia';

const Hero = ({ introComplete = false }) => {
  // Toggle between 'image' and 'video' to switch media types
  const mediaType = 'image';

  const [mediaContent] = useState({
    image: {
      // PITTURA Hero Image - MUST match the final image from intro (IMG_2093) for seamless transition
      src: '/assets1/IMG_2011.JPG',
      background: '/assets1/IMG_2011.JPG',  // Same as intro final image for smooth transition
      title: 'PITTURA Where The Art Speaks',
      scrollToExpand: 'Scroll to Explore',
    },
    video: {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-artist-painting-on-canvas-43866-large.mp4',
      background: '/assets1/IMG_2011.JPG',
      title: 'PITTURA, Where The Art Speaks',
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
        textBlend={false}
      />
    </div>
  );
};

export default Hero;
