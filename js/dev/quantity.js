function formQuantity() {
  document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll("[data-fls-quantity]");
    containers.forEach((container) => {
      const valueElement = container.querySelector("[data-fls-quantity-value]");
      if (valueElement) {
        updateMinusButtonState(container, valueElement.value);
      }
    });
  });
  document.addEventListener("click", quantityActions);
  document.addEventListener("input", quantityActions);
  document.addEventListener("blur", quantityActions);
  function updateMinusButtonState(container, value) {
    const minusButton = container.querySelector("[data-fls-quantity-minus]");
    if (!minusButton) return;
    const parsedValue = parseInt(value) || 1;
    if (parsedValue <= 1) {
      minusButton.classList.add("disabled");
    } else {
      minusButton.classList.remove("disabled");
    }
  }
  function quantityActions(e) {
    const type = e.type;
    const targetElement = e.target;
    const container = targetElement.closest("[data-fls-quantity]");
    if (!container) return;
    const valueElement = container.querySelector("[data-fls-quantity-value]");
    if (!valueElement) return;
    let currentValue = parseInt(valueElement.value) || 1;
    if (type === "click") {
      if (targetElement.closest("[data-fls-quantity-plus]")) {
        currentValue++;
        const max = +valueElement.dataset.flsQuantityMax || Infinity;
        if (currentValue > max) currentValue = max;
      } else if (targetElement.closest("[data-fls-quantity-minus]")) {
        currentValue--;
        const min = +valueElement.dataset.flsQuantityMin || 1;
        if (currentValue < min) currentValue = min;
      }
      valueElement.value = currentValue;
      updateMinusButtonState(container, currentValue);
    } else if (type === "input") {
      let newValue = valueElement.value.replace(/\D/g, "");
      newValue = newValue === "" ? "1" : newValue;
      currentValue = parseInt(newValue) || 1;
      const max = +valueElement.dataset.flsQuantityMax || Infinity;
      const min = +valueElement.dataset.flsQuantityMin || 1;
      if (currentValue > max) currentValue = max;
      if (currentValue < min) currentValue = min;
      valueElement.value = currentValue;
      updateMinusButtonState(container, currentValue);
    } else if (type === "blur") {
      let newValue = valueElement.value.replace(/\D/g, "");
      currentValue = parseInt(newValue) || 1;
      const max = +valueElement.dataset.flsQuantityMax || Infinity;
      const min = +valueElement.dataset.flsQuantityMin || 1;
      if (currentValue > max) currentValue = max;
      if (currentValue < min) currentValue = min;
      valueElement.value = currentValue;
      updateMinusButtonState(container, currentValue);
    }
  }
}
document.querySelector("[data-fls-quantity]") ? window.addEventListener("load", formQuantity) : null;
