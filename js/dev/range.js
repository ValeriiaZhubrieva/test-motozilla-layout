import { i as initialize } from "./nouislider.min.js";
function rangeInit() {
  const rangePriceSlider = document.querySelectorAll("[data-fls-range]");
  if (rangePriceSlider.length) {
    rangePriceSlider.forEach((range) => {
      let minValue = parseInt(range.getAttribute("data-min"), 10);
      let maxValue = parseInt(range.getAttribute("data-max"), 10);
      initialize(range, {
        start: [minValue, maxValue],
        // [0,200000]
        connect: true,
        range: {
          min: minValue,
          max: maxValue
        },
        format: {
          to: (value) => Math.round(value),
          from: (value) => Math.round(value)
        }
      });
      const startValue = range.parentElement.querySelector("[data-start-value]");
      const endValue = range.parentElement.querySelector("[data-end-value]");
      const inputs = [startValue, endValue];
      if (startValue && endValue) {
        let setValues = function() {
          let rankStartValue = parseInt(startValue.value, 10) || minValue;
          let rankEndValue = parseInt(endValue.value, 10) || maxValue;
          rankStartValue = Math.max(minValue, Math.min(rankStartValue, maxValue));
          rankEndValue = Math.max(minValue, Math.min(rankEndValue, maxValue));
          range.noUiSlider.set([rankStartValue, rankEndValue]);
        };
        range.noUiSlider.on("update", function(values, handle) {
          inputs[handle].value = values[handle];
        });
        startValue.addEventListener("change", setValues);
        endValue.addEventListener("change", setValues);
      }
    });
  }
}
document.querySelector("[data-fls-range]") ? window.addEventListener("load", rangeInit) : null;
