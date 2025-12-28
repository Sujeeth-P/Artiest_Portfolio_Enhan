import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import ElenaIntro from './components/ElenaIntro';
import Hero from './components/Hero';
import GuidedGallery from './components/GuidedGallery';
import WorksGallery from './components/WorksGallery';
import Services from './components/Services';
import ClientWork from './components/ClientWork';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import { initScrollAnimations } from './components/ui/scroll-reveal';
import { initGsapScrollAnimations } from './components/ui/gsap-scroll-animations';
import './styles/gsap-scroll-animations.css';
import './index.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  // Skip intro if there's a hash in the URL (user clicked a section link)
  const [introComplete, setIntroComplete] = useState(() => {
    return window.location.hash && window.location.hash !== '#home';
  });

  // Initialize scroll animations after intro is complete
  useEffect(() => {
    if (introComplete) {
      // Delay to let DOM update
      setTimeout(() => {
        initScrollAnimations();        // Existing IntersectionObserver animations
        initGsapScrollAnimations();    // New GSAP scroll animations
      }, 100);
    }
  }, [introComplete]);

  // Scroll to hash section after page loads (if intro is skipped)
  useEffect(() => {
    if (introComplete && window.location.hash) {
      const hash = window.location.hash;
      // Delay to ensure ScrollTrigger is initialized
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          // Use GSAP scrollTo which handles pinned sections properly
          gsap.to(window, {
            duration: 0.1,
            scrollTo: {
              y: target,
              offsetY: 80
            },
            ease: 'none'
          });
        }
      }, 300);
    }
  }, [introComplete]);

  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedArtwork(null);
  };

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <>
      {!introComplete && (
        <ElenaIntro onComplete={handleIntroComplete} />
      )}

      <Navbar />

      <Hero introComplete={introComplete} />

      <GuidedGallery />
      <WorksGallery onViewArtwork={handleViewArtwork} />
      <Services />
      <ClientWork />
      <About />
      <Contact />
      <Footer />

      <Lightbox
        isOpen={lightboxOpen}
        artwork={selectedArtwork}
        onClose={handleCloseLightbox}
      />
    </>
  );
}

export default App;



