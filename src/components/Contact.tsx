const Contact = () => {
  return (
    <section id="contact" className="section-elegant">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-section-title text-elegant mb-8">
          Let's Create Something
          <br />
          <span className="text-accent">Beautiful</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Ready to collaborate on your next musical project or book a performance? 
          I'd love to hear about your vision and explore how we can bring it to life through music.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="btn-accent">
            Book Performance
          </button>
          <button className="btn-elegant">
            Discuss Collaboration
          </button>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-accent font-semibold">Email</div>
            <div className="text-muted-foreground">bookings@artist.com</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-semibold">Phone</div>
            <div className="text-muted-foreground">+1 (555) 123-4567</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-semibold">Office</div>
            <div className="text-muted-foreground">New York, NY</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;