// Hero slider
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dot');
let current = 0;

function goToSlide(index) {
  const outgoing = slides[current];
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  const incoming = slides[current];

  // Fade out, swap, fade in
  outgoing.style.opacity = '0';
  setTimeout(() => {
    outgoing.classList.remove('active');
    outgoing.style.opacity = '';
    incoming.style.opacity = '0';
    incoming.classList.add('active');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      incoming.style.opacity = '1';
    }));
    dots[current].classList.add('active');
  }, 400);
}

setInterval(() => goToSlide(current + 1), 5000);

dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
});

// Services slider — CSS conveyor belt, clone cards for seamless loop
const track = document.getElementById('servicesTrack');
if (track) {
  Array.from(track.children).forEach(card => track.appendChild(card.cloneNode(true)));
}

// Scroll zoom section
const scrollZoomSection = document.getElementById('scrollZoom');
const scrollZoomImg = document.getElementById('scrollZoomImg');

if (scrollZoomSection && scrollZoomImg) {
  window.addEventListener('scroll', () => {
    const rect = scrollZoomSection.getBoundingClientRect();
    const scrollable = scrollZoomSection.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    const scale = 2.5 - (1.5 * progress);
    scrollZoomImg.style.transform = `scale(${scale})`;
    if (progress > 0.85) {
      scrollZoomSection.classList.add('zoomed');
    } else {
      scrollZoomSection.classList.remove('zoomed');
    }
  }, { passive: true });
}

// Tray tilt scroll animation
const traySection = document.querySelector('.tray-tilt-section');
if (traySection) {
  const trayObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        traySection.classList.add('in-view');
      } else {
        traySection.classList.remove('in-view');
      }
    });
  }, { threshold: 0.4 });
  trayObserver.observe(traySection);
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.sustain-card, .product-card, .cap-item, .bill-stat, .dual-card, .about-card, .contact-card, .statement-inner, .cap-left, .cap-right, .about-text, .about-visual'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Stagger children
document.querySelectorAll('.sustain-cards, .product-grid, .contact-options').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 10
    ? 'rgba(255,255,255,0.92)'
    : 'rgba(255,255,255,0.85)';
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#0071e3' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
