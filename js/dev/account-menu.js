(function() {
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  ready(function() {
    var account = document.querySelector("[data-account]");
    if (!account) return;
    var toggle = account.querySelector("[data-account-toggle]");
    var drop = account.querySelector(".account-drop");
    if (!toggle || !drop) return;
    function open() {
      drop.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function close() {
      drop.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    function toggleDrop() {
      if (drop.classList.contains("is-open")) {
        close();
      } else {
        open();
      }
    }
    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleDrop();
    });
    document.addEventListener("click", function(e) {
      if (!account.contains(e.target)) {
        close();
      }
    });
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        close();
      }
    });
    document.addEventListener("account:close-dropdown", close);
  });
})();
