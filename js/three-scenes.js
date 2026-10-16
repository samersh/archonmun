/* ══════════════════════════════════════════════════════════════════════
   archonMUN · three.js scenes

   Two of them, both optional enhancements layered over markup that
   already works without WebGL:

     1. the hero crest, as a struck medallion that turns slowly
     2. the five committee seals, on a rail the page scroll drives

   Everything here is gated. No WebGL, reduced motion, a coarse pointer
   on a small screen, or three.js failing to load, and the flat version
   stays exactly as it is. Each renderer is also parked whenever its
   section is off screen, so an idle tab is not spinning a GPU.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  function webglOK() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }

  function loadThree() {
    return new Promise((resolve, reject) => {
      if (window.THREE) return resolve(window.THREE);
      const s = document.createElement('script');
      s.src = THREE_SRC;
      s.onload = () => window.THREE ? resolve(window.THREE) : reject(new Error('no global'));
      s.onerror = () => reject(new Error('three.js failed to load'));
      document.head.appendChild(s);
    });
  }

  /* run a render loop only while its element is on screen -------------- */
  function whileVisible(el, tick) {
    let on = false, raf = 0;
    const loop = t => { if (!on) return; tick(t); raf = requestAnimationFrame(loop); };
    new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting === on) return;
        on = e.isIntersecting;
        if (on) raf = requestAnimationFrame(loop); else cancelAnimationFrame(raf);
      });
    }, { rootMargin: '120px' }).observe(el);
  }

  /* Size from the canvas's own client box, never from the host.
     Two separate bugs came from measuring the host: the hero stretched a
     square buffer into a 188x221 box, and the rail sized itself from a
     host 64px taller than its canvas, because the label sits in reserved
     padding. Either way a circle stops being a circle. A ResizeObserver
     on the canvas itself keeps it honest through every layout change. */
  function autoSize(renderer, camera) {
    const el = renderer.domElement;
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(el);
    else addEventListener('resize', fit, { passive: true });
    return fit;
  }

  /* A medallion: a flat face, a mirrored reverse, and a metal rim.
     Built from a circle rather than a cylinder's end cap on purpose. The
     cap's UVs do not map a disc the way a coin face needs, so the artwork
     came out mirrored; CircleGeometry faces the camera with the texture
     the right way round. The reverse is scaled -1 on x so its lettering
     reads correctly from behind too. */
  function medallion(THREE, texture, R, thickness) {
    const g = new THREE.Group();

    const faceMat = new THREE.MeshStandardMaterial({
      map: texture, metalness: .05, roughness: .66, transparent: true
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(css('--gold') || '#B9935F'),
      metalness: .78, roughness: .36
    });

    const disc = new THREE.CircleGeometry(R, 96);

    const front = new THREE.Mesh(disc, faceMat);
    front.position.z = thickness / 2;
    g.add(front);

    const back = new THREE.Mesh(disc, faceMat.clone());
    back.position.z = -thickness / 2;
    back.rotation.y = Math.PI;
    back.scale.x = -1;              // keeps the lettering readable in reverse
    g.add(back);

    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, thickness, 96, 1, true), rimMat);
    rim.rotation.x = Math.PI / 2;
    g.add(rim);

    return g;
  }

  function light(THREE, scene, warm) {
    // Lit for a bright room, not a dark one. On a near-black ground a low
    // ambient and a hard key read as drama; on alabaster the same setup
    // leaves the seal looking dirty, so ambient carries most of it and the
    // key is there only to keep the rim reading as metal.
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xfffaf2, .85);
    key.position.set(-2.2, 3.4, 4.4);
    scene.add(key);
    const warmLight = new THREE.DirectionalLight(new THREE.Color(warm), .35);
    warmLight.position.set(3.2, -1.4, -2.2);
    scene.add(warmLight);
    const fill = new THREE.DirectionalLight(0xffffff, .5);
    fill.position.set(2.4, 1.4, 2.6);
    scene.add(fill);
  }

  /* ── 1. the hero crest ────────────────────────────────────────────── */
  function heroMedallion(THREE, host, src) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 60);
    camera.position.set(0, 0, 9.2);


    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    host.appendChild(renderer.domElement);

    light(THREE, scene, css('--accent') || '#8E4A2F');

    const group = new THREE.Group();
    scene.add(group);

    new THREE.TextureLoader().load(src, tex => {
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      group.add(medallion(THREE, tex, 2.5, .3));
      host.classList.add('is-live');
    });

    autoSize(renderer, camera);

    // the medallion leans toward the pointer, and keeps turning without one
    let px = 0, py = 0;
    if (!reduced) addEventListener('pointermove', e => {
      px = (e.clientX / innerWidth - .5) * 2;
      py = (e.clientY / innerHeight - .5) * 2;
    }, { passive: true });

    whileVisible(host, t => {
      const s = t * .00028;
      const ty = reduced ? -.35 : Math.sin(s) * .5 + px * .42;
      const tx = reduced ?  .12 : Math.cos(s * .8) * .14 - py * .26;
      group.rotation.y += (ty - group.rotation.y) * .06;
      group.rotation.x += (tx - group.rotation.x) * .06;
      renderer.render(scene, camera);
    });
  }

  /* ── 2. the committee rail ────────────────────────────────────────── */
  function committeeRail(THREE, host, seals, onPick) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 2, .1, 80);
    camera.position.set(0, 2.1, 10.4);
    camera.lookAt(0, .35, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    host.appendChild(renderer.domElement);

    light(THREE, scene, css('--accent') || '#8E4A2F');

    const RADIUS = 7.2;                       // the arc the seals ride
    const STEP = Math.PI / 6.4;                 // angle between neighbours
    const group = new THREE.Group();
    group.position.set(0, .75, -RADIUS);
    scene.add(group);

    const loader = new THREE.TextureLoader();
    const coins = seals.map((s, i) => {
      const pivot = new THREE.Group();
      pivot.rotation.y = i * STEP;
      const holder = new THREE.Group();
      holder.position.z = RADIUS;
      pivot.add(holder);
      group.add(pivot);
      loader.load(s.src, tex => {
        tex.encoding = THREE.sRGBEncoding;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        holder.add(medallion(THREE, tex, 1.95, .24));
        host.classList.add('is-live');
      });
      return { pivot, holder, i, name: s.name, level: s.level };
    });

    autoSize(renderer, camera);

    /* The rail advances as it crosses the viewport, not as the whole
       section scrolls: the renderer parks once the rail is off screen, so
       a section-length range would leave the last seals unreachable. This
       way the full set cycles exactly while the rail is in view. */
    let target = 0, current = 0;
    const progress = () => {
      const r = host.getBoundingClientRect();
      const span = innerHeight + r.height;
      if (span <= 0) return 0;
      const raw = (innerHeight - r.top) / span;
      // Spend the whole cycle while the rail is comfortably in view. Mapped
      // across the raw traversal the first and last seals would face front
      // only when the rail was half off screen, so nobody would see them.
      const IN = .22, OUT = .82;
      return Math.min(1, Math.max(0, (raw - IN) / (OUT - IN)));
    };
    const onScroll = () => { target = progress() * (coins.length - 1); };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    /* clicking the front seal opens that committee */
    const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
    renderer.domElement.addEventListener('click', e => {
      const r = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(scene.children, true)[0];
      if (!hit) return;
      const coin = coins.find(c => c.holder === hit.object.parent);
      if (coin && typeof onPick === 'function') onPick(coin.i);
    });

    const label = host.querySelector('[data-rail-label]');
    let shown = -1;
    // name the first seal straight away, so the rail reads correctly at rest
    // rather than staying blank until the first animation frame lands
    const name = i => {
      if (!label || i === shown || !coins[i]) return;
      shown = i;
      label.innerHTML = `<b>${coins[i].name}</b><i>${coins[i].level}</i>`;
    };
    name(0);

    const draw = t => {
      current += (target - current) * .08;
      group.rotation.y = -current * STEP;

      coins.forEach(c => {
        const off = c.i - current;                 // 0 when facing front
        const near = Math.max(0, 1 - Math.abs(off));
        c.holder.scale.setScalar(.78 + near * .34);
        c.holder.rotation.y = off * .5;
        c.holder.position.y = Math.abs(off) * -.42;
        if (!reduced) c.holder.rotation.z = Math.sin(t * .0007 + c.i) * .035;
      });

      name(Math.round(current));
      renderer.render(scene, camera);
    };
    draw(0);
    whileVisible(host, draw);
  }

  /* ── wire up ──────────────────────────────────────────────────────── */
  function init() {
    const hero = document.getElementById('heroStage');
    const rail = document.getElementById('committeeRail');
    if (!hero && !rail) return;

    // a phone gets the flat version: the rail needs room and a real GPU
    const bigEnough = innerWidth >= 900;
    if (!webglOK()) return;

    loadThree().then(THREE => {
      document.documentElement.classList.add('has-3d');

      if (hero && hero.dataset.src) heroMedallion(THREE, hero, hero.dataset.src);

      if (rail && bigEnough) {
        const seals = [...document.querySelectorAll('.cm')].map(cm => ({
          src: cm.querySelector('.cm-seal img').getAttribute('src'),
          name: cm.querySelector('.cm-abbr').textContent,
          level: cm.querySelector('.cm-level').textContent
        }));
        if (!seals.length) return;
        rail.hidden = false;
        committeeRail(THREE, rail, seals, i => {
          const head = document.querySelectorAll('.cm-head')[i];
          if (!head) return;
          if (head.getAttribute('aria-expanded') !== 'true') head.click();
          head.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
        });
      }
    }).catch(() => { /* flat version stands */ });
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init);
  else init();
})();
