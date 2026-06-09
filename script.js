/* ═══════════════════════════════════════════════
   Muhammad Ahmad — Portfolio Script
   Vanilla JS — Beginner-friendly with comments
   ═══════════════════════════════════════════════ */

// ──────────────────────────────────────────────
// 1. LOADING SCREEN
// ──────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  // Wait ~1.9s (bar animation), then fade out the loader
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 1900);
});

// Prevent scroll until loader is done
document.body.classList.add('loading');


// ──────────────────────────────────────────────
// 2. PARTICLE GENERATOR (hero section dots)
// ──────────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div');
    dot.classList.add('particle');

    // Random position anywhere in the hero
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top  = Math.random() * 100 + '%';

    // Random animation duration and delay for stagger effect
    const dur   = (3 + Math.random() * 5).toFixed(1) + 's';
    const delay = (Math.random() * 4).toFixed(1) + 's';
    dot.style.setProperty('--dur',   dur);
    dot.style.setProperty('--delay', delay);

    container.appendChild(dot);
  }
}

createParticles();


// ──────────────────────────────────────────────
// 3. TYPING TEXT ANIMATION (hero role)
// ──────────────────────────────────────────────
const typedEl = document.getElementById('typedText');

// List of roles to cycle through
const roles = [
  'MERN Stack Developer',
  'Full-Stack Developer',
];

let roleIndex = 0;   // which role we're currently typing
let charIndex  = 0;  // how many characters of the current role are shown
let isDeleting = false;

function typeEffect() {
  if (!typedEl) return;

  const current = roles[roleIndex];

  if (isDeleting) {
    // Remove one character
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add one character
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;   // delete faster than typing

  if (!isDeleting && charIndex === current.length) {
    // Finished typing — pause before deleting
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting — move to next role
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

// Start typing after the loader disappears
setTimeout(typeEffect, 2100);


// ──────────────────────────────────────────────
// 4. NAVBAR — scroll effect & active link
// ──────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

function updateNavbar() {
  // Add glass background when scrolled down
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight the nav link whose section is in view
  let current = '';

  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavbar);
updateNavbar(); // run once on load


// ──────────────────────────────────────────────
// 5. HAMBURGER MOBILE MENU
// ──────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const navLinksEl  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});


// ──────────────────────────────────────────────
// 6. FADE-IN ON SCROLL (Intersection Observer)
// ──────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop watching once visible — no need to re-trigger
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }   // trigger when 15% of element is visible
);

fadeEls.forEach(el => fadeObserver.observe(el));


// ──────────────────────────────────────────────
// 7. SKILL BAR ANIMATION
// ──────────────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width') + '%';
        // Slight delay for stagger feel
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach(bar => barObserver.observe(bar));


// ──────────────────────────────────────────────
// 8. SMOOTH SCROLL for anchor links
//    (CSS scroll-behavior: smooth handles most,
//     this handles edge cases & offset for navbar)
// ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = navbar.offsetHeight;
    const targetTop    = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


// ──────────────────────────────────────────────
// 9. BACK-TO-TOP BUTTON
// ──────────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



// ──────────────────────────────────────────────
// 11. CURSOR BLINK is handled by CSS (@keyframes blink)
//     Nothing extra needed here.
// ──────────────────────────────────────────────


// ──────────────────────────────────────────────
// 12. FLOATING ELEMENTS (hero image dots)
//     Also handled by CSS — no JS needed.
// ──────────────────────────────────────────────


// ──────────────────────────────────────────────
// 13. SCROLL PROGRESS INDICATOR (optional flair)
//     Adds a thin green bar at the very top of the page
// ──────────────────────────────────────────────
function createProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #00ff88, #00ffcc);
    z-index: 9999;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(0,255,136,0.5);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = (scrollTop / docHeight) * 100;
    bar.style.width  = pct + '%';
  });
}

createProgressBar();


// ──────────────────────────────────────────────
// 14. CARD TILT EFFECT (service & project cards)
//     Subtle 3D tilt on mouse move
// ──────────────────────────────────────────────
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {

    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;   // cursor X within card
      const y      = e.clientY - rect.top;    // cursor Y within card
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;  // max ±6deg
      const rotateY = ((x - cx) / cx) *  6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';  // reset on mouse out
    });
  });
}

addTiltEffect('.service-card');
addTiltEffect('.project-card');


// ──────────────────────────────────────────────
// 15. SECTION TITLE — decorative underline draw
//     Draws a line under headings as they scroll in
// ──────────────────────────────────────────────
// (Handled visually via the .section-title span color
//  and CSS transitions — nothing extra needed here.)


// ──────────────────────────────────────────────
// Done! All animations are running. 🚀
// ──────────────────────────────────────────────
console.log('%c Muhammad Ahmad Portfolio 🚀 ', 'background:#00ff88;color:#080b12;font-weight:bold;font-size:14px;padding:4px 12px;border-radius:4px;');