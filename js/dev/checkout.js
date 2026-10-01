import { i as initFormSteps } from "./initFormSteps.min.js";
import { i as initFormUserState } from "./initFormUserState.min.js";
initFormSteps({
  validateStep: async ({ step, id }) => {
    switch (id) {
      case "personal":
        return step;
      /*!
      return validatePersonalStep(step);
      */
      case "delivery":
        return step;
      /*!
      return validateDeliveryStep(step);
      */
      case "payment":
        return step;
      /*!
      return validatePaymentStep(step);
      */
      default:
        return true;
    }
  },
  onComplete: ({ step, nextStep, isLast }) => {
    /*!
    // сохранение данных шага
    */
  },
  scrollToActive: true,
  scrollOffset: 100
});
initFormUserState({
  /*!
  // user: {
  //     firstname: "Олександр",
  //     lastname: "Марчук",
  //     phone: "+380 93 555 66 77",
  //     email: "example@gmail.com",
  // },
  */
  onLogout: () => {
    console.log("Пользователь вышел из аккаунта");
    /*!
    // Здесь потом:
    // API logout
    // очистка токена
    // обновление состояния аккаунта
    */
  }
});
window.initCheckboxToggle = function() {
  const SELECTOR = "[data-target-form]";
  const CLASS_NAME = "is-active";
  const applyState = (checkbox) => {
    const targetSelector = checkbox.dataset.targetForm;
    if (!targetSelector) return;
    const targets = document.querySelectorAll(`[data-form-target="${targetSelector}"]`);
    if (!targets.length) return;
    targets.forEach((el) => {
      el.classList.toggle(CLASS_NAME, checkbox.checked);
    });
  };
  document.querySelectorAll(SELECTOR).forEach(applyState);
  document.addEventListener("change", (e) => {
    const checkbox = e.target.closest(SELECTOR);
    if (!checkbox) return;
    applyState(checkbox);
  });
};
initCheckboxToggle();
/*!
 * Активный способ оплаты/доставки
 *
 * HTML:
 * [data-options-block]        — блок
 * [data-options-block-item]   — отдельный вариант
 * [data-options-block-input]  — radio input
 *
 * Состояние:
 * .is-active — выбранный вариант доставки
 */
function initOptionsBlock() {
  const optionsBlocks = document.querySelectorAll("[data-options-block]");
  if (!optionsBlocks.length) return;
  function updateOptionsBlock(block) {
    const items = block.querySelectorAll("[data-options-block-item]");
    items.forEach((item) => {
      const input = item.querySelector("[data-options-block-input]");
      if (!input) return;
      item.classList.toggle("is-active", input.checked);
    });
  }
  optionsBlocks.forEach((block) => {
    updateOptionsBlock(block);
    block.addEventListener("change", (event) => {
      const input = event.target.closest("[data-options-block-input]");
      if (!input) return;
      updateOptionsBlock(block);
    });
  });
}
initOptionsBlock();
/*!
 * Переключение новой / сохраненной адреси
 *
 * [data-address-options]       — контейнер вариантов адреси
 * [data-address-option="new"]  — новая адреса
 * [data-address-option="saved"] — готовая адреса
 * [data-address-form]          — форма заполнения новой адреси
 *
 * Логика:
 * - выбрана "new" → форма показывается
 * - выбрана "saved" → форма скрывается
 */
function initAddressOptions() {
  const blocks = document.querySelectorAll("[data-address-options]");
  if (!blocks.length) return;
  blocks.forEach((block) => {
    var _a;
    const form = (_a = block.parentElement) == null ? void 0 : _a.querySelector("[data-address-form]");
    if (!form) return;
    const update = () => {
      const checked = block.querySelector("[data-address-option]:checked");
      const isNewAddress = (checked == null ? void 0 : checked.dataset.addressOption) === "new";
      form.hidden = !isNewAddress;
      form.classList.toggle("is-active", isNewAddress);
    };
    block.addEventListener("change", (event) => {
      if (!event.target.matches("[data-address-option]")) return;
      update();
    });
    update();
  });
}
initAddressOptions();
