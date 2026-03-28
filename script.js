const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleIcon = document.querySelector('.theme-toggle-icon');
const themeToggleText = document.querySelector('.theme-toggle-text');
const savedTheme = localStorage.getItem('theme-preference');
const prefersDayMode = window.matchMedia('(prefers-color-scheme: light)').matches;

function applyTheme(theme) {
  const isDay = theme === 'day';
  document.body.classList.toggle('day-mode', isDay);

  if (themeToggle && themeToggleIcon && themeToggleText) {
    themeToggle.setAttribute('aria-pressed', String(isDay));
    themeToggle.setAttribute('aria-label', isDay ? 'Switch to night mode' : 'Switch to day mode');
    themeToggleIcon.textContent = isDay ? 'SU' : 'MO';
    themeToggleText.textContent = isDay ? 'Day' : 'Night';
  }
}

applyTheme(savedTheme || (prefersDayMode ? 'day' : 'night'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('day-mode') ? 'night' : 'day';
    applyTheme(nextTheme);
    localStorage.setItem('theme-preference', nextTheme);
  });
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
