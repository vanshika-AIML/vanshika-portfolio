import React, { useState, useEffect, useRef } from 'react';
import heroImg from './assets/hero.png';

// === PROJECT DATA ===
const PROJECTS = [
  {
    id: 1,
    title: 'Nike Air Jordan Promo',
    categories: ['design'],
    tag: 'Graphic Design · Advertisement',
    desc: 'A vibrant blue sports advertisement layout highlighting the iconic Air Jordan sneaker with bold typography, custom textured overlays, and social media integration.',
    stack: ['Photoshop', 'Typography', 'Visual Design', 'Layouting'],
    icon: '👟',
    glowColor: '#0ea5e9',
    visualClass: 'pv-Nike',
    image: '/assests/AIR_JORDAN_1.png'
  },
  {
    id: 2,
    title: 'American Psycho Poster',
    categories: ['design'],
    tag: 'Graphic Design · Typographic Artwork',
    desc: 'A gritty, high-contrast red-and-black poster design exploring themes of identity and detachment. Features classic quote styling and clean layout.',
    stack: ['Photoshop', 'Vintage Texture', 'Grungy Typography', 'Art Direction'],
    icon: '🩸',
    glowColor: '#ef4444',
    visualClass: 'pv-Psycho',
    image: '/assests/movie_poster2[1].png'
  },
  {
    id: 3,
    title: '1970 Dodge Charger R/T Poster',
    categories: ['design'],
    tag: 'Graphic Design · Poster Art',
    desc: 'A retro-themed poster print of the legendary 1970 Dodge Charger R/T, celebrating speed with grain effects, halftone details, and vintage aesthetic.',
    stack: ['Photoshop', 'Halftone Art', 'Poster Layout', 'Creative Direction'],
    icon: '🚗',
    glowColor: '#f59e0b',
    visualClass: 'pv-Charger',
    image: '/assests/90s dodge charger poster_.png'
  },
  {
    id: 4,
    title: 'Minimalist Headphones Poster Design',
    categories: ['design'],
    tag: 'Graphic Design · Product Poster',
    desc: 'A clean, minimalist product advertisement highlighting modern over-ear headphones with elegant typography, soft lighting, and a balanced composition.',
    stack: ['Photoshop', 'Minimalism', 'Typography', 'Product Branding'],
    icon: '🎧',
    glowColor: '#a78bfa',
    visualClass: 'pv-Headphones',
    image: '/assests/Minimalist Headphones Poster Design.png'
  },
  {
    id: 5,
    title: 'SPIDEYYY 2.O Poster',
    categories: ['design'],
    tag: 'Graphic Design · Fan Art Poster',
    desc: 'A dynamic Spider-Man fan poster featuring high-contrast neon lighting, web texturing, and bold custom typography celebrating the web-slinger.',
    stack: ['Photoshop', 'Digital Composing', 'Color Grading', 'Creative Design'],
    icon: '🕸️',
    glowColor: '#ef4444',
    visualClass: 'pv-Spidey',
    image: '/assests/SPIDEYYY 2.O.png'
  }
];

// === SKILLS DATA ===
const DESIGN_CREATIVE_SKILLS = [
  { name: 'Photoshop Expert', emoji: '🎨' },
  { name: 'Creative Design', emoji: '✏️' },
  { name: 'Layouting & Typography', emoji: '📐' },
  { name: 'Visual Storytelling', emoji: '📖' },
  { name: 'Cybersecurity Basics', emoji: '🛡️' },
  { name: 'AI/ML Fundamentals', emoji: '🤖' },
];

const TECHNICAL_SKILLS = [
  { name: 'Java programming', emoji: '☕' },
  { name: 'C programming', emoji: '💻' },
  { name: 'Problem Solving', emoji: '🧩' },
  { name: 'Data Structures (DSA)', emoji: '🗄️' },
  { name: 'DevOps interest', emoji: '☁️' },
  { name: 'Web Dev (Vite/React)', emoji: '⚛️' },
];

const SOFT_SKILLS = [
  { name: 'Creative thinking', emoji: '💡' },
  { name: 'Leadership & Initiative', emoji: '👑' },
  { name: 'Critical Thinking', emoji: '🔍' },
  { name: 'Teamwork & Synergy', emoji: '🤝' },
  { name: 'Event Management', emoji: '📅' },
  { name: 'Problem Resolution', emoji: '⚡' },
];

const PROFICIENCIES = [
  { label: 'Creative Layouts & Typography', value: '98%' },
  { label: 'Photoshop Art & Composition', value: '95%' },
  { label: 'Programming (C / Java)', value: '85%' },
  { label: 'AI/ML Fundamentals', value: '78%' },
  { label: 'Cybersecurity Basics', value: '70%' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [typedRole, setTypedRole] = useState('');
  const [isProficiencyAnimated, setIsProficiencyAnimated] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const canvasRef = useRef(null);
  const [useFallbackAvatar, setUseFallbackAvatar] = useState(false);

  // Scroll listener for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations & proficiency bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('proficiency-list')) {
              setIsProficiencyAnimated(true);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Typing Effect for Creative Designer / AIML
  useEffect(() => {
    const roles = ['Creative Designer', 'B.Tech CE-AIML Student', 'Photoshop Expert', 'UI/UX Visualizer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypedRole(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedRole(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }

      timeoutId = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  // Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * -0.4 - 0.1;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(167, 139, 250, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.05)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  const filteredProjects = PROJECTS.filter(
    (p) => projectFilter === 'all' || p.categories.includes(projectFilter)
  );

  return (
    <>
      {/* ===== CANVAS for particle background ===== */}
      <canvas ref={canvasRef} id="particleCanvas"></canvas>

      {/* ===== FLOATING BACKGROUND ORBS ===== */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      {/* ===== NAV ===== */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
        <div className="nav-logo">
          <img src="/assests/profile.jpeg" alt="Vanshika Singh" className="nav-avatar" />
          <span className="logo-text">Vanshika Singh</span>
        </div>
        <ul className="nav-links" role="list">
          <li>
            <button onClick={() => handleNavClick('about')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              About
            </button>
          </li>
          <li>
            <button onClick={() => handleNavClick('skills')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Skills
            </button>
          </li>
          <li>
            <button onClick={() => handleNavClick('projects')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Projects & Designs
            </button>
          </li>
          <li>
            <button onClick={() => handleNavClick('contact')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Contact
            </button>
          </li>
        </ul>
        <button className="nav-cta" onClick={() => handleNavClick('contact')}>
          Get in Touch
        </button>
        <button
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile menu">
        <button onClick={() => handleNavClick('about')} className="mobile-link">
          About
        </button>
        <button onClick={() => handleNavClick('skills')} className="mobile-link">
          Skills
        </button>
        <button onClick={() => handleNavClick('projects')} className="mobile-link">
          Projects & Designs
        </button>
        <button onClick={() => handleNavClick('contact')} className="mobile-link">
          Contact
        </button>
      </div>

      <main>
        {/* ===== HERO ===== */}
        <section id="hero" className="section hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot pulse"></span>
              Open to Opportunities
            </div>
            <h1 className="hero-name">
              <span className="name-line">Vanshika</span>
              <span className="name-line gradient-text">Singh</span>
            </h1>
            <p className="hero-role">
              <span className="role-prefix">I am a</span>
              <span className="role-typed">{typedRole}</span>
              <span className="cursor-blink">|</span>
            </p>
            <p className="hero-intro">
              Bridging the gap between software engineering logic and modern artistic visuals. 
              Designing premium promotional posters and interfaces with computational precision.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => handleNavClick('projects')}>
                <span>View My Designs</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={() => handleNavClick('contact')} className="btn-ghost" style={{ background: 'transparent', cursor: 'pointer' }}>
                Let's Collaborate
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">10+</span>
                <span className="stat-label">Artworks</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-num">AI/ML</span>
                <span className="stat-label">Specialist</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-num">IEEE</span>
                <span className="stat-label">Involvement</span>
              </div>
            </div>
          </div>

          {/* floating geometric shapes */}
          <div className="hero-visual" aria-hidden="true">
            <div className="float-ring ring-outer"></div>
            <div className="float-ring ring-inner"></div>
            <div className="avatar-wrap">
              <div className="avatar-glow"></div>
              <div className="avatar-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/assests/profile.jpeg" 
                  alt="Vanshika Singh" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
            {/* orbiting dots */}
            <div className="orbit orbit-1">
              <div className="orbit-dot"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="orbit-dot dot-cyan"></div>
            </div>
            <div className="orbit orbit-3">
              <div className="orbit-dot dot-pink"></div>
            </div>
            {/* floating nodes */}
            <div className="float-node node-1">Photoshop</div>
            <div className="float-node node-2">AI & ML</div>
            <div className="float-node node-3">Creative</div>
            <div className="float-node node-4">Layouts</div>
          </div>

          {/* scroll indicator */}
          <div className="scroll-hint" aria-label="Scroll down">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
            <span>Scroll</span>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">01 / About</span>
              <h2 className="section-title">Who I <span className="gradient-text">Am</span></h2>
            </div>
            <div className="about-grid">
              <div className="about-card glass-card reveal">
                <div className="about-card-icon">🎨</div>
                <h3>Creative Designer</h3>
                <p>Specializing in vintage art direction, retro typography, high-impact branding posters, and detailed layout compositing.</p>
              </div>
              <div className="about-card glass-card reveal" style={{ '--delay': '0.1s' }}>
                <div className="about-card-icon">🤖</div>
                <h3>B.Tech CE-AIML</h3>
                <p>Harnessing artificial intelligence and machine learning principles to model intelligent designs and systems.</p>
              </div>
              <div className="about-card glass-card reveal" style={{ '--delay': '0.2s' }}>
                <div className="about-card-icon">⚡</div>
                <h3>Active IEEE Leader</h3>
                <p>Organizing student events like "Stand to Lead", taking rapid initiative, and building teamwork paradigms.</p>
              </div>
            </div>
            <div className="about-bio glass-card reveal">
              <div className="bio-text">
                <p>Hey! I'm <strong>Vanshika Singh</strong> — a creative designer and Computer Engineering student specializing in <strong>Artificial Intelligence & Machine Learning</strong> at Silver Oak University.</p>
                <p>I blend raw artistic talent in image composition and graphic layout (expert in Photoshop) with the structured logic of computational engineering (Java, C, and DSA). My design aesthetic leans towards bold, high-contrast, grungy, and retro-themed print layouts, as well as premium commercial layouts.</p>
                <p>I'm heavily involved in technical community building through the <strong>IEEE Student Branch</strong> and actively pursue projects in DevOps, cybersecurity basics, and modern front-end technologies.</p>
              </div>
              <div className="bio-facts">
                <div className="fact-item"><span className="fact-icon">📍</span> Ahmedabad, India</div>
                <div className="fact-item"><span className="fact-icon">💼</span> Freelance & Internships</div>
                <div className="fact-item"><span className="fact-icon">🎓</span> B.Tech AI/ML @ SOU</div>
                <div className="fact-item"><span className="fact-icon">👥</span> IEEE Branch Leader</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">02 / Skills</span>
              <h2 className="section-title">My <span className="gradient-text">Arsenal</span></h2>
            </div>
            <div className="skills-grid">
              {/* Creative & Design */}
              <div className="skill-category glass-card reveal">
                <h3 className="skill-cat-title">Creative & Design</h3>
                <div className="skill-icons">
                  {DESIGN_CREATIVE_SKILLS.map((skill, index) => (
                    <div key={skill.name} className="skill-chip float-chip" style={{ '--fi': index }}>
                      <span className="skill-emoji">{skill.emoji}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>
              {/* Technical / Development */}
              <div className="skill-category glass-card reveal" style={{ '--delay': '0.1s' }}>
                <h3 className="skill-cat-title">Technical & Engineering</h3>
                <div className="skill-icons">
                  {TECHNICAL_SKILLS.map((skill, index) => (
                    <div key={skill.name} className="skill-chip float-chip" style={{ '--fi': index }}>
                      <span className="skill-emoji">{skill.emoji}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>
              {/* Soft Skills & Involvements */}
              <div className="skill-category glass-card reveal" style={{ '--delay': '0.2s' }}>
                <h3 className="skill-cat-title">Leadership & Professional</h3>
                <div className="skill-icons">
                  {SOFT_SKILLS.map((skill, index) => (
                    <div key={skill.name} className="skill-chip float-chip" style={{ '--fi': index }}>
                      <span className="skill-emoji">{skill.emoji}</span> {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* proficiency bars */}
            <div className="proficiency-list glass-card reveal">
              <h3 className="skill-cat-title" style={{ marginBottom: '1.5rem' }}>Proficiency</h3>
              {PROFICIENCIES.map((prof) => (
                <div key={prof.label} className="prof-item">
                  <span className="prof-label">{prof.label}</span>
                  <div className="prof-bar">
                    <div
                      className={`prof-fill ${isProficiencyAnimated ? 'animated' : ''}`}
                      style={{ '--w': prof.value }}
                    ></div>
                  </div>
                  <span className="prof-pct">{prof.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">03 / Projects</span>
              <h2 className="section-title">Selected <span className="gradient-text">Work</span></h2>
            </div>

            <div className="projects-filter" role="tablist" aria-label="Project filters">
              {['all', 'design', 'tech'].map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${projectFilter === filter ? 'active' : ''}`}
                  onClick={() => setProjectFilter(filter)}
                  role="tab"
                  aria-selected={projectFilter === filter}
                >
                  {filter === 'all' ? 'All Work' : filter === 'design' ? 'Graphic Artworks' : 'Engineering Projects'}
                </button>
              ))}
            </div>

            <div className="projects-grid" id="projectsGrid">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="project-card glass-card reveal"
                  style={{ '--delay': `${(idx % 3) * 0.1}s` }}
                >
                  <div className="project-glow" style={{ '--c': project.glowColor }}></div>
                  <div className="project-header">
                    <span className="project-tag">{project.tag}</span>
                    <div className="project-links">
                      <a href="#" className="proj-link" aria-label="Link to project details">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  {project.image ? (
                    <div className="project-visual">
                      <img src={project.image} alt={project.title} className="project-img" />
                    </div>
                  ) : project.isCustomVisual ? (
                    <div className="project-visual" style={{ backgroundColor: project.visualBg, padding: 0 }}>
                      <div className="pv-deco"></div>
                      {project.visualContent}
                    </div>
                  ) : (
                    <div className={`project-visual ${project.visualClass}`}>
                      <div className="pv-deco"></div>
                      <span className="pv-icon">{project.icon}</span>
                    </div>
                  )}
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-stack">
                    {project.stack.map((tag) => (
                      <span key={tag} className="stack-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">04 / Contact</span>
              <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
              <p className="section-subtitle">Have a design request? Want to discuss AI/ML or collaboration? Drop me a message.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-info glass-card reveal">
                <h3>Get In Touch</h3>
                <p>I'm currently looking for creative design internships, freelance design gigs, and collaboration on AI/ML projects.</p>

                <div className="contact-items">
                  <a href="mailto:vanshii7522@gmail.com" className="contact-item" id="email-link">
                    <div className="ci-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <span className="ci-label">Email</span>
                      <span className="ci-value">vanshii7522@gmail.com</span>
                    </div>
                  </a>
                  <a href="tel:8460076954" className="contact-item" id="phone-link">
                    <div className="ci-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <span className="ci-label">Phone</span>
                      <span className="ci-value">8460076954</span>
                    </div>
                  </a>
                  <div className="contact-item" id="location-link">
                    <div className="ci-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <span className="ci-label">Location</span>
                      <span className="ci-value">Ahmedabad, India</span>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <a href="#" className="social-btn" id="github-link" aria-label="GitHub profile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a href="#" className="social-btn" id="linkedin-link" aria-label="LinkedIn profile">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>

              <form className="contact-form glass-card reveal" id="contactForm" onSubmit={handleFormSubmit} style={{ '--delay': '0.15s' }}>
                <div className="form-group">
                  <label htmlFor="contactName">Your Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Email Address</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    id="contactSubject"
                    name="subject"
                    placeholder="Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactMessage">Message</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary form-submit" id="submitBtn" disabled={formSubmitting}>
                  <span>{formSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!formSubmitting && (
                    <svg id="submitIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
                <div className={`form-success ${formSubmitted ? 'show' : ''}`} id="formSuccess" role="alert">
                  <span>✅</span> Message sent! I'll get back to you soon.
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <img src="/assests/profile.jpeg" alt="Vanshika Singh" className="nav-avatar" />
            <span className="logo-text">Vanshika Singh</span>
          </div>
          <p className="footer-copy">Designed & Built by <strong>Vanshika Singh</strong> · 2026</p>
          <p className="footer-love">Made with ☕ &amp; ✨</p>
        </div>
      </footer>
    </>
  );
}

export default App;
