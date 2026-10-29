// Langue du site (FR / EN), commune à toutes les pages : ?lang=, sinon choix mémorisé, sinon langue du navigateur.
(function () {
  var root = document.documentElement, saved = null;
  try { saved = localStorage.getItem("lm_lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var l = q === "fr" || q === "en" ? q : (saved || ((navigator.language || "en").toLowerCase().indexOf("fr") === 0 ? "fr" : "en"));
  function set(v) {
    root.dataset.l = v; root.lang = v;
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === v ? "true" : "false"); });
    try { localStorage.setItem("lm_lang", v); } catch (e) {}
    document.dispatchEvent(new CustomEvent("lm-lang", { detail: v }));
  }
  document.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { set(b.dataset.l); }); });
  set(l);
})();
