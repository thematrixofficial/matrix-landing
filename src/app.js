// src/app.js
import products from './data/products.json' assert { type: 'json' };

const grid = document.getElementById('product-grid');
const filter = document.getElementById('filter-select');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

function createCard(p){
  const el = document.createElement('article');
  el.className = 'product-card glass';
  el.setAttribute('role','listitem');
  el.innerHTML = `
    <div class="product-media" aria-hidden="true">${p.icon || ''}</div>
    <div class="product-meta">
      <div>
        <div class="product-category">${p.category} • ${p.tier}</div>
        <div class="product-title">${p.name}</div>
      </div>
      <div class="product-price">${p.price_display}</div>
    </div>
    <p class="product-deliverables">${p.description}</p>
    <ul class="product-bullets" aria-hidden="false">
      ${p.benefits.map(b=>`<li>${b}</li>`).join('')}
    </ul>
    <div class="product-actions">
      <a class="btn btn-outline" href="#details" aria-label="View details for ${p.name}">Details</a>
      <a class="btn btn-primary" href="#cta" data-product-id="${p.id}">Buy ${p.price_display}</a>
    </div>
  `;
  return el;
}

function render(list){
  grid.innerHTML = '';
  list.forEach(p=>grid.appendChild(createCard(p)));
}

// value-ladder ordering
const tiers = ['Free','Beginner','Professional','Premium','Enterprise'];
products.sort((a,b)=> tiers.indexOf(a.tier) - tiers.indexOf(b.tier));

render(products);

filter.addEventListener('change', (e)=>{
  const v = e.target.value;
  if(v==='all') return render(products);
  render(products.filter(p=>p.category.toLowerCase()===v));
});

// Simple accessible form handling (no backend)
document.querySelectorAll('form').forEach(f=>{
  f.addEventListener('submit', e=>{
    e.preventDefault();
    const submit = f.querySelector('button[type=submit]');
    submit.disabled = true;
    submit.textContent = 'Thanks — check your inbox';
    setTimeout(()=>{submit.disabled=false;submit.textContent = submit.classList.contains('btn-primary')? 'Subscribe' : 'Start free'},1600);
  });
});

// Keyboard focus visible
document.addEventListener('keydown', function(e){
  if(e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});

// Prefers-reduced-motion
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.card').forEach(c=>c.style.transition='none');
}

