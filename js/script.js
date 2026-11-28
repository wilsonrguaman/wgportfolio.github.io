"use strict";
const menu = document.querySelector("#menu"),
  links = document.querySelector("#links"),
  mobile = matchMedia("(max-width: 760px)");
function syncMenu() {
  menu.hidden = !mobile.matches;
  links.hidden = mobile.matches;
  menu.setAttribute("aria-expanded", "false");
}
syncMenu();
mobile.addEventListener("change", syncMenu);
menu.addEventListener("click", () => {
  links.hidden = !links.hidden;
  menu.setAttribute("aria-expanded", String(!links.hidden));
});
links.addEventListener("click", (e) => {
  if (mobile.matches && e.target.closest("a")) syncMenu();
});
document.querySelectorAll("img[data-optional]").forEach((img) => {
  const hide = () => {
    img.hidden = true;
  };
  img.addEventListener("error", hide);
  if (img.hasAttribute("src") && img.complete && !img.naturalWidth) hide();
});
document.querySelectorAll("details").forEach((d) =>
  d.addEventListener("toggle", () => {
    if (d.open)
      d.querySelectorAll("img[data-src]").forEach((img) => {
        if (!img.hasAttribute("src")) img.src = img.dataset.src;
      });
  }),
);

// Preserve section and remember explicit language selection.
document.querySelectorAll('.language-switch a').forEach(a => {
  a.addEventListener('click', () => {
    try { localStorage.setItem('portfolio-language', a.hreflang); } catch (_) {}
    a.hash = location.hash;
  });
});
try {
  const preferred = localStorage.getItem('portfolio-language');
  const path = location.pathname;
  if (preferred === 'es' && document.documentElement.lang === 'en' && !location.hash && (path.endsWith('/') || path.endsWith('/index.html'))) {
    location.replace('es.html');
  }
} catch (_) {}

// Focused hash-based navigation; all content remains available without JS.
const views = [...document.querySelectorAll('main > section')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let currentView;
function showView() {
  const hash = location.hash.slice(1);
  const id = ['education','learning'].includes(hash) ? 'about' : views.some(v=>v.id===hash) ? hash : 'home';
  const view = document.getElementById(id);
  views.forEach(v=>v.hidden=v!==view);
  document.querySelectorAll('#links a').forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  if(currentView===id)return;
  currentView=id;
  window.scrollTo({top:0,behavior:'instant'});
  const elements=id==='home'?view.querySelectorAll('.hero .eyebrow,.hero h1,.hero h2,.hero .lead,.hero .actions,.hero .availability,.hero .career-tags,.portrait'):view.querySelectorAll(':scope > .eyebrow,:scope > h2,:scope > .lead,.timeline > article,.projects > article,.featured,.aboutgrid,.analytics > article,:scope > .grid > .metric,#contact article');
  elements.forEach((el,i)=>{el.classList.remove('reveal');void el.offsetWidth;el.style.setProperty('--delay',Math.min(i*110,650)+'ms');el.classList.add('reveal');});
  if(id==='analytics'&&!reduced.matches){view.querySelectorAll('.metric strong').forEach(el=>{const target=el.dataset.original||el.textContent;el.dataset.original=target;const m=target.match(/^([≈+$]*)([\d,.]+)(K|%)?$/);if(!m)return;const n=Number(m[2].replace(/,/g,''));const decimals=m[2].includes('.')?1:0;const start=performance.now();function tick(now){const t=Math.min((now-start)/650,1);el.textContent=t===1?target:m[1]+(n*(1-Math.pow(1-t,3))).toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})+(m[3]||'');if(t<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);});}
}
window.addEventListener('hashchange',showView);showView();
const lightbox=document.querySelector('#lightbox');
document.querySelectorAll('.evidence img').forEach(img=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',img.alt);img.before(b);b.append(img);b.addEventListener('click',()=>{const large=lightbox.querySelector('img');large.src=img.src||img.dataset.src;large.alt=img.alt;lightbox.showModal();});});
document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
