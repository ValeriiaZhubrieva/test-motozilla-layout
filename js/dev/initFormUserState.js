function initFormUserState({ defaultState = "new", user = null, onLogout = null } = {}) {
  /*!
   * Состояние пользователя в checkout
   *
   * Состояния:
   * [data-form-user-state="new"]
   * [data-form-user-state="registered"]
   * [data-form-user-state="authorized"]
   *
   * Переключатели:
   * [data-form-user="new"]
   * [data-form-user="registered"]
   *
   * Контент:
   * [data-form-user-content="new"]
   * [data-form-user-content="registered"]
   *
   * Дополнительно:
   * [data-form-user-exit] — выход из аккаунта
   *
   * Для authorized:
   * - навигация скрывается;
   * - форма нового пользователя показывается;
   * - форма входа скрывается;
   * - кнопка "Вийти" показывается;
   * - данные пользователя заполняются в поля.
   */
  const steps = document.querySelectorAll("[data-form-user-state]");
  if (!steps.length) return;
  steps.forEach((step) => {
    const userNav = step.querySelector("[data-form-user-nav]");
    const userContent = step.querySelector("[data-form-user-content='new']");
    const loginContent = step.querySelector("[data-form-user-content='registered']");
    const exitButton = step.querySelector("[data-form-user-exit]");
    if (!userContent && !loginContent) return;
    const fillUserData = (data = {}) => {
      if (!userContent) return;
      Object.entries(data).forEach(([name, value]) => {
        if (value === void 0 || value === null) return;
        const fields = userContent.querySelectorAll(`[name="${name}"]`);
        fields.forEach((field) => {
          field.value = value;
          field.dispatchEvent(
            new Event("input", {
              bubbles: true
            })
          );
          field.dispatchEvent(
            new Event("change", {
              bubbles: true
            })
          );
        });
      });
    };
    const setUserState = (state, data = null) => {
      const allowedStates = ["new", "registered", "authorized"];
      if (!allowedStates.includes(state)) {
        state = defaultState;
      }
      const isNew = state === "new";
      const isRegistered = state === "registered";
      const isAuthorized = state === "authorized";
      step.dataset.formUserState = state;
      if (userNav) {
        userNav.hidden = isAuthorized;
        userNav.classList.toggle("is-authorized", isAuthorized);
        userNav.querySelectorAll("[data-form-user]").forEach((button) => {
          const buttonState = button.dataset.formUser;
          const isActive = buttonState === state;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-selected", String(isActive));
        });
      }
      if (userContent) {
        userContent.hidden = !(isNew || isAuthorized);
        userContent.classList.toggle("is-active", isNew || isAuthorized);
        userContent.classList.toggle("is-authorized", isAuthorized);
      }
      if (loginContent) {
        loginContent.hidden = !isRegistered;
        loginContent.classList.toggle("is-active", isRegistered);
      }
      if (exitButton) {
        exitButton.hidden = !isAuthorized;
      }
      if (isAuthorized && data) {
        fillUserData(data);
      }
    };
    userNav == null ? void 0 : userNav.addEventListener("click", (event) => {
      const button = event.target.closest("[data-form-user]");
      if (!button || !userNav.contains(button)) return;
      const state = button.dataset.formUser;
      if (!state) return;
      if (step.dataset.formUserState === state) {
        return;
      }
      setUserState(state);
    });
    exitButton == null ? void 0 : exitButton.addEventListener("click", () => {
      setUserState("registered");
      if (typeof onLogout === "function") {
        onLogout(step);
      }
    });
    let initialState = step.dataset.formUserState;
    if (!["new", "registered", "authorized"].includes(initialState)) {
      initialState = defaultState;
    }
    if (user) {
      initialState = "authorized";
    }
    setUserState(initialState, user);
  });
}
export {
  initFormUserState as i
};
