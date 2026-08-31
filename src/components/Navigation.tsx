import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-playfair font-bold text-elegant">
            ARTIST
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            <a href="#home" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#about" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#services" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
              Music
            </a>
            <a href="#portfolio" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
              Gallery
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <button className="btn-accent hidden md:block">
            Listen Now
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
            <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
            <div className="w-6 h-0.5 bg-foreground"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;