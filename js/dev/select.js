import { T as TomSelect } from "./tom-select.min.js";
if (document.querySelector("[data-fls-select]")) {
  document.querySelectorAll("select[data-fls-select]:not([data-fls-select='search'])").forEach((el) => {
    new TomSelect(el, {
      controlInput: null,
      create: false,
      onInitialize() {
        this.control.dataset.placeholder = el.getAttribute("placeholder") || "";
      }
    });
  });
  document.querySelectorAll("select[data-fls-select='search']").forEach((el) => {
    new TomSelect(el, {
      valueField: "ref",
      labelField: "label",
      searchField: [],
      score: () => () => 1,
      maxOptions: 50,
      preload: "focus",
      loadThrottle: 300
    });
  });
}
