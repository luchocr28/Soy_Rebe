import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, ChevronDown, ArrowRight } from 'lucide-react';

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'escritura', label: 'Escritura' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'libro', label: 'Libro' },
    { id: 'tienda', label: 'Tienda' },
    { id: 'sobre-mi', label: 'Sobre mi' },
    { id: 'contacto', label: 'Contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => scrollToSection('inicio')}
            className="font-serif text-lg lg:text-xl tracking-wide hover:text-accent transition-colors duration-300"
          >
            Rebecca Arroyo
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                  activeSection === item.id ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-primary transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-px bg-primary transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-primary transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ${
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-sm font-light tracking-wide py-2 transition-colors duration-300 ${
                  activeSection === item.id ? 'text-accent' : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Fade In Section Wrapper
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-in-section">
      {children}
    </div>
  );
}

// Hero Section
function HeroSection() {
  const scrollToEscritura = () => {
    const element = document.getElementById('escritura');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20 relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.pexels.com/photos/6922836/pexels-photo-6922836.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="space-y-8 lg:space-y-10">
          <p className="font-serif text-title lg:text-headline text-primary leading-relaxed italic">
            Las palabras llegan crudas a mis manos.
          </p>
          <p className="font-serif text-title lg:text-headline text-primary leading-relaxed italic">
            No siempre se de donde vienen.
          </p>
          <p className="font-serif text-title lg:text-headline text-primary leading-relaxed italic">
            Pero si lo que pueden provocar.
          </p>
        </div>

        <div className="h-16 lg:h-24" />

        <div className="space-y-6 lg:space-y-8 text-secondary font-light text-body lg:text-body-lg leading-relaxed max-w-2xl mx-auto">
          <p>Escribo para entender, para incomodar, para dejar algo en quien lee.</p>
          <p>A veces se convierten en historias.</p>
          <p>Otras, en mensajes que necesitan mover a alguien a hacer algo.</p>
        </div>

        <div className="h-12 lg:h-16" />

        <div className="space-y-4 lg:space-y-6">
          <p className="font-serif text-title lg:text-display text-primary">
            Soy Rebecca Arroyo.
          </p>
          <p className="text-secondary font-light text-body lg:text-body-lg tracking-wide">
            Autora, copywriter y traductora.
          </p>
        </div>

        <div className="h-12 lg:h-16" />

        <p className="text-secondary font-light text-body lg:text-body-lg leading-relaxed max-w-2xl mx-auto">
          Este es mi espacio.
          <br />
          Un lugar donde la escritura no es solo estetica,
          <br />
          sino intencion.
        </p>

        <div className="h-24 lg:h-32" />

        <button
          onClick={scrollToEscritura}
          className="group inline-flex items-center gap-2 text-sm font-light tracking-wide text-secondary hover:text-accent transition-colors duration-300"
        >
          <span>Descubrir</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

// Escritura Section
function EscrituraSection() {
  const writings = [
    {
      category: 'Poemas',
      excerpt: 'El silencio tiene una forma propia, la de las palabras que nunca dijimos, las que se quedaron en la garganta como piedras de rio.',
    },
    {
      category: 'Fragmentos',
      excerpt: 'A veces escribo para entender. Otras, escribo porque entender ya no basta y necesito otra forma de estar en el mundo.',
    },
    {
      category: 'Micro relatos',
      excerpt: 'Ella guardaba todas las cartas que nunca envio. En la caja no habia papel, solo el peso de lo que pudo haber sido.',
    },
    {
      category: 'Reflexiones',
      excerpt: 'La escritura no siempre cura. A veces solo abre heridas que necesitaban aire. A veces eso es suficiente.',
    },
  ];

  return (
    <section id="escritura" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-content mx-auto">
        <FadeInSection>
          <h2 className="font-serif text-headline lg:text-display text-primary text-center mb-16 lg:mb-24">
            Escritura
          </h2>
        </FadeInSection>

        {/* Decorative image divider */}
        <FadeInSection>
          <div className="flex justify-center mb-16 lg:mb-20">
            <div className="w-full max-w-md aspect-[4/1] border border-border overflow-hidden opacity-60">
              <img
                src="https://images.pexels.com/photos/261803/pexels-photo-261803.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {writings.map((writing, index) => (
            <FadeInSection key={index}>
              <article className="border border-border p-8 lg:p-10 hover:border-accent/50 transition-colors duration-400">
                <span className="text-xs uppercase tracking-widest text-accent font-medium">
                  {writing.category}
                </span>
                <p className="font-serif text-title lg:text-headline italic text-secondary mt-6 leading-relaxed">
                  "{writing.excerpt}"
                </p>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Proyectos Section
function ProyectosSection() {
  const projects = [
    {
      title: 'Narrativas para marcas',
      description: 'Desarrollo de voz y mensajes para proyectos que buscan conectar mas alla de lo comercial.',
      excerpt: 'Cuando una marca entiende que vende mas que productos, cuando entiende que vende historias, es cuando comienza a construir algo que importa.',
    },
    {
      title: 'Traduccion literaria',
      description: 'Traduccion de textos creativos preservando el alma del original.',
      excerpt: 'No se trata de mover palabras de un idioma a otro. Se trata de que el lector sienta lo mismo que sintio el original, aunque el paisaje haya cambiado.',
    },
    {
      title: 'Contenido editorial',
      description: 'Textos para publicaciones que valoran la profundidad sobre la urgencia.',
      excerpt: 'Hay palabras que no pueden apresurarse. Articulos, ensayos, piezas que necesitan el tiempo justo para respirar.',
    },
  ];

  return (
    <section id="proyectos" className="py-24 lg:py-32 px-6 lg:px-12 bg-background relative">
      {/* Decorative side image - only on large screens */}
      <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-48 opacity-40 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/6923899/pexels-photo-6923899.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-content mx-auto">
        <FadeInSection>
          <h2 className="font-serif text-headline lg:text-display text-primary text-center mb-4">
            Palabras para proyectos
          </h2>
          <p className="text-center text-secondary font-light text-body lg:text-body-lg mb-16 lg:mb-24 max-w-2xl mx-auto">
            Colaboraciones donde la escritura se pone al servicio de ideas mas grandes.
          </p>
        </FadeInSection>

        <div className="space-y-16 lg:space-y-24 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <FadeInSection key={index}>
              <article className="border-b border-border pb-16 last:border-b-0 last:pb-0">
                <header className="mb-6">
                  <h3 className="font-serif text-title lg:text-headline text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-secondary font-light text-sm">{project.description}</p>
                </header>
                <blockquote className="font-serif text-body-lg lg:text-title italic text-secondary leading-relaxed pl-6 border-l-2 border-accent/30">
                  "{project.excerpt}"
                </blockquote>
              </article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Libro Section
function LibroSection() {
  return (
    <section id="libro" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] border border-border shadow-sm overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="SOLA - Libro de Rebecca Arroyo"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute inset-4 border border-accent/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
                  <span className="font-serif text-4xl lg:text-5xl text-white tracking-wide drop-shadow-lg">SOLA</span>
                  <div className="w-12 h-px bg-white/60 mt-6" />
                  <p className="mt-6 text-xs uppercase tracking-widest text-white/90 drop-shadow">Rebecca Arroyo</p>
                </div>
              </div>
            </div>

            {/* Book Description */}
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-display lg:text-5xl xl:text-6xl text-primary mb-10">
                SOLA
              </h2>

              <div className="space-y-6 text-secondary font-light text-body lg:text-body-lg leading-relaxed">
                <p>
                  SOLA no es solo un libro.
                </p>
                <p>
                  Es un recorrido por la ausencia, la identidad y el silencio.
                </p>
                <p>
                  Escribirlo fue una forma de habitar mis propias preguntas,
                </p>
                <p>
                  de ponerle palabras a lo que muchas veces no se dice.
                </p>
              </div>

              <div className="h-10" />

              <div className="space-y-6 text-secondary font-light text-body lg:text-body-lg leading-relaxed">
                <p>
                  Aqui no hay respuestas claras,
                </p>
                <p>
                  pero si verdades que incomodan, que acompanan, que se quedan.
                </p>
              </div>

              <div className="h-10" />

              <p className="text-secondary font-light text-body lg:text-body-lg leading-relaxed">
                Es un libro para quien alguna vez se ha sentido fuera de lugar,
              </p>
              <p className="text-secondary font-light text-body lg:text-body-lg leading-relaxed">
                para quien ha tenido que reconstruirse en silencio.
              </p>

              <div className="h-14" />

              <p className="font-serif text-title italic text-primary mb-10">
                "No es un libro para todos.
                <br />
                Pero si es para ti, lo vas a saber."
              </p>

              <button className="inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary font-light text-sm tracking-wide hover:bg-primary hover:text-background transition-colors duration-300">
                <span>Descubrir el libro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Tienda Section
function TiendaSection() {
  return (
    <section id="tienda" className="py-24 lg:py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
      {/* Subtle corner decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-content mx-auto">
        <FadeInSection>
          <h2 className="font-serif text-headline lg:text-display text-primary text-center mb-16 lg:mb-24">
            Tienda
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Book Card */}
          <FadeInSection>
            <article className="text-center">
              <div className="relative w-48 sm:w-56 aspect-[3/4] border border-border mx-auto mb-8 overflow-hidden shadow-sm">
                <img
                  src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="SOLA - Libro"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute inset-3 border border-accent/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl text-white tracking-wide drop-shadow-lg">SOLA</span>
                  <div className="w-8 h-px bg-white/60 mt-4" />
                  <p className="mt-4 text-xs uppercase tracking-widest text-white/90 drop-shadow">Rebecca Arroyo</p>
                </div>
              </div>

              <h3 className="font-serif text-xl text-primary mb-2">Libro</h3>
              <p className="text-secondary font-light text-sm mb-2">Primera edicion</p>
              <p className="text-primary font-light mb-8">$XX.XX</p>

              <a
                href="https://wa.me/50684164560?text=Hola%20Rebecca,%20me%20interesa%20comprar%20tu%20libro%20SOLA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-light text-sm tracking-wide hover:bg-accent transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Comprar por WhatsApp</span>
              </a>
            </article>
          </FadeInSection>

          {/* Custom Stories Card */}
          <FadeInSection>
            <article className="text-center px-4">
              <div className="w-48 sm:w-56 aspect-[3/4] border border-border mx-auto mb-8 overflow-hidden relative">
                <img
                  src="https://images.pexels.com/photos/7102/notes-whiskey-idea-literature.jpg?auto=compress&cs=tinysrgb&w=600"
                  alt="Historias Personalizadas"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/70" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-px bg-accent/60 mx-auto" />
                    <p className="font-serif text-lg italic text-secondary leading-relaxed">
                      "Cada historia merece ser contada de la unica forma en que puede serlo."
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-primary mb-4">Historias Personalizadas</h3>

              <p className="text-secondary font-light text-body leading-relaxed mb-8 max-w-sm mx-auto">
                Tambien escribo historias personalizadas.
                <br />
                <br />
                Textos unicos creados a partir de tu historia, tus emociones o aquello que quieras convertir en palabras.
              </p>

              <a
                href="https://wa.me/50684164560?text=Hola%20Rebecca,%20me%20interesa%20solicitar%20una%20historia%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-light text-sm tracking-wide hover:bg-primary hover:text-background transition-colors duration-300"
              >
                <span>Solicitar una historia personalizada</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

// Sobre Mi Section
function SobreMiSection() {
  return (
    <section id="sobre-mi" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Portrait */}
            <div className="flex justify-center md:justify-start">
              <div className="w-72 sm:w-80 aspect-[3/4] bg-gradient-to-br from-primary/5 to-primary/10 border border-border relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3756012/pexels-photo-3756012.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Rebecca Arroyo - Portrait"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-4 border border-accent/20" />
              </div>
            </div>

            {/* Biography */}
            <div className="text-center md:text-left">
              <h2 className="font-serif text-headline lg:text-display text-primary mb-10">
                Sobre mi
              </h2>

              <div className="space-y-6 text-secondary font-light text-body lg:text-body-lg leading-relaxed">
                <p>
                  Mi relacion con la escritura comenzo antes de que yo entendiera que era algo que podia hacer.
                </p>

                <p>
                  Era una forma de procesar lo que me pasaba. Un lugar donde las emociones tenian espacio para existir sin necesidad de explicacion.
                </p>

                <p>
                  Con el tiempo, ese lugar se convirtio en mi vocacion. Escribo poemas, relatos, textos para proyectos que necesitan algo mas que palabras bonitas.
                </p>

                <p>
                  Creo que la escritura sirve cuando es honesta. Cuando arriesga. Cuando no intenta gustar a todos, pero si conectar con quien necesita escucharla.
                </p>

                <p>
                  Este espacio es una invitation a leer con calma. A encontrar, entre las lineas, algo que resuene.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Contacto Section
function ContactoSection() {
  return (
    <section id="contacto" className="py-24 lg:py-32 px-6 lg:px-12 bg-background relative">
      {/* Decorative top image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-24 overflow-hidden opacity-30 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeInSection>
          <h2 className="font-serif text-headline lg:text-display text-primary mb-10">
            Contacto
          </h2>

          <p className="text-secondary font-light text-body lg:text-body-lg leading-relaxed mb-14">
            Si quieres trabajar conmigo, comprar mi libro o encargar una historia personalizada, puedes escribirme.
          </p>

          <div className="space-y-10">
            {/* Email */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 border border-border">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <a
                href="mailto:rebeccaarroyou@gmail.com"
                className="text-primary hover:text-accent transition-colors duration-300 font-light text-body-lg"
              >
                rebeccaarroyou@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 border border-border">
                <MessageCircle className="w-5 h-5 text-secondary" />
              </div>
              <a
                href="https://wa.me/50684164560"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-300 font-light text-body-lg"
              >
                +506 8416 4560
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 lg:py-16 px-6 border-t border-border">
      <div className="max-w-content mx-auto text-center">
        <p className="font-serif text-lg text-primary mb-2">Rebecca Arroyo</p>
        <p className="text-secondary font-light text-sm tracking-wide mb-6">
          Autora - Copywriter - Traductora
        </p>
        <p className="text-secondary/70 font-light text-xs">
          {currentYear} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <EscrituraSection />
        <ProyectosSection />
        <LibroSection />
        <TiendaSection />
        <SobreMiSection />
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
