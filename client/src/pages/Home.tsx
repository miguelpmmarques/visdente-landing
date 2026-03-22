/*
 * Design Philosophy: Refined Minimal — Scandinavian minimalism
 * All content is now centralized in src/data/content.json
 * This component consumes data from the JSON file
 */

import { useEffect, useRef, useState } from "react";
import { Smartphone, MapPin, Phone} from "lucide-react";
import content from "@/data/content.json";
import "./PhotosSection.css"; // we’ll create this


// ─── Scroll fade-in hook ───────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Navbar ───────────────────────────────────────────────────────────────
function Navbar() {
  const { navbar } = content;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <img src="/images/favicon.ico" alt="Logo" className="w-8 h-8" />
          <span className="font-display text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {navbar.logo}
            <span style={{ color: "#890000" }}>.</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navbar.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}


// ─── Hero / Title Section ─────────────────────────────────────────────────
function HeroSection() {
  const { hero } = content;
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span className="section-label block mb-4">{hero.section}</span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {hero.headline.line1}
              <br />
              <span className="italic font-light" style={{ color: "#890000" }}>
                {hero.headline.line2Italic}
              </span>
              <br />
              {hero.headline.line3}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {hero.buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className={`inline-flex items-center px-6 py-3 rounded-md text-base font-semibold transition-all duration-200 ${
                    btn.variant === "primary"
                      ? "text-white hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                      : "border border-border text-foreground bg-transparent hover:bg-secondary"
                  }`}
                  style={btn.variant === "primary" ? { background: "#890000" } : {}}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
          {/* Right: Hero image */}
          <div className="relative flex justify-center">
            <div
              className="absolute -inset-4 rounded-3xl opacity-30"
              style={{ background: "#FFF5E6" }}
            />
            <img
              src={hero.heroImage.src}
              alt={hero.heroImage.alt}
              className="relative w-1/2 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Description Section ──────────────────────────────────────────────────
function DescriptionSection() {
  const { about } = content;
  const ref = useFadeIn();
  return (
    <section id="about" className="py-20 md:py-28" style={{ background: "#ffffff" }}>
      <div className="container">
        <div ref={ref} className="fade-in-up max-w-3xl mx-auto text-center">
          <span className="section-label block mb-4">{about.section}</span>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {about.headline}
          </h2>
            <div
              className="w-12 h-1 mx-auto mb-8 rounded-full"
              style={{ background: "#890000" }}
            />
          {about.paragraphs.map((para, idx) => (
            <p key={idx} className="text-lg text-muted-foreground leading-relaxed mb-6">
              {para}
            </p>
          ))}
          <blockquote
            className="mt-10 pl-5 text-left border-l-4 italic text-foreground text-xl font-light"
            style={{ borderColor: "#890000", fontFamily: "var(--font-display)" }}
          >
            "{about.quote}"
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ─── Team Section ─────────────────────────────────────────────────────────
function TeamSection() {
  const { team } = content;
  const ref = useFadeIn();
  return (
    <section id="team" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <span className="section-label block mb-3">{team.section}</span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {team.headline}
          </h2>
        </div>
        <div ref={ref} className="fade-in-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.members.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  delay,
}: {
  member: (typeof content.team.members)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="fade-in-up bg-card rounded-2xl overflow-hidden border border-border group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
      </div>
      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {member.name}
        </h3>
        <span className="section-label block mb-3">{member.role}</span>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{member.bio}</p>
      </div>
    </div>
  );
}

// ─── Treatments Section (Carousel) ───────────────────────────────────────
function TreatmentsSection() {
  const { treatments } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useFadeIn();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextTreatment = () => {
    setCurrentIndex((prev) => (prev + 1) % treatments.items.length);
  };

  const prevTreatment = () => {
    setCurrentIndex((prev) => (prev - 1 + treatments.items.length) % treatments.items.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextTreatment(); // swipe left
    } else if (distance < -50) {
      prevTreatment(); // swipe right
    }
  };

  const currentTreatment = treatments.items[currentIndex];

  return (
    <section
      id="treatments"
      className="py-20 md:py-28"
      style={{ background: "#ffffff" }}
    >
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <div className="text-center mb-12">
            <span className="section-label block mb-3">
              {treatments.section}
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {treatments.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {treatments.description}
            </p>
          </div>

          {/* Carousel */}
          <div className="max-w-3xl mx-auto">
            <div
              className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm mb-8 flex flex-col min-h-[320px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Centered content */}
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#890000",
                    }}
                  >
                    {currentTreatment.name}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {currentTreatment.description}
                  </p>
                </div>
              </div>

              {/* Carousel indicators (always bottom) */}
              <div className="flex justify-center gap-2 mt-6">
                {treatments.items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        index === currentIndex ? "#890000" : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={prevTreatment}
                className="px-6 py-3 rounded-md font-semibold transition-all duration-200 text-white hover:opacity-90 hover:shadow-lg"
                style={{ background: "#890000" }}
              >
                ← Anterior
              </button>

              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {treatments.items.length}
              </span>

              <button
                onClick={nextTreatment}
                className="px-6 py-3 rounded-md font-semibold transition-all duration-200 text-white hover:opacity-90 hover:shadow-lg"
                style={{ background: "#890000" }}
              >
                Proximo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Photos Section (Carousel) ───────────────────────────────────────

function PhotosSection() {
  const { photos } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrow, setArrow] = useState(null); // "left" or "right"
  const [fadeIn, setFadeIn] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // fade-in section
  useEffect(() => setFadeIn(true), []);

  const nextPhoto = () => {
    setArrow("right");
    setCurrentIndex((prev) => (prev + 1) % photos.items.length);
  };

  const prevPhoto = () => {
    setArrow("left");
    setCurrentIndex((prev) => (prev - 1 + photos.items.length) % photos.items.length);
  };

  const handleTouchStart = (e) => (touchStartX.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextPhoto();
    else if (distance < -50) prevPhoto();
  };

  const currentPhoto = photos.items[currentIndex];

  return (
    <section className={`photos-section ${fadeIn ? "fade-in" : ""}`}>
      <div className="container">
        <div className="header">
          <span className="section-label">{photos.section}</span>
          <h2 className="headline">{photos.headline}</h2>
        </div>

        <div className="carousel">
          <div
            className="carousel-card"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="photo-info">
              <h3 className="photo-name">{currentPhoto.name}</h3>
              <p className="photo-description">{currentPhoto.description}</p>
            </div>

            <div className="photo-container">
              <img src={currentPhoto.image} alt={currentPhoto.name} className="photo-image" />

              {/* Left arrow */}
              <span
                key={arrow + currentIndex} // force remount/retrigger
                className={`arrow arrow-left ${arrow === "left" ? "animate-fade-slide-left" : ""}`}
              >
                ←
              </span>

              {/* Right arrow */}
              <span
                key={arrow + currentIndex + "r"} // different key for right
                className={`arrow arrow-right ${arrow === "right" ? "animate-fade-slide-right" : ""}`}
              >
                →
              </span>
            </div>

            <div className="indicators">
              {photos.items.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="nav-buttons">
            <button className="nav-btn" onClick={prevPhoto}>
              ← Anterior
            </button>
            <span className="counter">
              {currentIndex + 1} / {photos.items.length}
            </span>
            <button className="nav-btn" onClick={nextPhoto}>
              Proximo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────
function LocationSection() {
  const { location } = content;
  const ref = useFadeIn();
  return (
    <section
      id="location"
      className="py-20 md:py-28"
      style={{ background: "#ffffff" }}
    >
      <div className="container">
        <div ref={ref} className="fade-in-up grid md:grid-cols-2 gap-12 items-center">
          {/* Google Map Embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border" style={{ aspectRatio: "4/3" }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              src={location.mapEmbed}
            />
          </div>
          {/* Address info */}
          <div>
            <span className="section-label block mb-4">{location.section}</span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {location.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {location.description}
            </p>
            <div className="space-y-5">
              <InfoRow icon={<MapPin size={18} />} label="Morada">
              <p className="whitespace-pre-wrap" >
                {location.address.full}
              </p>
              </InfoRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "#FFF5E6", color: "#890000" }}
      >
        {icon}
      </div>
      <div>
        <span className="section-label block mb-0.5">{label}</span>
        <p className="text-foreground text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────
function ContactSection() {
  const { contact } = content;
  const ref = useFadeIn();

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container">
        <div ref={ref} className="fade-in-up max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label block mb-3">{contact.section}</span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {contact.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {contact.description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row gap-8">
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "#FFF5E6", color: "#890000" }}
                  >
                    <Phone size={20} />
                  </div>
                  <span className="font-semibold text-foreground">Telefone</span>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm sm:text-lg text-primary hover:opacity-80 transition-opacity break-all"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "#FFF5E6", color: "#890000" }}
                  >
                    <Smartphone size={20} />
                  </div>
                  <span className="font-semibold text-foreground">Telemóvel</span>
                </div>
                <a
                  href={`tel:${contact.mobilephone}`}
                  className="text-sm sm:text-lg text-primary hover:opacity-80 transition-opacity break-all"
                >
                  {contact.mobilephone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  const { site, footer } = content;
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span style={{ fontFamily: "var(--font-display)" }} className="font-semibold text-foreground">
          {site.name}
          <span style={{ color: "#890000" }}>.</span>
        </span>
        <p>© {site.year} {site.name} Inc. {footer.copyright}</p>
        <div className="flex gap-5">
          {footer.links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <DescriptionSection />
        <TeamSection />
        <TreatmentsSection />
        <PhotosSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
