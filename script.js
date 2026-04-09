// ============================================================
//  PASSWORD CHECK
// ============================================================
function checkPassword() {
  const val = document.getElementById('passwordInput').value.trim();
  if (val === 'ILoveYou') {
    window.location.href = 'home.html';
  } else {
    window.location.href = 'https://www.google.com';
  }
}

// ============================================================
//  HAMBURGER / MOBILE NAV
// ============================================================
function toggleNav() {
  const nav   = document.getElementById('navLinks');
  const btn   = document.getElementById('hamburger');
  if (!nav) return;
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
// Close nav when a link inside it is clicked
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navLinks');
  if (nav) {
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        const btn = document.getElementById('hamburger');
        if (btn) btn.classList.remove('open');
      });
    });
  }


  // Allow Enter key on login
  const inp = document.getElementById('passwordInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkPassword(); });

  // Apply saved theme
  applyTheme();
});

// ============================================================
//  DARK MODE TOGGLE
// ============================================================
function toggleDark() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('darkToggle');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
}

function applyTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('darkToggle');
    if (btn) btn.textContent = '🌙';
  }
}

// ============================================================
//  COPY CODE
// ============================================================
function copyCode(btn) {
  const code = btn.closest('.code-wrap').querySelector('code');
  const text = code.innerText || code.textContent;

  const finish = () => {
    const orig = btn.dataset.orig || 'Copy Code';
    btn.dataset.orig = orig;
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(finish).catch(() => fallbackCopy(text, finish));
  } else {
    fallbackCopy(text, finish);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  cb();
}

// ============================================================
//  SEARCH FILTER  (home.html)
// ============================================================
function filterPracticals() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.prac-card').forEach(card => {
    const txt = card.textContent.toLowerCase();
    card.style.display = txt.includes(q) ? '' : 'none';
  });
  // Hide empty sections
  document.querySelectorAll('.section-wrap').forEach(sec => {
    const visible = sec.querySelectorAll('.prac-card:not([style*="none"])').length;
    sec.style.display = visible ? '' : 'none';
  });
}

// ============================================================
//  INSTRUCTIONS BOX TOGGLE
// ============================================================
function toggleInstr(btn) {
  const list = document.getElementById('instrList');
  if (!list) return;
  const collapsed = list.classList.toggle('collapsed');
  btn.textContent = collapsed ? '▼' : '▲';
  btn.title = collapsed ? 'Expand' : 'Collapse';
}
