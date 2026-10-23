(function () {
  const CFG = window.TY_CONFIG, WORK = window.TY_WORK, LATEST = window.TY_LATEST;
  const main = document.getElementById("main");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const V = (id, q) => `https://video.wixstatic.com/video/${id}/${q || "1080p"}/mp4/file.mp4`;
  const P = (id, w, h) => `https://static.wixstatic.com/media/${id}f000.jpg/v1/fill/w_${w},h_${h},al_c,q_80,enc_auto/${id}.jpg`;
  const rt = (s) => (s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDate = (d) => { if (!d) return ""; const [y, m, day] = d.split("-"); return `${day}.${m}.${y}`; };
  const isTall = (w) => w.format === "9:16" || w.format === "1:1";

  /* ---------- pieces ---------- */
  function tile(w) {
    const media = w.id
      ? `<img loading="lazy" alt="" src="${P(w.id, 1280, w.format === "9:16" ? 2276 : 720)}"><video muted loop playsinline preload="none" data-src="${V(w.id, "480p")}"></video>`
      : `<span class="soon">Film coming soon</span>`;
    return `<a class="tile" href="#/work/${w.slug}">
      <div class="tile-media">${media}</div>
      <div class="tile-cap"><span class="t">${esc(w.title)}</span><span class="r">${rt(w.runtime)}</span><span class="c">${esc(w.client)}, ${esc(w.type.toLowerCase())}</span></div>
    </a>`;
  }
  function bindTiles(root) {
    if (!canHover || reduce) return;
    root.querySelectorAll(".tile").forEach((t) => {
      const v = t.querySelector("video");
      if (!v) return;
      t.addEventListener("mouseenter", () => { if (!v.src) v.src = v.dataset.src; v.play().then(() => t.classList.add("playing")).catch(() => {}); });
      t.addEventListener("mouseleave", () => { v.pause(); t.classList.remove("playing"); });
    });
  }

  function leadBlock(w) {
    const media = w.id
      ? `<img alt="" src="${P(w.id, 1600, 900)}"><video muted loop playsinline preload="none" data-src="${V(w.id, "720p")}"></video>`
      : `<span class="soon">Film coming soon</span>`;
    return `<section class="lead">
      <a class="tile lead-media" href="#/work/${w.slug}" aria-label="${esc(w.title)}"><div class="tile-media">${media}</div></a>
      <div class="lead-copy">
        <p class="lead-client">${esc(w.client)}</p>
        <h2><a href="#/work/${w.slug}">${esc(w.title)}</a></h2>
        ${(w.lines || []).map((l) => `<p>${esc(l)}</p>`).join("")}
        <p><a class="lead-more" href="#/work/${w.slug}">Read more and watch</a></p>
      </div>
    </section>`;
  }

  /* ---------- pages ---------- */
  function home() {
    main.innerHTML = `
      <section class="hero" aria-label="Showreel">
        <video id="reel" muted loop playsinline autoplay poster="${P(CFG.showreel, 1920, 1080)}" src="${V(CFG.showreel)}"></video>
        <div class="hero-mark" aria-hidden="true">10Yards</div>
        <div class="hero-base">
          <span>A London studio. Idea, shoot, edit and VFX, all in house.</span>
          <span><span class="tc" id="tc">00:00:00:00</span>&nbsp;&nbsp;&nbsp;<button type="button" id="sound">Sound on</button></span>
        </div>
      </section>`;
    document.body.classList.add("is-home");
    const reel = document.getElementById("reel"), tc = document.getElementById("tc"), snd = document.getElementById("sound");
    if (reduce) { reel.removeAttribute("autoplay"); reel.pause(); }
    snd.addEventListener("click", () => { reel.muted = !reel.muted; snd.textContent = reel.muted ? "Sound on" : "Sound off"; });
    const tick = () => {
      if (!document.body.contains(reel)) return;
      const t = reel.currentTime || 0;
      tc.textContent = `00:00:${String(Math.floor(t)).padStart(2, "0")}:${String(Math.floor((t % 1) * 25)).padStart(2, "0")}`;
      requestAnimationFrame(tick);
    };
    tick();
    bindTiles(main);
  }

  function work() { window.TYWork.mount(main); }

  let view = "grid", filter = "All";
  function workGrid() {
    const types = ["All", ...new Set(WORK.map((w) => w.type))];
    const list = WORK.filter((w) => filter === "All" || w.type === filter);
    const lead = view === "grid" ? list.find((w) => w.lead) : null;
    const rest = list.filter((w) => w !== lead);
    const wide = rest.filter((w) => !isTall(w)), tall = rest.filter(isTall);
    main.innerHTML = `
      <div class="head"><h1>Work</h1>
        <div class="side" role="group" aria-label="Filter">${types.map((t) => `<button type="button" data-f="${esc(t)}" aria-pressed="${t === filter}">${esc(t)}</button>`).join("")}</div>
        <div class="side" role="group" aria-label="View"><button type="button" data-v="grid" aria-pressed="${view === "grid"}">Grid</button><button type="button" data-v="list" aria-pressed="${view === "list"}">List</button></div>
      </div>
      ${view === "grid"
        ? `${lead ? leadBlock(lead) : ""}${wide.length ? `<div class="tiles">${wide.map(tile).join("")}</div>` : ""}${tall.length ? `<div class="tiles tiles--tall">${tall.map(tile).join("")}</div>` : ""}`
        : `<div class="list-head"><span>Title</span><span>Client</span><span>Type</span><span>Format</span><span>Runtime</span></div>
           <div class="list">${list.map((w) => `<a class="list-row" href="#/work/${w.slug}" data-id="${w.id || ""}"><span class="t">${esc(w.title)}</span><span class="m keep">${esc(w.client)}</span><span class="m">${esc(w.type)}</span><span class="m">${esc(w.format)}</span><span class="r">${rt(w.runtime) || "Soon"}</span></a>`).join("")}</div>`}`;
    main.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { filter = b.dataset.f; workGrid(); }));
    main.querySelectorAll("[data-v]").forEach((b) => b.addEventListener("click", () => { view = b.dataset.v; workGrid(); }));
    bindTiles(main);
    if (view === "list" && canHover && !reduce) {
      const peek = document.getElementById("peek"), pv = peek.querySelector("video");
      main.querySelectorAll(".list-row").forEach((r) => {
        r.addEventListener("mouseenter", () => { if (!r.dataset.id) return; pv.src = V(r.dataset.id, "480p"); pv.play().catch(() => {}); peek.classList.add("on"); });
        r.addEventListener("mouseleave", () => { peek.classList.remove("on"); pv.pause(); });
      });
    }
  }

  function project(slug) {
    const i = WORK.findIndex((w) => w.slug === slug);
    if (i < 0) return notFound();
    const w = WORK[i], nx = WORK[(i + 1) % WORK.length];
    const film = w.id
      ? `<video controls playsinline autoplay poster="${P(w.id, 1920, 1080)}" src="${V(w.id, w.q)}"></video>`
      : w.poster && w.filmPost
        ? `<a class="embed watch-out" href="${esc(w.filmPost)}" target="_blank" rel="noopener"><img alt="" src="${esc(w.poster)}"><span>Watch the film on ${esc(w.client)}'s site</span></a>`
        : `<div class="soon">Film coming soon</div>`;
    main.innerHTML = `
      <section class="film">${film}</section>
      <article class="project">
        <h1>${esc(w.title)}</h1>
        <dl class="credits">
          <dt>Client</dt><dd>${esc(w.client)}</dd>
          <dt>Type</dt><dd>${esc(w.type)}</dd>
          <dt>Format</dt><dd>${esc(w.format)}</dd>
          ${w.runtime ? `<dt>Runtime</dt><dd>${rt(w.runtime)}</dd>` : ""}
          <dt>Studio</dt><dd>10Yards</dd>
        </dl>
        <div class="copy">
          ${(w.lines || []).map((l) => `<p>${esc(l)}</p>`).join("") || "<p>Written up soon.</p>"}
          ${w.press ? `<p class="press">${w.press.map((p) => `<a href="${p.url}" target="_blank" rel="noopener">${esc(p.name)}</a>`).join("")}</p>` : ""}
        </div>
      </article>
      <a class="next" href="#/work/${nx.slug}"><span>Next</span><b>${esc(nx.title)}</b></a>`;
    const v = main.querySelector(".film video");
    if (v) { v.muted = true; v.play().catch(() => {}); v.addEventListener("click", () => { v.muted = false; }, { once: true }); }
  }

  function logEntry(e) {
    const linked = e.work ? WORK.find((w) => w.slug === e.work) : null;
    return `<li class="log-entry">
      ${e.date ? `<time datetime="${e.date}">${fmtDate(e.date)}</time>` : `<span class="nodate"></span>`}
      <h2>${esc(e.title)}</h2>
      <div class="body"><p>${esc(e.text)}</p>
        ${e.links.length ? `<p>${e.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${esc(l.name)}</a>`).join("&nbsp;&nbsp; ")}</p>` : ""}
        ${linked ? `<p><a href="#/work/${linked.slug}">See the project</a></p>` : ""}
      </div>
    </li>`;
  }
  function latest() {
    main.innerHTML = `<div class="head"><h1>Latest</h1><p class="side">Shoots, press and what we've been up to.</p></div><ol class="log">${LATEST.map(logEntry).join("")}</ol>`;
  }

  function studio() {
    main.innerHTML = `
      <div class="head"><h1>Studio</h1></div>
      <p class="statement">Three lifelong friends. One crew that does the lot.</p>
      <p class="intro">10Yards is a creative studio in London. We take a project from the first idea through to release, with everything made in house, so nothing gets lost between the people who thought of it and the people who finish it.</p>
      <ul class="studio-cols">
        <li><h3>Create</h3><p>Ideas and scripts built around where your audience actually is.</p></li>
        <li><h3>Produce</h3><p>Our own crew and kit, from studio sets to stunts on the street.</p></li>
        <li><h3>Edit</h3><p>Cut, grade, sound, VFX and animation, all in the same room.</p></li>
        <li><h3>Release</h3><p>Versions for every screen: 16:9, square and vertical.</p></li>
      </ul>`;
  }

  /* Contact: the address set as big as the page allows, filled with one colour from every film we've made. */
  function contact() {
    const stops = WORK.map((w) => (w.palette || [])[0]).filter((c) => /^hsl\([\d\s.%]+\)$/.test(c || ""));
    const grad = stops.length > 1 ? ` style="--grad: linear-gradient(100deg, ${stops.concat(stops.slice(0, -1).reverse()).join(", ")})"` : "";
    const tel = CFG.phone ? CFG.phone.replace(/[^\d+]/g, "").replace(/^0/, "+44") : "";
    const people = CFG.people && CFG.people.length ? CFG.people : [{ name: CFG.email, email: CFG.email }];
    main.innerHTML = `
      <section class="contact2" aria-labelledby="contactT">
        <h1 id="contactT" class="sr">Contact</h1>
        <p class="kick">Briefs, collaborations, and anything that needs making. Write to us or call.</p>
        <div class="c-lines" id="cLines">
          ${people.map((p, i) => `<div class="c-row${i % 2 ? " c-row--r" : ""}"><a class="c-big c-name" href="mailto:${esc(p.email)}"${grad} aria-label="Email ${esc(p.name)}: ${esc(p.email)}">${esc(p.name)}<i class="c-bl"></i></a><span class="c-lab">${esc(p.email)}</span></div>`).join("")}
          ${CFG.phone ? `<div class="c-row"><a class="c-big c-tel" href="tel:${esc(tel)}">${esc(CFG.phone)}<i class="c-bl"></i></a><span class="c-lab">Call</span></div>` : ""}
        </div>
        <div class="c-foot">
          <span>London</span>
          ${CFG.instagram ? `<a href="${esc(CFG.instagram)}" target="_blank" rel="noopener">Instagram</a>` : ""}
        </div>
      </section>`;
    document.body.classList.add("is-contact");
    const box = document.getElementById("cLines");
    // Names share one size (the longest fills the width); the number sits a little smaller.
    const fit = () => {
      if (!document.body.contains(box)) return removeEventListener("resize", fit);
      const W = box.clientWidth * (innerWidth > 560 ? 0.5 : 0.78), names = [...box.querySelectorAll(".c-name")], t = box.querySelector(".c-tel");
      names.concat(t ? [t] : []).forEach((el) => { el.style.fontSize = "100px"; });
      const widest = Math.max(1, ...names.map((el) => el.getBoundingClientRect().width));
      const fs = Math.min((100 * W * 0.96) / widest, innerHeight * 0.22);
      names.forEach((el) => { el.style.fontSize = fs.toFixed(2) + "px"; });
      if (t) { const tw = t.getBoundingClientRect().width; t.style.fontSize = Math.max(26, Math.min(fs * 0.6, (100 * W * 0.96) / tw)).toFixed(2) + "px"; }
    };
    fit();
    addEventListener("resize", fit);
    if (document.fonts) document.fonts.ready.then(fit);
  }

  function notFound() {
    main.innerHTML = `<div class="head"><h1>Not found</h1><a href="#/work">See all work</a></div>`;
  }

  /* ---------- router ---------- */
  const routes = { "": home, work, latest, studio, contact };
  function render() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const page = parts[0] || "";
    document.getElementById("peek").classList.remove("on");
    if (window.TYWork) window.TYWork.unmount();
    document.body.classList.remove("is-home", "is-contact");
    main.querySelectorAll("video").forEach((v) => v.pause());
    if (page === "work" && parts[1]) project(parts[1]);
    else (routes[page] || notFound)();
    document.querySelectorAll("[data-nav]").forEach((a) => { if (a.dataset.nav === page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = page ? `${page[0].toUpperCase()}${page.slice(1)} | 10Yards` : "10Yards";
    scrollTo(0, 0);
  }
  addEventListener("hashchange", () => {
    if (reduce) return render();
    main.classList.add("leaving");
    setTimeout(() => { render(); main.classList.remove("leaving"); main.focus({ preventScroll: true }); }, 180);
  });
  render();

  const fe = document.getElementById("footEmail");
  fe.textContent = CFG.email; fe.href = `mailto:${CFG.email}`;
  var fy = document.getElementById("footYear"); if (fy) fy.remove();
})();
