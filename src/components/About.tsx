const About = () => {
  return (
    <section id="about" className="section-elegant">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animate-slide-in">
            <h2 className="text-section-title text-elegant mb-8">
              Musical Journey
              <br />
              <span className="text-accent">Born from Passion</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Music has been my language since childhood, a way to express emotions that words 
              cannot capture. My artistic journey blends classical training with contemporary 
              innovation, creating soundscapes that resonate with the soul.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every note, every melody, every performance is an opportunity to connect with 
              hearts and minds. My commitment to musical excellence is unwavering, 
              my dedication to authentic expression absolute.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-muted-foreground">Performances</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">3</div>
                <div className="text-muted-foreground">Albums Released</div>
              </div>
            </div>

            <button className="btn-elegant">
              Full Biography
            </button>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-8 hover-glow">
              <div className="w-12 h-12 bg-accent rounded-lg mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-accent-foreground rounded"></div>
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4">Vocal Mastery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Years of classical training combined with contemporary techniques create 
                a unique vocal style that transcends genres and touches hearts.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 hover-glow">
              <div className="w-12 h-12 bg-silver rounded-lg mb-6 flex items-center justify-center">
                <div className="w-6 h-6 bg-silver-foreground rounded"></div>
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4">Composition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Original compositions that blend traditional harmony with modern innovation, 
                creating timeless pieces that speak to both heart and mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;