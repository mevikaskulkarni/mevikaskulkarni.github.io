document.addEventListener('DOMContentLoaded', function() {
  // enforce default DARK theme (no toggle)
  document.body.classList.add('theme-dark');
  document.body.classList.remove('theme-light');
  createParticles();
  initCursorGlow();
  initNavbar();
  initScrollAnimations();
  initSkillBars();
  initStatCounters();
  initContactForm();
});

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 20 + 's';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(p);
  }
}

function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow) return;

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  if (hamburger && navMenu) {
    const toggle = () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    hamburger.addEventListener('click', toggle);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    // close menu on link click (mobile)
    navLinks.forEach(link => link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) toggle();
    }));
  }

  // smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });
}

function initScrollAnimations() {
  const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('aos-animate');
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

function initSkillBars() {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.getAttribute('data-progress');
        // set width
        bar.style.width = progress + '%';
        // sync label if present
        const label = bar.parentElement.querySelector('.skill-value');
        if (label) label.textContent = progress + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-progress').forEach(bar => skillObserver.observe(bar));
}

function initStatCounters() {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(target)) animateCounter(el, target);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(stat => statObserver.observe(stat));
}

function animateCounter(element, target) {
  let current = 0;
  const steps = 50;
  const increment = target / steps;
  const duration = 2000;
  const stepTime = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio Contact from ${name || 'Anonymous'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:contact@vikaskulkarni.dev?subject=${subject}&body=${body}`;

    showNotification('Message prepared! Your email client will open shortly.');
    form.reset();
  });
}

function showNotification(message) {
  const n = document.createElement('div');
  n.textContent = message;
  n.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--gradient-1);
    color: #0b1220;
    padding: 16px 22px;
    border-radius: 12px;
    font-weight: 700;
    z-index: 10000;
    animation: slideIn 0.5s ease-out;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to   { transform: translateX(0);      opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0);      opacity: 1; }
      to   { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(n);

  setTimeout(() => {
    n.style.animation = 'slideOut 0.4s ease-in forwards';
    n.addEventListener('animationend', () => n.remove(), { once: true });
  }, 2600);
}

/* Notes:
   - No parallax transforms on .floating-card (keeps CSS float animation smooth)
   - Smooth scroll handled once in initNavbar
*/

/* ===== Removed conflicting/parallax & duplicate handlers =====
   - No manual transform on .floating-card (keeps CSS float animation smooth)
   - No duplicate anchor smooth-scroll (handled in initNavbar)
*/