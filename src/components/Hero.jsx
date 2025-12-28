import { useRef } from 'react';
import { TypewriterText } from './ui/typewriter-text';

const Hero = ({ introComplete = false }) => {
  const heroRef = useRef(null);

  return (
    <section ref={heroRef} className="hero-section" id="home">
      <div className="hero-background">
        <div className="hero-overlay hero-overlay-left" />
        <div className="hero-overlay hero-overlay-bottom" />
        <div className="hero-vignette" />
      </div>

      <div className="hero-content">
        <div className="hero-text-container">

          <span className={`hero-subtitle ${introComplete ? 'animate-fade-in' : ''}`}>
            <span className="hero-subtitle-line"></span>
            <span className="shiny-text-gold">Elena Ross • Digital Artist</span>
            <span className="hero-subtitle-line"></span>
          </span>

          <h1 className="hero-masked-heading">
            <span className="hero-line-mask">
              <span className="hero-line">
                <TypewriterText
                  text="Where the Art speaks,"
                  typingSpeed={45}
                  initialDelay={100}
                  autoStart={introComplete}
                />
              </span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line hero-line-accent">
                <TypewriterText
                  text="Stories that inspire"
                  typingSpeed={50}
                  initialDelay={1100}
                  autoStart={introComplete}
                />
              </span>
            </span>
          </h1>

          <p className={`hero-description ${introComplete ? 'animate-fade-in-up animate-delay-1200' : ''}`}>
            Creating immersive worlds and captivating characters through digital art.
            Every piece tells a story waiting to be discovered.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Hero;




