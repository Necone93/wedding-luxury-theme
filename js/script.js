document.addEventListener('DOMContentLoaded', () => {
  // Učitaj JSON ako postoji (opciono)
  fetch('data.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : null)
    .catch(() => null)
    .then(data => {
      if (data) window.__INVITE_DATA = data;

      // Ime para
      const namesEl = document.getElementById('ime-para');
      if (namesEl && data?.imePara) namesEl.innerHTML = data.imePara;

      // Slika para
      const parEl = document.getElementById('slika-para');
      if (parEl && data?.slikaPara) parEl.src = data.slikaPara;

      // Datum i tekst
      const datumEl = document.getElementById('datum-svadbe');
      if (datumEl && data?.datumSvadbe) datumEl.textContent = data.datumSvadbe;

      const orgDatum = document.getElementById('org-datum');
      if (orgDatum && data?.organizacijaDatum) orgDatum.textContent = data.organizacijaDatum;

      const pozivnicaP = document.getElementById('drugitekst');
      if (pozivnicaP && data?.pozivnicaTekst) pozivnicaP.innerHTML = data.pozivnicaTekst;

      const rsvpRok = document.getElementById('rsvp-rok');
      if (rsvpRok && data?.rsvpRok) rsvpRok.textContent = data.rsvpRok;

      const rsvpForm = document.getElementById('rsvp-form');
      if (rsvpForm && data?.rsvpEmail) {
        rsvpForm.action = 'https://formsubmit.co/' + data.rsvpEmail;
      }

      // COUNTDOWN ispod "Organizacija"
      const ccfg = data?.countdown || {
        title: 'Radujemo se vašem dolasku',
        targetISO: '2025-10-16T13:00:00+02:00'
      };
      insertCountdownAfterHeading(ccfg);

      // INTRO overlay (ime para)
      setupIntroOverlay();
    });
});

/* ---------- COUNTDOWN (isti kao pre, luks boje iz CSS-a) ---------- */
function insertCountdownAfterHeading(cfg = {}){
  const heading = document.querySelector('.h1-organizacija');
  if (!heading) return;
  const row = heading.closest('.row') || heading.parentElement;

  const wrap = document.createElement('div');
  wrap.className = 'container my-3';
  wrap.innerHTML = `
    <div class="text-center">
      <h2 class="cd2-title">${cfg.title || 'Radujemo se vašem dolasku'}</h2>
      <div class="cd2-grid">
        <div class="cd2-seg">
          <div id="cd2-d" class="cd2-num">00</div>
          <div id="cd2-d-lab" class="cd2-lab">Dana</div>
        </div>
        <div class="cd2-seg">
          <div id="cd2-h" class="cd2-num">00</div>
          <div class="cd2-lab">Sati</div>
        </div>
        <div class="cd2-seg">
          <div id="cd2-m" class="cd2-num">00</div>
          <div class="cd2-lab">Minuta</div>
        </div>
        <div class="cd2-seg">
          <div id="cd2-s" class="cd2-num">00</div>
          <div class="cd2-lab">Sekundi</div>
        </div>
      </div>
    </div>`;
  row.after(wrap);

  startCountdown(cfg.targetISO || '2025-10-16T13:00:00+02:00', cfg.labels);
}

function startCountdown(targetISO, labelsCfg){
  const dEl = document.getElementById('cd2-d');
  const hEl = document.getElementById('cd2-h');
  const mEl = document.getElementById('cd2-m');
  const sEl = document.getElementById('cd2-s');
  const dLab= document.getElementById('cd2-d-lab');

  const target = new Date(targetISO);
  if (isNaN(target.getTime())) return;

  const pad = n => (n < 10 ? '0'+n : ''+n);
  const labs = labelsCfg || {
    days:   { one:'Dan', many:'Dana' },
    hours:  { one:'Sat', many:'Sati' },
    minutes:{ one:'Minut', many:'Minuta' },
    seconds:{ one:'Sekunda', many:'Sekundi' }
  };
  const dayLabel = n => (n === 1 ? labs.days.one : labs.days.many);

  function tick(){
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const sec = Math.floor(diff / 1000) % 60;
    const min = Math.floor(diff / (1000*60)) % 60;
    const hrs = Math.floor(diff / (1000*60*60)) % 24;
    const day = Math.floor(diff / (1000*60*60*24));

    if (dEl) dEl.textContent = pad(day);
    if (hEl) hEl.textContent = pad(hrs);
    if (mEl) mEl.textContent = pad(min);
    if (sEl) sEl.textContent = pad(sec);
    if (dLab) dLab.textContent = dayLabel(day);

    if (diff === 0) clearInterval(intId);
  }
  tick();
  const intId = setInterval(tick, 1000);
}

/* ---------- INTRO overlay ---------- */
function setupIntroOverlay(){
  const intro = document.getElementById('intro');
  const introNames = document.getElementById('intro-names');
  if (!intro || !introNames) return;

  const couple =
    (window.__INVITE_DATA && window.__INVITE_DATA.imePara) ||
    (document.getElementById('ime-para') && document.getElementById('ime-para').innerHTML) ||
    'Ana <br> & <br> Marko';

  introNames.innerHTML = couple;

  const hide = () => intro.classList.add('is-done');
  setTimeout(hide, 3200);
  intro.addEventListener('click', hide, { once:true });
}
