// Troque somente este número (DDD + número, sem símbolos) quando o WhatsApp oficial estiver disponível.
const HARMONIA_CONFIG = { whatsapp: '' };
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = HARMONIA_CONFIG.whatsapp ? `https://wa.me/${HARMONIA_CONFIG.whatsapp}` : '#contato';
  if (!HARMONIA_CONFIG.whatsapp) link.addEventListener('click', event => event.preventDefault());
});
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); document.body.classList.toggle('menu-open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', false); }));
const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
