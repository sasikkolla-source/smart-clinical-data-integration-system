/* =============================================
   SCDIS — App Controller
   ============================================= */

const App = {
  currentPage: 'dashboard',

  init() {
    this.render('dashboard');
    // Simulate live counter updates
    setInterval(() => App.tickLiveData(), 4000);
  },

  render(page) {
    this.currentPage = page;
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-up';

    const content = Pages[page] ? Pages[page]() : `<div class="page-header"><div class="page-title">${page}</div></div><div class="card"><div class="empty-state"><div class="empty-title">Page coming soon</div></div></div>`;
    wrapper.innerHTML = content;
    main.appendChild(wrapper);

    // Post-render hooks
    requestAnimationFrame(() => {
      if (page === 'analytics') App.initAnalyticsCharts();
    });
  },

  reRenderPatients() {
    const q = document.getElementById('pt-search')?.value || '';
    const s = document.getElementById('pt-status-filter')?.value || 'all';
    const main = document.getElementById('main-content');
    const wrapper = main.querySelector('div');
    if (wrapper) wrapper.innerHTML = Pages.patients(q, s);
  },

  initAnalyticsCharts() {
    const d = DATA.analytics;
    Charts.drawLineChart('analytics-chart', d.labels, [
      { data: d.hl7,  color: '#3d8ec4', fillColor: 'rgba(61,142,196,0.06)' },
      { data: d.fhir, color: '#00d4a1', fillColor: 'rgba(0,212,161,0.06)' },
      { data: d.edi,  color: '#f59e0b', fillColor: 'rgba(245,158,11,0.05)' },
    ]);

    Charts.drawDonut('donut-formats',
      [{value:47,color:'#3d8ec4'},{value:32,color:'#00d4a1'},{value:16,color:'#f59e0b'},{value:5,color:'#8b5cf6'}],
      100,
      {val:'82K', lbl:'7-day records'}
    );
  },

  tickLiveData() {
    // Simulated live record counter on dashboard
    const el = document.querySelector('.stat-val');
    if (el && this.currentPage === 'dashboard') {
      const current = parseInt(el.textContent.replace(/,/g,''));
      if (!isNaN(current)) {
        const next = current + Math.floor(Math.random() * 8) + 1;
        el.textContent = next.toLocaleString();
      }
    }
  }
};

// ---- ROUTING ----
function navigate(page, el) {
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el && el.classList) {
    el.classList.add('active');
  } else {
    const target = document.querySelector(`[data-page="${page}"]`);
    if (target) target.classList.add('active');
  }

  App.render(page);

  // Close notif panel if open
  document.getElementById('notif-panel')?.classList.remove('open');
}

// ---- MODAL ----
function showPatientModal(id) {
  const overlay = document.getElementById('modal-overlay');
  const body    = document.getElementById('modal-body');
  const title   = document.getElementById('modal-title');
  const p = DATA.patients.find(pt => pt.id === id);
  if (p) title.textContent = p.name + ' — Patient Detail';
  body.innerHTML = Pages.patientModal(id);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- NOTIFICATIONS ----
function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open');
}

// Close notif panel on outside click
document.addEventListener('click', e => {
  const panel = document.getElementById('notif-panel');
  const btn   = document.getElementById('notif-btn');
  if (panel && !panel.contains(e.target) && !btn?.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ---- BOOT ----
document.addEventListener('DOMContentLoaded', () => App.init());
