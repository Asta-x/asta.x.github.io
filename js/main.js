// Wandera — main.js

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// Animate counters in stats section
function animateCounter(el, target, duration) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else { el.textContent = start + '+'; }
  }, 16);
}

const statsSection = document.querySelector('.stats-section');
let counted = false;

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('[data-count]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.count), 1200);
    });
  }
}, { threshold: 0.4 });

if (statsSection) observer.observe(statsSection);
