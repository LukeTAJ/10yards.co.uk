/* Work page: "The Issue". Mounted into <main> by main.js on #/work; unmount() cleans up on leaving. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var V = function (id, q) { return "https://video.wixstatic.com/video/" + id + "/" + (q || "720p") + "/mp4/file.mp4"; };
  var P = function (id, w, h) { return "https://static.wixstatic.com/media/" + id + "f000.jpg/v1/fill/w_" + w + ",h_" + h + ",al_c,q_80,enc_auto/" + id + ".jpg"; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var rt = function (s) { return s ? Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0") : ""; };
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var monthYear = function (d) { if (!d) return ""; var p = d.split("-"); return MONTHS[+p[1] - 1] + " " + p[0]; };
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
  var host = function (u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; } };
  var ratio = function (f) { var p = String(f || "16:9").split(":"); var r = parseFloat(p[0]) / parseFloat(p[1] || 1); return r > 0 ? r : 16 / 9; };
  var FMT = { "9:16": "vertical", "1:1": "square", "2.39:1": "2.39:1", "3:2": "3:2" };
  var SHARE = [.92, .62, .74, .5, .66, .42, .8, .36, .86, .54, .7, .9, .44, .6];
  var SIDE = ["L", "R", "L", "R", "L", "R", "L", "R", "L", "R", "R", "L", "R", "L"];

  // A film's palette becomes a soft multi-stop fill, mirrored so the slow drift loops without a seam.
  function gradStyle(w, i) {
    var p = (w.palette || []).filter(function (c) { return /^hsl\([\d\s.%]+\)$/.test(c); });
    if (p.length < 2) return "";
    var stops = p.concat(p.slice(0, -1).reverse());
    var angle = [100, 80, 115, 70][i % 4];
    return ' style="--grad: linear-gradient(' + angle + 'deg, ' + stops.join(", ") + ')"';
  }
  function credit(w) {
    var second = [cap(w.type.toLowerCase()), rt(w.runtime), FMT[w.format]].filter(Boolean).join(", ");
    return "<span>" + esc(w.client) + "</span><span>" + esc(second) + "</span>";
  }

  var state = null; // live handles while mounted

  function mount(main) {
    var WORK = window.TY_WORK || [], LATEST = window.TY_LATEST || [];
    var lead = WORK.filter(function (w) { return w.lead; })[0] || WORK[0];
    var rest = WORK.filter(function (w) { return w !== lead; });
    var leadEntry = LATEST.filter(function (e) { return e.work === lead.slug && e.date; })[0];
    var lines = lead.lines || [];
    var tw = lead.title.split(" ");
    var l1 = tw[0], l2 = tw.slice(1).join(" ");
    var press = lead.press || [];

    main.classList.add("issue");
    document.body.classList.add("on-issue");
    main.innerHTML =
      '<article class="cover" aria-labelledby="cover-t">' +
        '<div class="cover-top"><p>Cover story</p><p>' + esc(lead.client) + ".<br>" + esc(cap(lead.type.toLowerCase())) + (leadEntry ? ", " + monthYear(leadEntry.date) : "") + ".</p></div>" +
        '<div class="cover-head" id="coverHead" data-fit-box>' +
          '<h1 class="cover-title" id="cover-t"><a href="#/work/' + esc(lead.slug) + '" id="coverLink">' +
            '<span class="ln"><span class="fit" data-fit="1" data-fit-max=".58"' + gradStyle(lead, 0) + ">" + esc(l1) + '<i class="bl"></i></span></span>' +
            (l2 ? ' <span class="ln ln2"><span class="fit" id="coverL2" data-fit=".64" data-fit-m="1"' + gradStyle(lead, 3) + ">" + esc(l2) + '<i class="bl"></i></span></span>' : "") +
          "</a></h1>" +
          (lines[0] ? '<p class="standfirst">' + esc(lines[0]) + "</p>" : "") +
        "</div>" +
        '<div class="cover-body">' +
          '<details class="cover-story dd"><summary>The story</summary>' +
            lines.slice(1).map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") +
            '<p><a class="ul" href="#/work/' + esc(lead.slug) + '">The project page</a></p>' +
          "</details>" +
          (press.length ? '<details class="cover-press dd"><summary class="press-h">In the papers</summary><ul class="press">' +
            press.map(function (p) {
              return '<li><a href="' + esc(p.url) + '" target="_blank" rel="noopener"><span class="n">' + esc(p.name) + '</span><span class="d">' + esc(host(p.url)) + "</span></a></li>";
            }).join("") + "</ul></details>" : "") +
        "</div>" +
      "</article>" +
      '<section class="index" aria-label="All work"><ul class="stack" id="stack" data-fit-box>' +
        rest.map(function (w, i) {
          return '<li class="row" data-side="' + SIDE[i % SIDE.length] + '" data-slug="' + esc(w.slug) + '">' +
            '<a class="row-a" href="#/work/' + esc(w.slug) + '">' +
              '<span class="t fit" data-fit="' + SHARE[i % SHARE.length] + '"' + gradStyle(w, i) + ">" + esc(w.title) + '<i class="bl"></i></span>' +
              '<span class="cr">' + credit(w) + "</span>" +
            "</a></li>";
        }).join("") +
      "</ul></section>";

    var bySlug = {};
    WORK.forEach(function (w) { bySlug[w.slug] = w; });
    var flood = document.getElementById("flood");
    var fImg = flood.querySelector("img"), fVid = flood.querySelector("video");
    var stackEl = document.getElementById("stack");
    var rows = Array.prototype.slice.call(main.querySelectorAll(".row"));
    var current = null, vt = 0, openRow = null, raf = 0;

    /* fitting */
    function baselinePad(el) { var bl = el.querySelector(".bl"); return bl ? el.offsetHeight - bl.offsetTop : 0; }
    function fitAll() {
      if (!state) return;
      var desk = window.innerWidth >= 900;
      main.querySelectorAll("[data-fit]").forEach(function (el) {
        var box = el.closest("[data-fit-box]");
        if (!box) return;
        var W = box.clientWidth, share = +el.getAttribute("data-fit");
        var f = desk ? share : (el.hasAttribute("data-fit-m") ? +el.getAttribute("data-fit-m") : Math.min(1, share + .22));
        el.style.fontSize = "100px";
        var w = el.getBoundingClientRect().width;
        if (!w) return;
        var fs = 100 * W * f / w, mx = el.getAttribute("data-fit-max");
        if (mx) fs = Math.min(fs, window.innerHeight * +mx);
        el.style.fontSize = Math.max(28, fs).toFixed(2) + "px";
      });
      var head = document.getElementById("coverHead"), l2el = document.getElementById("coverL2");
      if (head && l2el) {
        var sw = head.clientWidth - l2el.offsetWidth - Math.max(24, head.clientWidth * .03);
        var ok = desk && sw >= 260;
        head.classList.toggle("is-set", ok);
        if (ok) {
          head.style.setProperty("--sw", sw + "px");
          head.style.setProperty("--pad", baselinePad(l2el) + "px");
          var sf = head.querySelector(".standfirst");
          if (sf && sf.offsetHeight > l2el.offsetHeight * 1.05) head.classList.remove("is-set");
        }
      }
      var SW = stackEl.clientWidth;
      rows.forEach(function (row) {
        var t = row.querySelector(".t");
        row.classList.toggle("is-stack", !desk || SW - t.offsetWidth < 200);
        row.style.setProperty("--pad", baselinePad(t) + "px");
      });
    }
    function onResize() { cancelAnimationFrame(raf); raf = requestAnimationFrame(fitAll); }

    /* the flood */
    function onPlaying() { fVid.classList.add("is-live"); }
    function floodOn(w, row) {
      if (!w || !(w.id || w.poster)) return;
      document.body.classList.add("is-flooding");
      document.body.classList.toggle("flood-cover", !row);
      rows.forEach(function (r) { r.classList.toggle("is-on", r === row); });
      if (current === w.slug) { if (!reduce && fVid.getAttribute("src")) fVid.play().catch(function () {}); return; }
      current = w.slug;
      clearTimeout(vt);
      fVid.pause(); fVid.classList.remove("is-live"); fVid.removeAttribute("src"); fVid.load();
      var h = Math.round(1600 * window.innerHeight / Math.max(1, window.innerWidth));
      fImg.src = w.id ? P(w.id, 1600, Math.max(400, Math.min(2800, h))) : w.poster;
      if (reduce || !w.id) return; // films without a hosted file flood with their still
      vt = setTimeout(function () { fVid.src = V(w.id, w.q === "480p" ? "480p" : "720p"); fVid.play().catch(function () {}); }, 140);
    }
    function floodOff() {
      clearTimeout(vt);
      document.body.classList.remove("is-flooding", "flood-cover");
      rows.forEach(function (r) { r.classList.remove("is-on"); });
      fVid.pause();
    }
    function onVisibility() { if (document.hidden) floodOff(); }

    if (canHover) {
      rows.forEach(function (row) {
        row.querySelector(".row-a").addEventListener("pointerenter", function () { floodOn(bySlug[row.getAttribute("data-slug")], row); });
      });
      stackEl.addEventListener("pointerleave", floodOff);
      stackEl.addEventListener("focusin", function (e) {
        var row = e.target.closest(".row");
        if (row) floodOn(bySlug[row.getAttribute("data-slug")], row);
      });
      stackEl.addEventListener("focusout", function (e) { if (!stackEl.contains(e.relatedTarget)) floodOff(); });
      if (lead.id) {
        var coverLink = document.getElementById("coverLink");
        coverLink.addEventListener("pointerenter", function () { floodOn(lead, null); });
        coverLink.addEventListener("pointerleave", floodOff);
      }
    }

    /* touch: tap a title to play it behind the page (with a small buzz); tap it again to open the project */
    var buzz = function () {
      try { if (navigator.vibrate) { navigator.vibrate(12); return; } } catch (e) {}
      try { // iOS 18+: toggling a native switch gives a haptic tick
        var l = document.createElement("label"), i = document.createElement("input");
        i.type = "checkbox"; i.setAttribute("switch", ""); l.appendChild(i);
        l.style.cssText = "position:fixed;opacity:0;pointer-events:none;left:-99px";
        document.body.appendChild(l); l.click(); l.remove();
      } catch (e) {}
    };
    var activeEl = null;
    var tio = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (!en.isIntersecting && en.target === activeEl) { floodOff(); activeEl = null; current = current; } });
    }, { threshold: 0 }) : null;
    function tapTo(el, w, row) {
      el.addEventListener("click", function (e) {
        if (activeEl === el) return; // second tap: follow the link to the project page
        e.preventDefault();
        buzz();
        if (tio && activeEl) tio.unobserve(activeEl);
        activeEl = el;
        if (tio) tio.observe(el);
        floodOn(w, row);
      });
    }
    function onDocTap(e) {
      if (activeEl && !e.target.closest(".row-a, #coverLink")) { floodOff(); if (tio) tio.unobserve(activeEl); activeEl = null; }
    }
    if (!canHover) {
      rows.forEach(function (row) {
        var w = bySlug[row.getAttribute("data-slug")];
        if (w && w.id) tapTo(row.querySelector(".row-a"), w, row);
      });
      if (lead.id) tapTo(document.getElementById("coverLink"), lead, null);
      document.addEventListener("click", onDocTap);
    }
    function closePlayer() {}
    var details = main.querySelectorAll("details.dd");
    if (matchMedia("(min-width: 561px)").matches) details.forEach(function (d) { d.open = true; });

    fVid.addEventListener("playing", onPlaying);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    state = {
      cleanup: function () {
        floodOff(); closePlayer();
        fVid.removeEventListener("playing", onPlaying);
        fVid.classList.remove("is-live"); fVid.removeAttribute("src"); fVid.load();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        cancelAnimationFrame(raf);
        if (tio) tio.disconnect();
        document.removeEventListener("click", onDocTap);
        main.classList.remove("issue");
        document.body.classList.remove("on-issue", "is-flooding");
      }
    };
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  }

  function unmount() { if (state) { var s = state; state = null; s.cleanup(); } }

  window.TYWork = { mount: mount, unmount: unmount };
})();
