(function () {
  var key = "gedep.diagnostics.errors";
  function read() { try { return JSON.parse(sessionStorage.getItem(key) || "[]"); } catch (_) { return []; } }
  function save(item) { try { var errors = read(); errors.push(item); sessionStorage.setItem(key, JSON.stringify(errors.slice(-100))); } catch (_) {} }
  function record(event) {
    var target = event.target;
    var source = target && (target.src || target.href);
    save({ at: new Date().toISOString(), type: source ? "resource" : "javascript", message: event.message || ("Falha ao carregar recurso: " + (source || "desconhecido")), source: source || event.filename, line: event.lineno, column: event.colno, userAgent: navigator.userAgent, url: location.href });
  }
  window.addEventListener("error", record, true);
  window.addEventListener("unhandledrejection", function (event) { save({ at: new Date().toISOString(), type: "promise", message: String(event.reason), userAgent: navigator.userAgent, url: location.href }); });
})();
