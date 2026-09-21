/* ══════════════════════════════════════════════════════════════════════
   archonMUN 2026 · site behaviour
   Everything editable by the Secretariat lives in CONFIG and DATA below.
   ══════════════════════════════════════════════════════════════════ */

/* ── CONFIG ───────────────────────────────────────────────────────────
   PLACEHOLDERS. Replace with the confirmed details before going live.
   `start` drives the hero countdown. Times are Palestine local (UTC+3). */
const CONFIG = {
  start:    '2026-10-08T09:00:00+03:00',   // opening ceremony, drives the countdown
  dates:    '8 to 10 October 2026',
  days:     ['Thursday, 8 October', 'Friday, 9 October', 'Saturday, 10 October'],
  deadline: '26 September 2026',            // registration closes
  city:     'Ramallah',
  venue:    'Bank Al Quds, Al Masyoun',
  domain:   'arcmun.online',
  email:    'archonmun@gmail.com',
  // delegates apply here; every Register button points at this
  register: 'https://docs.google.com/forms/d/e/1FAIpQLSeACJDYA-VANI1TlAiN5xdpGhNsfSXjjtZFQEoB2bEWhWKjfg/viewform',
  // chairs apply separately, linked from the registration section and footer
  chair:    'https://docs.google.com/forms/d/e/1FAIpQLSertyH3-1zFW1vzcfJceojJ8SJ1dG0KksrGjb9BSWuXnLxd8w/viewform',
  social:   { instagram: 'https://instagram.com/archonmun' }
};

/* words that cycle through the hero headline, first one is the resting state */
const SWAP_WORDS = ['system', 'table', 'order', 'rules', 'map'];

/* ── COMMITTEES ─────────────────────────────────────────────────────── */
const COMMITTEES = [
  {
    abbr: 'Historical ICC',
    full: 'International Criminal Court, Historical',
    level: 'advanced',
    blurb: 'Two trials, two centuries apart, one question that refuses to close: who is allowed ' +
           'to write the verdict on a life that changed the map? This room rewards delegates who ' +
           'can build an argument and survive cross examination.',
    topics: [
      { t: 'The Lion of the Nile: The Rise of Gamal Abdel Nasser',
        i: 'i-lion',
        d: 'From the ashes of colonial humiliation rises a figure destined to reshape the Arab ' +
           'world. Gamal Abdel Nasser does not just lead a revolution, he embodies a geopolitical ' +
           'earthquake that challenges global empires and redefines sovereignty. Delegates step ' +
           'into the crucible of the Suez Crisis and the birth of Pan Arabism to navigate a world ' +
           'on the brink of transformation.' },
      { t: 'The Chains of St. Helena: The Case of Napoleon Bonaparte',
        i: 'i-exile',
        d: 'He was the conqueror of Europe, an emperor who redrew the map of the world and rewrote ' +
           'the laws of nations. Now, stripped of his throne and exiled to the desolate cliffs of ' +
           'the South Atlantic, Napoleon faces a trial that spans generations. Was his legacy one ' +
           'of liberation or tyranny, and can true justice be served long after the guns of war ' +
           'have fallen silent?' }
    ]
  },
  {
    abbr: 'HRC',
    full: 'Human Rights Council',
    level: 'beginner',
    blurb: 'The starting floor, and not a soft one. Two debates about who counts as a person when ' +
           'the accounting is done: who gets treated, and who gets watched. Ideal for a first ' +
           'conference or a first placard.',
    topics: [
      { t: 'Healing the Divided World: Ensuring Universal Access to Quality Healthcare',
        i: 'i-asclepius',
        d: 'In an era of unprecedented medical advancement, the tragedy of curable disease and ' +
           'preventable suffering persists for millions. The divide between those who can afford ' +
           'life saving care and those left behind threatens the very core of human dignity. ' +
           'Delegates must establish a new global standard of equity, dismantling the barriers ' +
           'that keep health out of reach for the most vulnerable.' },
      { t: 'The Panoptiscope of Power: Protecting Human Rights in the Era of Mass Surveillance',
        i: 'i-panopticon',
        d: 'The digital dawn has become a waking nightmare for privacy. In the shadows of ' +
           'algorithms and data harvesting, the fundamental right to freedom of thought and ' +
           'expression is quietly eroded by unchecked state and corporate surveillance. Delegates ' +
           'must navigate the treacherous line between security and liberty, safeguarding the ' +
           'human soul against an omniscient digital reach.' }
    ]
  },
  {
    abbr: 'UNDP',
    full: 'United Nations Development Programme',
    level: 'beginner',
    blurb: 'A development committee with the lights off and the wards full. Both topics open with ' +
           'a committee event, so delegates build the response as the situation moves under them. ' +
           'Collaboration beats theatre in this room.',
    topics: [
      { t: 'The Age of Shadows: National Energy Grid Resilience and Decentralized Clean Power',
        i: 'i-bolt',
        d: 'The lights are going out across the globe. As energy grids fail and traditional power ' +
           'becomes scarce, nations must unite to secure their future. This is a debate on global ' +
           'development, innovation, and the collaborative power of shared ambition.',
        e: 'A catastrophic systemic collapse has crippled traditional power grids, plunging the ' +
           'world into darkness and scarcity. Nations must collaborate to forge new partnerships ' +
           'and develop shared, clean energy solutions through diplomacy and strategic development.' },
      { t: 'The Viral Storm Has Passed: Universal Post Pandemic Mental Health Infrastructure',
        i: 'i-olive',
        d: 'The dust settles, revealing a fragile world in desperate need of healing. Delegates ' +
           'must unite to rebuild the invisible foundations of society: mental resilience and ' +
           'communal care. This is the moment to forge a new blueprint for global wellness.',
        e: 'The worst pandemic in modern history has finally receded, leaving behind a global ' +
           'population grappling with widespread trauma and fractured communities. Nations must ' +
           'cooperate to build comprehensive mental health infrastructure, ensuring sustainable ' +
           'healthcare for all.' }
    ]
  },
  {
    abbr: 'UNSC',
    full: 'United Nations Security Council',
    level: 'intermediate',
    blurb: 'Fifteen seats, five vetoes, and a system that was designed in 1945 to stay exactly as ' +
           'it is. Fast procedure, hard bargaining, and no room to hide behind a prepared speech.',
    topics: [
      { t: 'The Chokehold of Commerce: The Weaponization of Global Maritime Chokepoints',
        i: 'i-trident',
        d: 'From the narrow straits of Hormuz and Gibraltar to the vital arteries of the Suez ' +
           'Canal, global trade hangs by a thread. States are increasingly weaponizing these vital ' +
           'passages, threatening to plunge the international economy into chaos. Delegates must ' +
           'decide how to guarantee freedom of navigation against unprecedented coercion.' },
      { t: 'Proxy Warfare and the Erosion of State Sovereignty',
        i: 'i-proxy',
        d: 'The battlefield has shifted from open plains to the shadows, where invisible hands ' +
           'pull the strings of conflict. Sovereign borders are dissolving as powerful states ' +
           'weaponize proxies to wage war without declaring it. Delegates must confront the ' +
           'ultimate paradox: where does support end, and direct aggression begin?' }
    ]
  },
  {
    abbr: 'Crisis',
    full: 'Joint Crisis Committee',
    level: 'advanced',
    blurb: 'The loudest room at archonMUN. Directives, backroom cabinets, and updates that land ' +
           'without warning. Delegates who like a written speech should choose elsewhere. ' +
           'Delegates who like the floor moving should choose here.',
    topics: [
      { t: 'The Tectonic Divide: NATO versus BRICS in the Clash for Global Supremacy',
        i: 'i-fault',
        d: 'The era of fragile peace is over. In the halls of absolute power, the might of NATO ' +
           'collides with the rising ambition of BRICS. When the curtain falls on diplomacy, ' +
           'secrets and subterfuge become the only weapons that matter. Will the world fracture ' +
           'under the weight of this clash, or can a new order be forged from the chaos?' }
    ]
  }
];

const LEVEL_LABEL = {
  beginner: 'Beginner',
  intermediate: 'Intermediate to advanced',
  advanced: 'Advanced'
};


/* ── FAQ ────────────────────────────────────────────────────────────── */
const FAQ = [
  { q: 'Do I need previous Model UN experience?',
    a: 'No. The Human Rights Council and UNDP are built for first time delegates, and the ' +
       'Secretariat runs a briefing before the opening ceremony that covers rules of procedure, ' +
       'position papers, and how a resolution actually gets passed. Experienced delegates should ' +
       'aim for the Security Council, the Historical ICC, or Crisis.' },
  { q: 'Can I apply to chair instead of being a delegate?',
    a: 'Yes. Chairs run the rooms rather than sit in them, and they apply through a separate ' +
       'form linked from the registration section. Chairing suits delegates who already know ' +
       'rules of procedure well enough to teach them under pressure.' },
  { q: 'How do I choose a committee and a country?',
    a: 'The registration form asks for three committee preferences and three country preferences. ' +
       'Allocations are made by the Secretariat with an eye to experience level and to balance in ' +
       'the room, then confirmed by email along with your study guide.' },
  { q: 'What does the fee actually cover?',
    a: 'All three tiers cover the same conference: every committee session at Bank Al Quds, the ' +
       'opening and closing ceremonies at Baladiat Ramallah, the delegate handbook and study ' +
       'guides, lunch and refreshments on session days, the social event, and certification. ' +
       'What changes is how you get there and where you sleep. 300 NIS is the conference alone. ' +
       '450 NIS adds daily round trip transport to the venue. 750 NIS adds three nights at the ' +
       'Millennium Hotel.' },
  { q: 'Can I come with my school or a delegation?',
    a: 'Yes. Delegations of six or more are handled as a group: one point of contact, one ' +
       'invoice, and allocations spread across committees so your delegates are not all arguing ' +
       'with each other. Write to the Secretariat before registering individually.' },
  { q: 'I am coming from Jerusalem. How do I get to Ramallah?',
    a: 'Delegates on the transport tier are collected each morning and returned each evening. ' +
       'On the opening and closing days, 8 and 10 October, there are two pickup points: New Gate ' +
       'and the Beit Hanina train station. On 9 October, the day in between, pickup runs from ' +
       'New Gate only. Exact times are confirmed by email once your registration is paid.' },
  { q: 'I am travelling from abroad. What about visas?',
    a: 'Check the requirements for your passport early, since processing times vary widely. The ' +
       'Secretariat issues a formal letter of invitation on request once your registration is ' +
       'confirmed and paid. We cannot influence the outcome of a visa decision.' },
  { q: 'What should I wear?',
    a: 'Western business attire for all committee sessions and both ceremonies. National dress is ' +
       'welcome and encouraged. The social night is smart casual.' },
  { q: 'Are position papers required?',
    a: 'Yes, one paper per delegate per topic, submitted before the deadline in your study guide. ' +
       'Papers are read by the chairs and count toward awards. Delegates who do not submit remain ' +
       'eligible to debate but not to win.' },
  { q: 'Is there financial support available?',
    a: 'A limited number of partial waivers are set aside each year for delegates who would ' +
       'otherwise be priced out of the room. Keeping that fund alive is the point of our Gold and ' +
       'Silver partnerships. Write to the Secretariat with a short note about your situation.' }
];

/* ══════════════════════════════════════════════════════════════════════
   RENDER
   ══════════════════════════════════════════════════════════════════ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const esc = s => String(s).replace(/[&<>"]/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* committees ------------------------------------------------------- */
function renderCommittees() {
  const host = $('#committeeList');
  if (!host) return;
  host.innerHTML = COMMITTEES.map((c, i) => {
    const id = `cm-${i}`;
    const topics = c.topics.map((t, j) => `
      <article class="topic">
        <span class="topic-head">
          <svg class="topic-motif" viewBox="0 0 48 48" aria-hidden="true"><use href="#${t.i || 'i-fault'}"/></svg>
          <span class="topic-i">Topic ${ROMAN[j]}</span>
        </span>
        <h4>${esc(t.t)}</h4>
        <p>${esc(t.d)}</p>
        ${t.e ? `<span class="event"><b>Committee event</b>${esc(t.e)}</span>` : ''}
      </article>`).join('');
    return `
    <div class="cm" data-level="${c.level}">
      <h3>
        <button class="cm-head" aria-expanded="false" aria-controls="${id}">
          <span class="cm-num">${ROMAN[i]}</span>
          <span class="cm-name">
            <span class="cm-abbr">${esc(c.abbr)}</span>
            <span class="cm-full">${esc(c.full)}</span>
          </span>
          <span class="cm-level" data-lv="${c.level}">${LEVEL_LABEL[c.level]}</span>
          <span class="cm-plus" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="cm-panel" id="${id}"><div><div class="cm-body">
        <p class="cm-blurb">${esc(c.blurb)}</p>
        <div class="topics">${topics}</div>
      </div></div></div>
    </div>`;
  }).join('');

  $$('.cm-head', host).forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    $(`#${btn.getAttribute('aria-controls')}`).classList.toggle('is-open', !open);
  }));

  // open the first committee so the section never reads as an empty list
  const first = $('.cm-head', host);
  if (first) first.click();
}

/* filters ---------------------------------------------------------- */
function initFilters() {
  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    const want = chip.dataset.filter;
    $$('.chip').forEach(c => c.classList.toggle('is-on', c === chip));
    $$('.cm').forEach(cm => {
      cm.hidden = want !== 'all' && cm.dataset.level !== want;
    });
  }));
}


/* board and team: the home page shows the first TEAM_FEATURED, team.html
   shows everyone. Flat cards, no flip, since members have no quote. ----- */
function teamCards(list) {
  const initials = n => n.split(/\s+/).filter(Boolean).slice(0, 2)
    .map(w => w[0]).join('').toUpperCase() || '?';

  return list.map(m => `
    <article class="tm reveal">
      <span class="tm-photo">${m.photo
        ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" decoding="async"${
            m.focus ? ` style="object-position:${esc(m.focus)}"` : ''}>`
        : `<span class="tm-mono" aria-hidden="true">${esc(initials(m.name))}</span>`}</span>
      <h3 class="tm-name">${esc(m.name)}</h3>
      <p class="tm-role">${esc(m.role)}</p>
    </article>`).join('');
}

function renderTeam() {
  const host = $('#teamGrid');
  if (!host || typeof TEAM === 'undefined') return;
  const n = typeof TEAM_FEATURED === 'number' ? TEAM_FEATURED : TEAM.length;
  host.innerHTML = teamCards(TEAM.slice(0, n));

  // only offer the full roster when there is more to see
  const more = $('#teamMore');
  if (more) {
    more.hidden = TEAM.length <= n;
    const count = $('[data-team-count]', more);
    if (count) count.textContent = TEAM.length;
  }
}

/* the full roster page */
function renderTeamAll() {
  const host = $('#teamAll');
  if (!host || typeof TEAM === 'undefined') return;
  host.innerHTML = teamCards(TEAM);
  $$('[data-team-count]').forEach(el => { el.textContent = TEAM.length; });
}

/* faq -------------------------------------------------------------- */
function renderFaq() {
  const host = $('#faqList');
  if (!host) return;
  host.innerHTML = FAQ.map((f, i) => `
    <div class="fq">
      <h3>
        <button class="fq-head" aria-expanded="false" aria-controls="fq-${i}">
          <span>${esc(f.q)}</span><span class="fq-sign" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="fq-panel" id="fq-${i}"><div><p>${esc(f.a)}</p></div></div>
    </div>`).join('');

  $$('.fq-head', host).forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    $(`#${btn.getAttribute('aria-controls')}`).classList.toggle('is-open', !open);
  }));
}

/* countdown -------------------------------------------------------- */
function initCountdown() {
  const host = $('#countdown');
  if (!host) return;
  const target = new Date(CONFIG.start).getTime();
  const cells = {
    days:  $('[data-cd="days"]',  host),
    hours: $('[data-cd="hours"]', host),
    mins:  $('[data-cd="mins"]',  host),
    secs:  $('[data-cd="secs"]',  host)
  };
  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  const tick = () => {
    let d = target - Date.now();
    if (d <= 0) {
      host.innerHTML = '<p class="countdown-live">The floor is open.</p>';
      clearInterval(timer);
      return;
    }
    d = Math.floor(d / 1000);
    cells.secs.textContent  = pad(d % 60);
    cells.mins.textContent  = pad(Math.floor(d / 60) % 60);
    cells.hours.textContent = pad(Math.floor(d / 3600) % 24);
    cells.days.textContent  = pad(Math.floor(d / 86400));
  };
  tick();
  const timer = setInterval(tick, 1000);
}

/* hero word swap: the last word of the headline gets struck out and
   replaced, which is the conference theme made literal.
   Deliberately does not use requestAnimationFrame. rAF is frozen while the
   tab is in the background, so entrances would queue and then all fire at
   once on return, stacking every word on top of the last. A forced reflow
   starts the transition instead, and it works whether or not the tab is
   being painted. ------------------------------------------------------- */
function initSwap() {
  const host = $('#swap');
  const sizer = host && $('.swap-sizer', host);
  if (!host || !sizer || SWAP_WORDS.length < 2) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let i = 0;
  const STRIKE = 1450;      // how long the line takes to cross the word
  const HOLD   = 5200;      // full beat, strike plus a pause on the new word

  // the hidden sizer carries the width, so the box eases between lengths
  const fit = word => {
    sizer.textContent = word;
    host.style.width = sizer.getBoundingClientRect().width + 'px';
  };

  // never let more than one word linger, whatever the tab did while away
  const prune = () => {
    const all = $$('.swap-word', host);
    all.slice(0, -1).forEach(w => w.remove());
    return all[all.length - 1] || null;
  };

  const swap = () => {
    if (document.hidden) return;
    i = (i + 1) % SWAP_WORDS.length;
    const word = SWAP_WORDS[i];
    const out = prune();

    const next = document.createElement('span');
    next.className = 'swap-word is-in';
    next.textContent = word;
    host.appendChild(next);

    if (out) { out.classList.remove('is-on'); out.classList.add('is-out'); }
    void next.offsetWidth;                    // commit the start state

    // hold the new word back until the strike has drawn across the old one
    setTimeout(() => {
      next.classList.remove('is-in');
      next.classList.add('is-on');
      fit(word);
    }, STRIKE);
    setTimeout(() => { if (out) out.remove(); }, STRIKE + 1200);
  };

  // coming back to the tab: collapse to a single clean word
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    const last = prune();
    if (last) {
      last.className = 'swap-word is-on';
      last.textContent = SWAP_WORDS[i];
      fit(SWAP_WORDS[i]);
    }
  });

  // wait for the display face, otherwise the first measurement is a fallback
  const begin = () => { fit(SWAP_WORDS[0]); setInterval(swap, HOLD); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(begin);
  else addEventListener('load', begin);

  addEventListener('resize', () => fit(SWAP_WORDS[i]));
}

/* nav: stuck state, mobile drawer, scrollspy ----------------------- */
function initNav() {
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const links = $('.nav-links');

  // the nav only goes transparent over the hero's dark ground. A page
  // without one (the roster) keeps its solid background, or cream type
  // would sit on a cream page and disappear.
  const overHero = !!$('.hero');
  const onScroll = () => nav.classList.toggle('is-stuck', !overHero || scrollY > 40);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    links.classList.toggle('is-open', !open);
    nav.classList.toggle('is-stuck', !overHero || !open || scrollY > 40);
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }
  });

  // only in-page anchors take part in the scrollspy. Any other href, an
  // external form or a link to another page, would reach querySelector as a
  // selector and throw, taking the rest of the nav setup down with it.
  const sections = $$('.nav-links a')
    .map(a => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('#') && href.length > 1
        ? { a, el: $(href) }
        : null;
    })
    .filter(s => s && s.el);
  if (!sections.length) return;
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const hit = sections.find(s => s.el === en.target);
      if (hit && en.isIntersecting) {
        sections.forEach(s => s.a.classList.toggle('is-current', s === hit));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s.el));
}

/* reveal on scroll -------------------------------------------------- */
function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en, k) => {
      if (!en.isIntersecting) return;
      en.target.style.transitionDelay = `${Math.min(k, 5) * 70}ms`;
      en.target.classList.add('is-in');
      obs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  items.forEach(el => io.observe(el));
}

/* fill config-driven text ------------------------------------------ */
function applyConfig() {
  $$('[data-event-dates]').forEach(el => {
    el.textContent = el.classList.contains('foot-loc')
      ? `${CONFIG.city} · ${CONFIG.dates}`
      : CONFIG.dates;
  });
  $$('[data-venue-name]').forEach(el => { el.textContent = CONFIG.venue; });
  $$('[data-day]').forEach(el => {
    const d = CONFIG.days[Number(el.dataset.day) - 1];
    if (d) el.textContent = d;
  });
  $$('[data-deadline]').forEach(el => { el.textContent = CONFIG.deadline; });
  $$('[data-venue-full]').forEach(el => { el.textContent = CONFIG.venue; });
  const external = (el, url) => {
    if (!url || url === '#') return;
    el.href = url; el.target = '_blank'; el.rel = 'noopener';
  };
  $$('[data-register-link]').forEach(el => external(el, CONFIG.register));
  $$('[data-chair-link]').forEach(el => external(el, CONFIG.chair));
  $$('[data-contact-email]').forEach(el => {
    el.textContent = CONFIG.email;
    el.href = `mailto:${CONFIG.email}`;
  });
  // a social row with no URL configured is removed rather than left dead
  $$('[data-social]').forEach(el => {
    const url = CONFIG.social[el.dataset.social];
    if (url && url !== '#') { el.href = url; el.target = '_blank'; el.rel = 'noopener'; }
    else { (el.closest('li') || el).remove(); }
  });
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
}

/* Real logo. Drop the artwork into assets/ as logo.png (or .jpg, .jpeg,
   .webp, .svg) and it takes over the drawn crest everywhere, no renaming
   and no code change. If none of them resolve, the drawn crest stays. */
const LOGO_FILES = ['logo.png', 'logo.svg', 'logo.jpg', 'logo.jpeg', 'logo.webp'];

function initLogo() {
  const tryNext = k => {
    if (k >= LOGO_FILES.length) return;         // keep the drawn crest
    const src = 'assets/' + LOGO_FILES[k];
    const img = new Image();
    img.onload = () => {
      $$('.crest-img').forEach(el => { el.src = src; });
      document.documentElement.classList.add('has-logo');
    };
    img.onerror = () => tryNext(k + 1);
    img.src = src;
  };
  tryNext(0);
}

/* ── go ────────────────────────────────────────────────────────────── */
document.documentElement.classList.add('js');   // unlocks the reveal animation
applyConfig();
initLogo();
renderCommittees();
initFilters();
renderTeam();
renderTeamAll();
renderFaq();
initCountdown();
initSwap();
initNav();
initReveal();
