const Services = () => {
  const services = [
    {
      title: "Live Performances",
      description: "Intimate acoustic sets to grand concert hall performances that create unforgettable experiences.",
      features: ["Solo Concerts", "Acoustic Sessions", "Festival Performances", "Private Events"]
    },
    {
      title: "Studio Work",
      description: "Professional recording services from lead vocals to harmonies and original compositions.",
      features: ["Lead Vocals", "Background Vocals", "Original Songs", "Collaborations"]
    },
    {
      title: "Music Direction",
      description: "Creative guidance for musical projects, from arrangement to artistic vision.",
      features: ["Song Arrangement", "Vocal Coaching", "Album Production", "Artistic Consultation"]
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-section-title text-elegant mb-6">
            Musical <span className="text-accent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From intimate performances to studio recordings, I offer a range of musical services 
            designed to bring your artistic vision to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-8 hover-glow group transition-all duration-500"
            >
              <div className="mb-8">
                <div className="w-16 h-16 bg-accent rounded-lg mb-6 flex items-center justify-center group-hover:animate-glow transition-all duration-500">
                  <div className="w-8 h-8 bg-accent-foreground rounded"></div>
                </div>
                <h3 className="text-2xl font-playfair font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="btn-elegant w-full mt-8">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;