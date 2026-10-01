if (document.querySelector("[data-user-info-block]")) {
  document.querySelectorAll("[data-user-info-block]").forEach((block) => {
    const editBtn = block.querySelector('[data-user-info="edit"]');
    const saveBtn = block.querySelector('[data-user-info="save"]');
    const itemsWrap = block.querySelector("[data-user-info-value]");
    const inputsWrap = block.querySelector("[data-user-info-fields]");
    if (!editBtn || !saveBtn || !itemsWrap || !inputsWrap) return;
    function setPhoneValue(input, rawValue) {
      let digits = rawValue.replace(/\D/g, "");
      if (digits.startsWith("38")) {
        digits = digits.slice(2);
      }
      if (digits.startsWith("0")) {
        digits = digits.slice(1);
      }
      if (input.inputmask) {
        input.inputmask.setValue(digits);
      } else {
        input.value = digits;
      }
    }
    function getPhoneValue(input) {
      return input.inputmask ? input.value : input.value;
    }
    editBtn.addEventListener("click", () => {
      itemsWrap.querySelectorAll("[data-field]").forEach((valueEl) => {
        const key = valueEl.dataset.field;
        const field = inputsWrap.querySelector(`[data-field="${key}"]`);
        if (!field) return;
        const value = valueEl.textContent.trim();
        if (field.tagName === "SELECT") {
          const option = [...field.options].find((opt) => opt.textContent.trim() === value);
          field.value = option ? option.value : "";
        } else if (key === "phone") {
          setPhoneValue(field, value === "Не заповнено" ? "" : value);
        } else {
          field.value = value === "Не заповнено" ? "" : value;
        }
      });
      itemsWrap.hidden = true;
      inputsWrap.hidden = false;
      editBtn.hidden = true;
      saveBtn.hidden = false;
    });
    saveBtn.addEventListener("click", () => {
      inputsWrap.querySelectorAll("[data-field]").forEach((field) => {
        const key = field.dataset.field;
        const valueEl = itemsWrap.querySelector(`[data-field="${key}"]`);
        if (!valueEl) return;
        if (field.tagName === "SELECT") {
          const selectedOption = field.options[field.selectedIndex];
          valueEl.textContent = selectedOption && selectedOption.value ? selectedOption.textContent.trim() : "Не обрано";
        } else if (key === "phone") {
          const val = getPhoneValue(field).trim();
          valueEl.textContent = val || "Не заповнено";
        } else {
          valueEl.textContent = field.value.trim() || "Не заповнено";
        }
      });
      itemsWrap.hidden = false;
      inputsWrap.hidden = true;
      saveBtn.hidden = true;
      editBtn.hidden = false;
    });
  });
}
function initAddressForm() {
  const containerSelector = "[data-address-container]";
  const formSelector = "[data-address-form]";
  const openSelector = "[data-address-open]";
  const typeSelector = "[data-address-type]";
  const contentSelector = "[data-address-content]";
  const cancelSelector = "[data-address-cancel]";
  const OPENED_ATTR = "data-address-opened";
  const ACTIVE_ATTR = "data-address-active";
  function getForm(element) {
    var _a;
    return (_a = element == null ? void 0 : element.closest(containerSelector)) == null ? void 0 : _a.querySelector(formSelector);
  }
  function setAddressType(form, type) {
    if (!form || !type) return;
    const contents = form.querySelectorAll(contentSelector);
    if (!contents.length) return;
    contents.forEach((content) => {
      const isActive = content.dataset.addressContent === type;
      if (isActive) {
        content.setAttribute(ACTIVE_ATTR, "");
      } else {
        content.removeAttribute(ACTIVE_ATTR);
      }
    });
  }
  function getFirstType(form) {
    return form.querySelector(typeSelector);
  }
  function openForm(form) {
    if (!form) return;
    const container = form.closest(containerSelector);
    if (!container) return;
    container.setAttribute(OPENED_ATTR, "");
    const firstType = getFirstType(form);
    if (!firstType) return;
    firstType.checked = true;
    setAddressType(form, firstType.dataset.addressType);
  }
  function closeForm(form) {
    if (!form) return;
    const container = form.closest(containerSelector);
    if (!container) return;
    container.removeAttribute(OPENED_ATTR);
    form.querySelectorAll(contentSelector).forEach((content) => {
      content.removeAttribute(ACTIVE_ATTR);
    });
    form.querySelectorAll(typeSelector).forEach((input) => {
      input.checked = false;
    });
  }
  document.addEventListener("click", (event) => {
    const openButton = event.target.closest(openSelector);
    if (openButton) {
      const form = getForm(openButton);
      if (!form) return;
      openForm(form);
      return;
    }
    const cancelButton = event.target.closest(cancelSelector);
    if (cancelButton) {
      const form = cancelButton.closest(formSelector);
      if (!form) return;
      closeForm(form);
      return;
    }
    const typeInput = event.target.closest(typeSelector);
    if (typeInput) {
      const form = typeInput.closest(formSelector);
      if (!form) return;
      setAddressType(form, typeInput.dataset.addressType);
    }
  });
}
initAddressForm();
function commentsUserAccordion() {
  const container = document.querySelector("[data-comments-user]");
  if (!container) return;
  const items = container.querySelectorAll("[data-comments-user-item]");
  if (!items.length) return;
  const speed = 300;
  items.forEach((item) => {
    const toggle = item.querySelector("[data-comments-user-toggle]");
    const inner = item.querySelector("[data-comments-user-inner]");
    if (!toggle || !inner) return;
    inner.style.display = "none";
    toggle.classList.remove("--active");
    toggle.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      onToggleClick(item, toggle, inner);
    });
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest("a")) return;
        e.preventDefault();
        onToggleClick(item, toggle, inner);
      }
    });
  });
  function onToggleClick(currentItem, currentToggle, currentInner) {
    const isActive = currentToggle.classList.contains("--active");
    items.forEach((item) => {
      if (item === currentItem) return;
      const toggle = item.querySelector("[data-comments-user-toggle]");
      const inner = item.querySelector("[data-comments-user-inner]");
      if (toggle && toggle.classList.contains("--active")) {
        toggle.classList.remove("--active");
        slideUp(inner, speed);
      }
    });
    if (isActive) {
      currentToggle.classList.remove("--active");
      slideUp(currentInner, speed);
    } else {
      currentToggle.classList.add("--active");
      slideDown(currentInner, speed);
    }
  }
  function slideUp(target, duration = 300) {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.style.display = "none";
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  }
  function slideDown(target, duration = 300) {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = "block";
    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
    }, duration);
  }
}
window.addEventListener("load", commentsUserAccordion);
