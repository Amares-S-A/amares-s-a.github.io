/* app.js — lógica de la página. No hace falta editarlo. */
"use strict";
/* ===================================================================== */
const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, "0");
const esc = s => String(s ?? "").replace(/[&<>"'`]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"}[c]));

/* ---------- SEGURIDAD: validación de todo lo que viene de datos.js ----------
   Aunque los datos los cargás vos, se validan igual: si alguien llegara a meter
   un link raro (javascript:, otro dominio, etc.) se descarta en vez de mostrarse. */
const HOSTS_FOTOS = ["images.unsplash.com"];                 // + fotos propias con ruta relativa (img/...)
const HOSTS_SV    = ["www.google.com", "maps.google.com"];   // Street View (solo /maps/embed)
const HOSTS_360   = ["kuula.co", "my.matterport.com"];
function urlSegura(u, hosts, { relativa = false, prefijo = "" } = {}){
  if (typeof u !== "string" || !u.trim()) return "";
  u = u.trim();
  if (relativa && /^[\w\-./]+\.(jpe?g|png|webp|avif)$/i.test(u) && !u.includes("..")) return u;
  try {
    const x = new URL(u);
    if (x.protocol !== "https:" || !hosts.includes(x.hostname)) return "";
    if (prefijo && !x.pathname.startsWith(prefijo)) return "";
    return x.href;
  } catch { return ""; }
}
const soloDigitos = s => String(s ?? "").replace(/\D/g, "");
/* WhatsApp: el número se valida (solo dígitos) y el texto siempre va codificado */
const WA_NUM = soloDigitos(WHATSAPP);
const waSeguro = txt => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(String(txt).slice(0, 1500))}`;
PROPIEDADES.forEach((p, i) => {
  p.id = String(p.id || "prop-" + (i + 1)).toLowerCase().replace(/[^a-z0-9-]/g, "") || "prop-" + (i + 1);
  p.fotos = (Array.isArray(p.fotos) ? p.fotos : [])
    .map(f => ({ src: urlSegura(f && f.src, HOSTS_FOTOS, { relativa: true }), label: String((f && f.label) || "") }))
    .filter(f => f.src);
  if (!p.fotos.length) p.fotos = [{ src: "data:image/gif;base64,R0lGODlhAQABAAAAACw=", label: "Foto" }];
  p.streetView = urlSegura(p.streetView, HOSTS_SV, { prefijo: "/maps/embed" });
  p.tour360 = urlSegura(p.tour360, HOSTS_360);
  p.ambientes = Number.isFinite(+p.ambientes) && +p.ambientes > 0 ? Math.floor(+p.ambientes) : null;
  p.specs = p.specs && typeof p.specs === "object" ? p.specs : {};
});

/* Foto que no carga → fondo neutro (sin manejadores inline, compatible con la CSP) */
document.addEventListener("error", e => {
  const img = e.target;
  if (img.tagName === "IMG" && !img.dataset.fallback){
    img.dataset.fallback = "1"; img.alt = ""; img.classList.add("img-fallback");
    img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
  }
}, true);
const imgAttrs = 'loading="lazy" decoding="async"';

/* ---------- HERO ---------- */
const heroImgs = PROPIEDADES.map(p => p.fotos[0].src);
$("#heroSlides").innerHTML = heroImgs.map((s, i) =>
  `<div class="hero-slide${i === 0 ? " on" : ""}"><img src="${s}" alt="" ${i ? 'loading="lazy"' : ""}></div>`).join("");
$("#heroDots").innerHTML = heroImgs.map((_, i) => `<button aria-label="Imagen ${i+1}" class="${i===0?"on":""}"></button>`).join("");
let heroIdx = 0, heroTimer;
function heroGo(i){
  const slides = document.querySelectorAll(".hero-slide"), dots = document.querySelectorAll(".hero-dots button");
  slides[heroIdx].classList.remove("on"); dots[heroIdx].classList.remove("on");
  heroIdx = (i + slides.length) % slides.length;
  slides[heroIdx].classList.add("on"); dots[heroIdx].classList.add("on");
}
function heroAuto(){ clearInterval(heroTimer); heroTimer = setInterval(() => heroGo(heroIdx + 1), 6000); }
document.querySelectorAll(".hero-dots button").forEach((b, i) => b.onclick = () => { heroGo(i); heroAuto(); });
heroAuto();

/* ---------- BUSCADOR + GRILLA ---------- */
const uniq = k => [...new Set(PROPIEDADES.map(p => p[k]).filter(Boolean))];
$("#s-barrio").innerHTML += uniq("barrio").map(b => `<option>${esc(b)}</option>`).join("");
$("#s-dest").innerHTML += uniq("destino").map(d => `<option>${esc(d)}</option>`).join("");

const ambTxt = n => n ? `${n} amb.` : "";
$("#grid").innerHTML = PROPIEDADES.map((p, i) => {
  const meta = [ambTxt(p.ambientes), p.specs["Superficie"], p.specs["Piso"] ? "Piso " + p.specs["Piso"] : "", p.destino]
    .filter(Boolean).map(m => `<span>${esc(m)}</span>`).join("");
  return `
  <a class="card rv ${["","d1","d2"][i%3]}" href="#${p.id}" data-i="${i}">
    <div class="ph">
      <img src="${p.fotos[0].src}" alt="Edificio ${esc(p.titulo)}" ${imgAttrs}>
      <span class="tag">${esc(p.operacion)}${p.estado && p.estado !== "Disponible" ? " · " + esc(p.estado) : ""}</span>
      <span class="num">${pad(i+1)} / ${pad(PROPIEDADES.length)}</span>
      ${p.tour360 ? `<span class="badge360">360°</span>` : ""}
      <span class="more">Ver propiedad →</span>
    </div>
    <div class="info">
      <div>
        <h3>${esc(p.titulo)}${p.unidad ? ` <span style="font-size:.7em;color:var(--ink-soft)">· ${esc(p.unidad)}</span>` : ""}</h3>
        <div class="hood">${esc(p.barrio)} · CABA</div>
      </div>
      <div class="price"><small>${/consult/i.test(p.precio) ? "Precio" : "Desde"}</small>${esc(p.precio)}</div>
      ${meta ? `<div class="meta" style="width:100%">${meta}</div>` : ""}
    </div>
  </a>`;
}).join("") + `<p class="empty" id="empty">No hay propiedades con esos filtros. <a href="#" id="emptyReset" style="text-decoration:underline">Ver todas</a></p>`;

function applySearch(){
  const a = $("#s-amb").value, b = $("#s-barrio").value, d = $("#s-dest").value;
  let n = 0;
  document.querySelectorAll(".card").forEach(c => {
    const p = PROPIEDADES[+c.dataset.i];
    const ok = (!b || p.barrio === b) && (!d || p.destino === d) &&
               (!a || (a === "4" ? p.ambientes >= 4 : p.ambientes === +a));
    c.classList.toggle("hide", !ok); if (ok) n++;
  });
  $("#count").textContent = `${n} ${n === 1 ? "propiedad" : "propiedades"}`;
  $("#empty").style.display = n ? "none" : "block";
}
function resetSearch(){ ["#s-amb","#s-barrio","#s-dest"].forEach(s => $(s).value = ""); applySearch(); }
["#s-amb","#s-barrio","#s-dest"].forEach(s => $(s).addEventListener("change", applySearch));
$("#s-reset").onclick = resetSearch;
$("#emptyReset").addEventListener("click", e => { e.preventDefault(); resetSearch(); });
$("#search").addEventListener("submit", e => e.preventDefault());
applySearch();

/* ---------- POR QUÉ / TESTIMONIOS / FAQ ---------- */
$("#whyGrid").innerHTML = POR_QUE.map((w, i) =>
  `<div class="rv ${["","d1","d2"][i%3]}"><div class="n">${pad(i+1)}</div><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`).join("");
if (TESTIMONIOS.length){
  $("#reviews").hidden = false;
  $("#revGrid").innerHTML = TESTIMONIOS.map((r, i) =>
    `<div class="rev rv ${["","d1","d2"][i%3]}"><div class="stars">${"★".repeat(r.estrellas || 5)}</div><blockquote>“${esc(r.texto)}”</blockquote><cite>${esc(r.autor)}</cite></div>`).join("");
}
$("#faqList").innerHTML = FAQ.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");

/* ---------- DETALLE ---------- */
$("#details").innerHTML = PROPIEDADES.map((p, i) => {
  const specs = Object.entries(p.specs).filter(([, v]) => v !== "")
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  const mapQ = encodeURIComponent(p.direccionMapa);
  return `
  <section class="prop ${i % 2 ? "flip" : ""}" id="${p.id}">
    <div class="wrap prop-grid">
      <div class="gallery rv" data-i="${i}">
        ${(p.streetView || p.tour360) ? `<div class="gal-tabs">
          ${p.streetView ? `<button class="on" data-t="sv">Fachada</button>` : ""}
          <button class="${p.streetView ? "" : "on"}" data-t="fotos">Fotos</button>
          ${p.tour360 ? `<button data-t="tour">Recorrido 360°</button>` : ""}
        </div>` : ""}
        ${p.streetView ? `<div class="tour pane-sv on"><iframe loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" title="Fachada ${esc(p.titulo)} — Street View" src="${esc(p.streetView)}"></iframe></div>` : ""}
        ${p.tour360 ? `<div class="tour pane-tour"><iframe loading="lazy" allowfullscreen allow="xr-spatial-tracking; gyroscope; accelerometer" title="Recorrido 360 ${esc(p.titulo)}" data-src="${esc(p.tour360)}"></iframe></div>` : ""}
        <div class="gal-main"${p.streetView ? ' style="display:none"' : ""}>
          ${p.fotos.map((f, j) => `<img src="${f.src}" alt="${esc(p.titulo)} — ${esc(f.label)}" class="${j===0?"on":""}" ${imgAttrs}>`).join("")}
          <span class="gal-label">${esc(p.fotos[0].label)}</span>
          <div class="gal-nav"><button class="gp" aria-label="Anterior">‹</button><button class="gn" aria-label="Siguiente">›</button></div>
        </div>
        <div class="thumbs">
          ${p.fotos.map((f, j) => `<button class="${j===0?"on":""}" data-j="${j}" aria-label="${esc(f.label)}"><img src="${f.src}" alt="" ${imgAttrs}></button>`).join("")}
        </div>
      </div>
      <div>
        <div class="prop-num rv">${pad(i+1)} / ${pad(PROPIEDADES.length)}</div>
        <h2 class="rv d1">${esc(p.titulo)}</h2>
        <div class="addr rv d1">${p.unidad ? esc(p.unidad) + " · " : ""}${esc(p.barrio)} · CABA</div>
        <p class="desc rv d2">${esc(p.descripcion)}</p>
        ${specs ? `<dl class="specs rv d2">${specs}</dl>` : `<div style="height:34px"></div>`}
        <p class="eyebrow rv" style="margin-bottom:12px">Ubicación</p>
        <div class="map rv">
          <iframe loading="lazy" title="Mapa ${esc(p.titulo)}" referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=${mapQ}&z=16&hl=es&output=embed"></iframe>
        </div>
        <div class="prop-actions rv">
          <a class="btn dark" target="_blank" rel="noopener noreferrer" href="${waSeguro(msgPropiedad(p.titulo + (p.unidad ? " " + p.unidad : "")))}">Consultar por WhatsApp</a>
          <a class="btn" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=${mapQ}">Ver en Google Maps ↗</a>
        </div>
      </div>
    </div>
  </section>`;
}).join("");

/* ---------- GALERÍAS ---------- */
document.querySelectorAll(".gallery").forEach(g => {
  const p = PROPIEDADES[+g.dataset.i];
  const imgs = g.querySelectorAll(".gal-main img"), th = g.querySelectorAll(".thumbs button"), lab = g.querySelector(".gal-label");
  let k = 0;
  const go = j => {
    imgs[k].classList.remove("on"); th[k].classList.remove("on");
    k = (j + imgs.length) % imgs.length;
    imgs[k].classList.add("on"); th[k].classList.add("on"); lab.textContent = p.fotos[k].label;
  };
  g.querySelector(".gp").onclick = e => { e.stopPropagation(); go(k - 1); };
  g.querySelector(".gn").onclick = e => { e.stopPropagation(); go(k + 1); };
  th.forEach(b => b.onclick = () => go(+b.dataset.j));
  // pestañas Fotos / 360
  const showTab = t => {
    g.querySelectorAll(".gal-tabs button").forEach(x => x.classList.toggle("on", x.dataset.t === t));
    const sv = g.querySelector(".pane-sv"), tp = g.querySelector(".pane-tour");
    if (sv) sv.classList.toggle("on", t === "sv");
    if (tp){ tp.classList.toggle("on", t === "tour"); const fr = tp.querySelector("iframe"); if (t === "tour" && !fr.src) fr.src = fr.dataset.src; }
    g.querySelector(".gal-main").style.display = t === "fotos" ? "" : "none";
    g.querySelector(".thumbs").style.display = t === "fotos" ? "" : "none";
  };
  g.querySelectorAll(".gal-tabs button").forEach(t => t.onclick = () => showTab(t.dataset.t));
  if (p.streetView) showTab("sv");
  g.querySelector(".gal-main").onclick = () => openLB(p, k);
  // swipe en celular
  let x0 = null;
  g.querySelector(".gal-main").addEventListener("touchstart", e => x0 = e.touches[0].clientX, {passive:true});
  g.querySelector(".gal-main").addEventListener("touchend", e => {
    if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(k + (dx < 0 ? 1 : -1)); x0 = null;
  });
});

/* ---------- LIGHTBOX ---------- */
const lb = $("#lb"); let lbP = null, lbK = 0;
function openLB(p, k){ lbP = p; lbK = k; showLB(); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
function showLB(){ lb.querySelector("img").src = lbP.fotos[lbK].src; lb.querySelector(".cap").textContent = `${lbP.titulo} — ${lbP.fotos[lbK].label}`; }
function closeLB(){ lb.classList.remove("open"); document.body.style.overflow = ""; }
lb.querySelector(".x").onclick = closeLB;
lb.querySelector(".p").onclick = () => { lbK = (lbK - 1 + lbP.fotos.length) % lbP.fotos.length; showLB(); };
lb.querySelector(".n").onclick = () => { lbK = (lbK + 1) % lbP.fotos.length; showLB(); };
lb.onclick = e => { if (e.target === lb) closeLB(); };
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") lb.querySelector(".p").click();
  if (e.key === "ArrowRight") lb.querySelector(".n").click();
});

/* ---------- NAV ---------- */
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
addEventListener("scroll", onScroll, {passive:true}); onScroll();
$("#burger").onclick = () => { $("#menu").classList.toggle("open"); nav.classList.toggle("menu-open"); };
document.querySelectorAll("#menu a").forEach(a => a.onclick = () => { $("#menu").classList.remove("open"); nav.classList.remove("menu-open"); });

/* ---------- REVEAL ON SCROLL ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ---------- FORMULARIO → WhatsApp ---------- */
$("#f-prop").innerHTML = `<option value="">Seleccioná una propiedad</option>` +
  PROPIEDADES.map(p => { const t = p.titulo + (p.unidad ? " " + p.unidad : ""); return `<option>${esc(t)}</option>`; }).join("");
document.querySelectorAll("[data-consulta]").forEach(a => a.addEventListener("click", () => { $("#f-prop").value = a.dataset.consulta; }));
$("#waLink").href = waSeguro(MSG_GENERAL);
$("#waFloat").href = waSeguro(MSG_GENERAL);
/* Email armado en el navegador (no aparece entero en el código fuente) */
document.querySelectorAll("[data-email]").forEach(el => {
  const m = EMAIL.join("@"); el.textContent = m; if (el.tagName === "A") el.href = "mailto:" + m;
});
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const txt = `Hola ${ASESOR}, te escribo desde la web de Amares S.A. Soy ${$("#f-name").value} (${$("#f-mail").value}${$("#f-tel").value ? ", tel. " + $("#f-tel").value : ""}). ` +
              `Me interesa: ${$("#f-prop").value || "los departamentos"}. ${$("#f-msg").value}`;
  // Se arma con DOM (nada de innerHTML con texto del usuario)
  const msg = $("#formMsg"); msg.textContent = "Abriendo WhatsApp… Si no se abre, ";
  const a = document.createElement("a");
  a.href = waSeguro(txt); a.target = "_blank"; a.rel = "noopener noreferrer";
  a.style.textDecoration = "underline"; a.textContent = "tocá acá"; msg.append(a, ".");
  window.open(waSeguro(txt), "_blank", "noopener,noreferrer");
});

$("#year").textContent = new Date().getFullYear();
