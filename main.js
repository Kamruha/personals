// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Section fade-in on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('section, .hero, .portfolio-card, .contact-info');
  const windowHeight = window.innerHeight;
  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 40) {
      if (!el.classList.contains('visible')) {
        el.style.transitionDelay = (i * 70) + 'ms';
        el.classList.add('visible');
      }
    } else {
      el.classList.remove('visible');
      el.style.transitionDelay = '';
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const themeTooltip = document.getElementById('theme-tooltip');

function setTheme(dark) {
  if (dark) {
    root.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeTooltip.textContent = 'Switch to light mode';
  } else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeTooltip.textContent = 'Switch to dark mode';
  }
  // Animate thumb
  const thumb = document.querySelector('.theme-switch-thumb');
  thumb.style.transform += ' scale(1.13)';
  setTimeout(() => {
    thumb.style.transform = thumb.style.transform.replace(' scale(1.13)', '');
  }, 250);
}

// Remember theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let darkMode = localStorage.getItem('darkMode');
if (darkMode === null) darkMode = prefersDark ? '1' : '0';
setTheme(darkMode === '1');

themeToggle.addEventListener('click', () => {
  darkMode = darkMode === '1' ? '0' : '1';
  localStorage.setItem('darkMode', darkMode);
  setTheme(darkMode === '1');
});
