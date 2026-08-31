import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-6xl mx-auto">
        <div className="animate-fade-up">
          <h1 className="text-hero text-elegant mb-8">
            Melodic
            <br />
            <span className="text-accent">Artistry</span>
          </h1>
        </div>
        
        <div className="animate-fade-up-delay">
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting musical experiences that touch souls and transcend boundaries. 
            Where passion meets artistry.
          </p>
        </div>

        <div className="animate-fade-up-delay flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="btn-accent">
            Listen Now
          </button>
          <button className="btn-elegant">
            My Story
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;