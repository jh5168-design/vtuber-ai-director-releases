const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(Boolean(open)));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const selector = button.getAttribute('data-copy');
    const target = selector ? document.querySelector(selector) : null;
    if (!target) return;
    await navigator.clipboard.writeText(target.textContent.trim());
    const previous = button.textContent;
    button.textContent = 'Copied';
    window.setTimeout(() => { button.textContent = previous; }, 1400);
  });
});

const steps = [...document.querySelectorAll('.onboarding-step')];
const progressItems = [...document.querySelectorAll('.progress-item')];
const progressBar = document.querySelector('.progress-line span');
const progressCopy = document.querySelector('.progress-copy');

function showStep(index) {
  if (!steps.length) return;
  const next = Math.max(0, Math.min(index, steps.length - 1));
  steps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === next));
  progressItems.forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === next);
    item.classList.toggle('complete', itemIndex < next);
    item.setAttribute('aria-current', itemIndex === next ? 'step' : 'false');
  });
  if (progressBar) progressBar.style.width = `${((next + 1) / steps.length) * 100}%`;
  if (progressCopy) progressCopy.textContent = `${next + 1} of ${steps.length} · about ${Math.max(2, 8 - next * 2)} min left`;
  history.replaceState(null, '', `#step-${next + 1}`);
  if (window.innerWidth < 760) document.querySelector('.onboarding-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

progressItems.forEach((item, index) => item.addEventListener('click', () => showStep(index)));
document.querySelectorAll('[data-next-step]').forEach((button) => button.addEventListener('click', () => showStep(Number(button.getAttribute('data-next-step')))));
document.querySelectorAll('[data-prev-step]').forEach((button) => button.addEventListener('click', () => showStep(Number(button.getAttribute('data-prev-step')))));
if (steps.length) {
  const initial = Number((location.hash.match(/step-(\d+)/) || [])[1] || 1) - 1;
  showStep(initial);
}

const docsSearch = document.querySelector('#docs-search');
const docsSections = [...document.querySelectorAll('.docs-section')];
const searchEmpty = document.querySelector('.search-empty');

function filterDocs(query) {
  const normalized = query.trim().toLowerCase();
  let visible = 0;
  docsSections.forEach((section) => {
    const matches = !normalized || section.textContent.toLowerCase().includes(normalized);
    section.hidden = !matches;
    if (matches) visible += 1;
  });
  if (searchEmpty) searchEmpty.style.display = visible ? 'none' : 'block';
}
docsSearch?.addEventListener('input', (event) => filterDocs(event.target.value));
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && docsSearch) {
    event.preventDefault();
    docsSearch.focus();
  }
});

const platformLabel = document.querySelector('[data-platform-label]');
if (platformLabel) {
  const ua = navigator.userAgent.toLowerCase();
  platformLabel.textContent = ua.includes('mac') ? 'Recommended for this Mac' : ua.includes('win') ? 'Recommended for this PC' : 'Choose your platform';
}

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
