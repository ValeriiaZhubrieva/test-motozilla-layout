function initFormSteps({
  /*!
   * Универсальный контроллер последовательных шагов формы.
   *
   * HTML:
   * [data-form-steps]
   *   [data-form-step]
   *      [data-form-step-next]
   *      [data-form-step-edit]
   *
   * Состояния:
   * - locked
   * - active
   * - completed
   *
   * Пример:
   *
   * initFormSteps({
   *     validateStep: async ({ step, index }) => {
   *         return true;
   *     },
   * });
   */
  selector = "[data-form-steps]",
  stepSelector = "[data-form-step]",
  nextSelector = "[data-form-step-next]",
  editSelector = "[data-form-step-edit]",
  stateAttribute = "formStepState",
  initialState = "active",
  /**
   * Проверка текущего шага перед завершением.
   *
   * Можно вернуть:
   *
   * true
   * false
   * Promise<boolean>
   *
   * Или:
   *
   * { valid: true }
   * { valid: false }
   */
  validateStep = null,
  /**
   * Вызывается перед изменением активного шага.
   *
   * Если вернуть false — переход отменяется.
   */
  beforeChange = null,
  /**
   * Вызывается после изменения активного шага.
   */
  onChange = null,
  /**
   * Вызывается после успешного завершения шага.
   */
  onComplete = null,
  /**
   * Вызывается при переходе в режим редактирования.
   */
  onEdit = null,
  /**
   * Если true:
   *
   * Редактирование шага автоматически
   * сбрасывает все последующие шаги.
   *
   * По умолчанию false.
   *
   * Для checkout я бы оставил false,
   * если дальнейшие шаги не зависят
   * от изменяемого.
   */
  invalidateFollowingOnEdit = false,
  /**
   * Прокручивать страницу к активному шагу.
   */
  scrollToActive = false,
  scrollBehavior = "smooth",
  /**
   * Отступ сверху при scroll.
   *
   * Например, если есть fixed header:
   *
   * scrollOffset: 100
   */
  scrollOffset = 0
} = {}) {
  const containers = document.querySelectorAll(selector);
  if (!containers.length) return;
  containers.forEach((container) => {
    initStepsContainer(container);
  });
  function initStepsContainer(container) {
    if (container.dataset.formStepsInitialized === "true") {
      return;
    }
    const steps = [...container.querySelectorAll(stepSelector)];
    if (!steps.length) return;
    container.dataset.formStepsInitialized = "true";
    let isProcessing = false;
    function getState(step) {
      var _a;
      return ((_a = step == null ? void 0 : step.dataset) == null ? void 0 : _a[stateAttribute]) || "locked";
    }
    function setState(step, state) {
      if (!step) return;
      if (!["locked", "active", "completed"].includes(state)) {
        return;
      }
      step.dataset[stateAttribute] = state;
      step.classList.toggle("is-active", state === "active");
      step.classList.toggle("is-completed", state === "completed");
      step.classList.toggle("is-locked", state === "locked");
      const content = step.querySelector("[data-form-step-content]");
      if (content) {
        content.hidden = state !== "active";
      }
      const editButton = step.querySelector(editSelector);
      if (editButton) {
        editButton.hidden = state !== "completed";
      }
      const summary = step.querySelector("[data-form-step-summary]");
      if (summary) {
        summary.hidden = state !== "completed";
      }
    }
    function getStepIndex(step) {
      return steps.indexOf(step);
    }
    function getActiveStep() {
      return steps.find((step) => getState(step) === "active") || null;
    }
    function getStepByIndex(index) {
      return steps[index] || null;
    }
    function getStepById(id) {
      if (!id) return null;
      return steps.find((step) => step.dataset.formStepId === id) || null;
    }
    function normalizeValidationResult(result) {
      if (result === void 0) {
        return true;
      }
      if (typeof result === "boolean") {
        return result;
      }
      if (result && typeof result === "object" && "valid" in result) {
        return result.valid === true;
      }
      return Boolean(result);
    }
    function normalizeInitialState() {
      let activeFound = false;
      steps.forEach((step, index) => {
        let state = step.dataset[stateAttribute];
        if (!state) {
          state = index === 0 ? initialState : "locked";
        }
        if (!["locked", "active", "completed"].includes(state)) {
          state = "locked";
        }
        if (state === "active") {
          if (activeFound) {
            state = "locked";
          } else {
            activeFound = true;
          }
        }
        setState(step, state);
      });
      if (!getActiveStep()) {
        const firstAvailable = steps.find((step) => getState(step) !== "completed");
        if (firstAvailable) {
          setState(firstAvailable, "active");
        }
      }
    }
    async function canChangeTo(targetStep, direction = "next") {
      if (!targetStep) return false;
      const activeStep = getActiveStep();
      if (!activeStep) {
        return false;
      }
      if (typeof beforeChange !== "function") {
        return true;
      }
      const result = await beforeChange({
        container,
        steps,
        currentStep: activeStep,
        targetStep,
        currentIndex: getStepIndex(activeStep),
        targetIndex: getStepIndex(targetStep),
        direction
      });
      return normalizeValidationResult(result);
    }
    async function validateCurrentStep(step) {
      if (typeof validateStep !== "function") {
        return true;
      }
      const index = getStepIndex(step);
      const result = await validateStep({
        container,
        steps,
        step,
        index,
        id: step.dataset.formStepId || null
      });
      return normalizeValidationResult(result);
    }
    function invalidateFollowing(index) {
      steps.forEach((step, stepIndex) => {
        if (stepIndex <= index) {
          return;
        }
        delete step.dataset.formStepCompleted;
        delete step.dataset.formStepEditing;
        setState(step, "locked");
      });
    }
    function scrollToStepIfNeeded(step) {
      if (!scrollToActive || !step) {
        return;
      }
      requestAnimationFrame(() => {
        const rect = step.getBoundingClientRect();
        const top = window.scrollY + rect.top - scrollOffset;
        window.scrollTo({
          top,
          behavior: scrollBehavior
        });
      });
    }
    async function activateStep(targetStep, { direction = "manual", skipBeforeChange = false } = {}) {
      if (!targetStep) {
        return false;
      }
      const currentStep = getActiveStep();
      if (currentStep === targetStep) {
        return true;
      }
      if (getState(targetStep) === "locked") {
        return false;
      }
      if (!skipBeforeChange) {
        const allowed = await canChangeTo(targetStep, direction);
        if (!allowed) {
          return false;
        }
      }
      if (currentStep) {
        if (currentStep.dataset.formStepCompleted === "true") {
          setState(currentStep, "completed");
        } else {
          setState(currentStep, "locked");
        }
      }
      setState(targetStep, "active");
      scrollToStepIfNeeded(targetStep);
      if (typeof onChange === "function") {
        onChange({
          container,
          steps,
          step: targetStep,
          index: getStepIndex(targetStep),
          previousStep: currentStep,
          direction,
          edit: false
        });
      }
      return true;
    }
    async function completeStep(step = getActiveStep()) {
      if (!step) {
        return false;
      }
      if (getState(step) !== "active") {
        return false;
      }
      if (isProcessing) {
        return false;
      }
      isProcessing = true;
      try {
        const valid = await validateCurrentStep(step);
        if (!valid) {
          return false;
        }
        step.dataset.formStepCompleted = "true";
        delete step.dataset.formStepEditing;
        setState(step, "completed");
        const currentIndex = getStepIndex(step);
        const nextStep = getStepByIndex(currentIndex + 1);
        if (!nextStep) {
          if (typeof onComplete === "function") {
            await onComplete({
              container,
              steps,
              step,
              index: currentIndex,
              isLast: true,
              nextStep: null,
              nextIndex: null
            });
          }
          return true;
        }
        setState(nextStep, "active");
        steps.forEach((item) => {
          if (item !== nextStep && getState(item) === "active") {
            setState(item, "locked");
          }
        });
        if (typeof onComplete === "function") {
          await onComplete({
            container,
            steps,
            step,
            index: currentIndex,
            nextStep,
            nextIndex: currentIndex + 1,
            isLast: false
          });
        }
        scrollToStepIfNeeded(nextStep);
        if (typeof onChange === "function") {
          await onChange({
            container,
            steps,
            step: nextStep,
            index: currentIndex + 1,
            previousStep: step,
            direction: "next",
            edit: false
          });
        }
        return true;
      } finally {
        isProcessing = false;
      }
    }
    async function editStep(step) {
      if (!step) {
        return false;
      }
      if (getState(step) !== "completed") {
        return false;
      }
      if (isProcessing) {
        return false;
      }
      isProcessing = true;
      try {
        const activeStep = getActiveStep();
        if (activeStep && activeStep !== step) {
          const allowed = await canChangeTo(step, "edit");
          if (!allowed) {
            return false;
          }
        }
        if (activeStep && activeStep !== step) {
          if (activeStep.dataset.formStepCompleted === "true") {
            setState(activeStep, "completed");
          } else {
            setState(activeStep, "locked");
          }
        }
        if (invalidateFollowingOnEdit) {
          invalidateFollowing(getStepIndex(step));
        }
        setState(step, "active");
        step.dataset.formStepEditing = "true";
        if (typeof onEdit === "function") {
          await onEdit({
            container,
            steps,
            step,
            index: getStepIndex(step)
          });
        }
        scrollToStepIfNeeded(step);
        if (typeof onChange === "function") {
          await onChange({
            container,
            steps,
            step,
            index: getStepIndex(step),
            previousStep: activeStep,
            direction: "edit",
            edit: true
          });
        }
        return true;
      } finally {
        isProcessing = false;
      }
    }
    container.formSteps = {
      container,
      steps,
      getActiveStep,
      getStepByIndex,
      getStepById,
      getStepIndex,
      getState,
      setState,
      activateStep,
      completeStep,
      editStep,
      invalidateFollowing
    };
    container.addEventListener("click", async (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const nextButton = target.closest(nextSelector);
      if (nextButton && container.contains(nextButton)) {
        event.preventDefault();
        const step = nextButton.closest(stepSelector);
        if (!step || getState(step) !== "active") {
          return;
        }
        await completeStep(step);
        return;
      }
      const editButton = target.closest(editSelector);
      if (editButton && container.contains(editButton)) {
        event.preventDefault();
        const step = editButton.closest(stepSelector);
        if (!step) return;
        await editStep(step);
      }
    });
    normalizeInitialState();
  }
}
export {
  initFormSteps as i
};
