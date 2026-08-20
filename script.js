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

// Carrosséis (Espaços, Feedbacks...): setas rolam uma "página" por vez.
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-arrow--prev');
  const nextBtn = carousel.querySelector('.carousel-arrow--next');
  if (!track || !prevBtn || !nextBtn) return;
  const scrollByCard = direction => {
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).gap) || 18;
    const amount = (card ? card.getBoundingClientRect().width : track.clientWidth) + gap;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max;
  };
  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();
});

// Depoimentos: cards com o mesmo tamanho, texto cortado com botão "Ler mais / Ler menos".
document.querySelectorAll('.feedback-item').forEach(item => {
  const quote = item.querySelector('.feedback-quote');
  const btn = item.querySelector('.feedback-more');
  if (!quote || !btn) return;
  const checkOverflow = () => {
    if (item.classList.contains('expanded')) return;
    const hasOverflow = quote.scrollHeight > quote.clientHeight + 2;
    btn.style.display = hasOverflow ? 'inline-block' : 'none';
  };
  requestAnimationFrame(checkOverflow);
  window.addEventListener('resize', checkOverflow);
  btn.addEventListener('click', () => {
    const expanded = item.classList.toggle('expanded');
    btn.textContent = expanded ? 'Ler menos' : 'Ler mais';
    if (!expanded) requestAnimationFrame(checkOverflow);
  });
});