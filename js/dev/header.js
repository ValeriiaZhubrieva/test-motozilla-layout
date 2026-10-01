import { i as isMobile } from "./common.min.js";
window.enableFocusTrap = function(menu, { openClass = "is-open" } = {}) {
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])';
  const guardStart = document.createElement("span");
  const guardEnd = document.createElement("span");
  guardStart.tabIndex = 0;
  guardEnd.tabIndex = 0;
  guardStart.className = "focus-guard";
  guardEnd.className = "focus-guard";
  guardStart.setAttribute("aria-hidden", "true");
  guardEnd.setAttribute("aria-hidden", "true");
  menu.prepend(guardStart);
  menu.append(guardEnd);
  const getFocusable = () => Array.from(menu.querySelectorAll(focusableSelector)).filter((el) => {
    const style = window.getComputedStyle(el);
    const notHidden = style.visibility !== "hidden" && style.display !== "none";
    const rect = typeof el.getBoundingClientRect === "function" ? el.getBoundingClientRect() : { width: 1, height: 1 };
    const hasSize = rect.width > 0 && rect.height > 0;
    return notHidden && hasSize && !el.hasAttribute("disabled");
  });
  function handleGuardFocus(e) {
    const focusable = getFocusable();
    if (!focusable.length) return;
    if (e.target === guardStart) {
      focusable[focusable.length - 1].focus();
    } else {
      focusable[0].focus();
    }
  }
  guardStart.addEventListener("focus", handleGuardFocus);
  guardEnd.addEventListener("focus", handleGuardFocus);
  function onKeydown(e) {
    if (e.key !== "Tab") return;
    if (!menu.classList.contains(openClass)) return;
    const isInside = menu.contains(document.activeElement);
    const focusable = getFocusable();
    if (!focusable.length) {
      e.preventDefault();
      return;
    }
    if (!isInside) {
      e.preventDefault();
      (e.shiftKey ? focusable[focusable.length - 1] : focusable[0]).focus();
      return;
    }
  }
  document.addEventListener("keydown", onKeydown, true);
  return function cleanup() {
    document.removeEventListener("keydown", onKeydown, true);
    guardStart.removeEventListener("focus", handleGuardFocus);
    guardEnd.removeEventListener("focus", handleGuardFocus);
    guardStart.remove();
    guardEnd.remove();
  };
};
window.initMenu = function() {
  const activeClass = "is-open";
  const activeBtnClass = "is-active";
  const html = document.documentElement;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  let removeTrap = null;
  let lastActiveButton = null;
  let focusReturnNeeded = false;
  let overlay = null;
  function createOverlay() {
    overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", closeAllMenus);
  }
  createOverlay();
  function closeAllMenus() {
    document.querySelectorAll("[data-menu-target]." + activeClass).forEach((menu) => {
      menu.classList.remove(activeClass);
    });
    document.querySelectorAll("[data-menu]." + activeBtnClass).forEach((btn) => {
      btn.classList.remove(activeBtnClass);
    });
    html.classList.remove("menu-open");
    html.classList.forEach((cls) => {
      if (cls.startsWith("menu-open--")) {
        setTimeout(() => {
          html.classList.remove(cls);
        }, 300);
      }
    });
    if (removeTrap) {
      removeTrap();
      removeTrap = null;
    }
    if (focusReturnNeeded && lastActiveButton) {
      lastActiveButton.focus();
    }
    lastActiveButton = null;
    focusReturnNeeded = false;
  }
  function openMenu(menuName, { withFocusReturn = true } = {}) {
    closeAllMenus();
    const menu = document.querySelector(`[data-menu-target="${menuName}"]`);
    const buttons = document.querySelectorAll(`[data-menu="${menuName}"]`);
    if (menu && buttons.length) {
      const menuBlockRect = menu.parentElement.getBoundingClientRect();
      focusReturnNeeded = withFocusReturn;
      buttons.forEach((btn) => {
        btn.classList.add(activeBtnClass);
        lastActiveButton = btn;
      });
      menu.classList.add(activeClass);
      html.classList.add("menu-open");
      html.classList.add(`menu-open--${menuName}`);
      menu.style.setProperty("--menu-height", `${window.innerHeight - menuBlockRect.bottom}px`);
      removeTrap = enableFocusTrap(menu, { openClass: "is-open" });
    }
  }
  function toggleMenu(menuName) {
    const menu = document.querySelector(`[data-menu-target="${menuName}"]`);
    const isOpen = menu == null ? void 0 : menu.classList.contains(activeClass);
    if (isOpen) {
      closeAllMenus();
    } else {
      openMenu(menuName);
    }
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllMenus();
    }
  });
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "data-fls-popup-open") {
        if (html.hasAttribute("data-fls-popup-open")) {
          closeAllMenus();
        }
      }
    }
  });
  observer.observe(html, { attributes: true });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-menu]");
    const isInsideMenu = e.target.closest("[data-menu-target]." + activeClass);
    if (btn) {
      if (btn.hasAttribute("data-menu-click") || isTouch && isMobile.any()) {
        e.preventDefault();
      }
      const menuName = btn.dataset.menu;
      toggleMenu(menuName);
    } else if (!isInsideMenu) {
      closeAllMenus();
    }
  });
  document.querySelectorAll("[data-menu-close]").forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeAllMenus();
    });
  });
  if (!isTouch && !isMobile.any()) {
    let getSlope = function(a, b) {
      return (b.y - a.y) / (b.x - a.x);
    }, isMovingToMenu = function(menu) {
      if (mouseLocs.length < 2) return false;
      const loc = mouseLocs[mouseLocs.length - 1];
      const prevLoc = mouseLocs[0];
      const rect = menu.getBoundingClientRect();
      const upperLeft = { x: rect.left, y: rect.top };
      ({ x: rect.right, y: rect.top });
      const lowerLeft = { x: rect.left, y: rect.bottom };
      ({ x: rect.right, y: rect.bottom });
      const decreasingSlope = getSlope(loc, upperLeft);
      const increasingSlope = getSlope(loc, lowerLeft);
      const prevDecreasingSlope = getSlope(prevLoc, upperLeft);
      const prevIncreasingSlope = getSlope(prevLoc, lowerLeft);
      return decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope;
    };
    const MOUSE_LOCS_TRACKED = 5;
    const DELAY = 300;
    let mouseLocs = [];
    document.addEventListener("mousemove", (e) => {
      mouseLocs.push({ x: e.pageX, y: e.pageY });
      if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
        mouseLocs.shift();
      }
    });
    document.querySelectorAll("[data-menu]").forEach((button) => {
      if (button.hasAttribute("data-menu-click")) return;
      const menuName = button.dataset.menu;
      const menu = document.querySelector(`[data-menu-target="${menuName}"]`);
      if (!menu) return;
      let timeoutId = null;
      const possiblyActivate = () => {
        clearTimeout(timeoutId);
        if (isMovingToMenu(menu)) {
          timeoutId = setTimeout(possiblyActivate, DELAY);
        } else {
          openMenu(menuName, { withFocusReturn: false });
        }
      };
      button.addEventListener("mouseenter", () => {
        possiblyActivate();
      });
      button.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
          closeAllMenus();
        }, DELAY);
      });
      menu.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
      });
      menu.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => {
          closeAllMenus();
        }, DELAY);
      });
    });
  }
  window.menuAPI ?? (window.menuAPI = {});
  Object.assign(window.menuAPI, {
    close: closeAllMenus,
    open: openMenu,
    toggle: toggleMenu
  });
};
document.addEventListener("DOMContentLoaded", window.initMenu);
window.initSubmenu = function() {
  var _a, _b;
  const ACTIVE_CLASS = "is-open";
  const ACTIVE_BUTTON_CLASS = "is-active";
  const ACTIVE_LEVEL_CLASS = "is-active";
  const html = document.documentElement;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobile2 = ((_b = (_a = window.isMobile) == null ? void 0 : _a.any) == null ? void 0 : _b.call(_a)) || false;
  const submenuInstances = /* @__PURE__ */ new Set();
  if (!window.__submenuGlobalInit) {
    window.__submenuGlobalInit = true;
    document.addEventListener("click", (e) => {
      submenuInstances.forEach((instance) => {
        if (!instance.root.contains(e.target)) {
          instance.closeAll();
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      submenuInstances.forEach((instance) => instance.closeAll());
    });
  }
  class Submenu {
    constructor(root) {
      this.root = root;
      this.openedLevels = /* @__PURE__ */ new Map();
      this.listeners = [];
      this.hoverTimer = null;
      this.closeTimer = null;
      this._moveTimer = null;
      this._pointerLeaveTimer = null;
      this._pointerHandler = null;
      this._lastX = 0;
      this._lastY = 0;
      this.CLOSE_DELAY = 250;
      this.OPEN_DELAY = 60;
      this.structure = /* @__PURE__ */ new Map();
      this.levels = [];
      this.panels = /* @__PURE__ */ new Map();
      this.currentPointerLevel = 1;
      this.isHovering = false;
      this.pendingOpenId = null;
      this.init();
      submenuInstances.add(this);
    }
    init() {
      this.parseLevels();
      this.parsePanels();
      this.buildStructure();
      this.bindEvents();
      this.initAccessibility();
    }
    addListener(target, type, handler, options) {
      target.addEventListener(type, handler, options);
      this.listeners.push({ target, type, handler, options });
    }
    getPanel(id) {
      return this.panels.get(id) || null;
    }
    getCurrentLevelByPanel(panel) {
      const levelWrap = panel.closest("[data-submenu-level]");
      if (!levelWrap) return 1;
      return Number(levelWrap.dataset.submenuLevelIndex || 1);
    }
    parseLevels() {
      this.levels = [...this.root.querySelectorAll("[data-submenu-level]")];
      this.levels.forEach((level, index) => {
        level.dataset.submenuLevelIndex = index + 1;
      });
    }
    parsePanels() {
      const panels = [...this.root.querySelectorAll("[data-submenu-panel]")];
      panels.forEach((panel) => {
        const id = panel.dataset.submenuPanel;
        if (!id) return;
        this.panels.set(id, panel);
      });
    }
    buildStructure() {
      const rootButtons = [...this.root.children[0].querySelectorAll("[data-submenu-id]")];
      rootButtons.forEach((btn) => {
        const id = btn.dataset.submenuId;
        const panel = this.getPanel(id);
        if (!panel) return;
        btn.dataset.submenuLevel = 1;
        this.structure.set(id, {
          id,
          level: 1,
          parent: null,
          button: btn,
          panel,
          title: btn.textContent.trim(),
          clickOnly: btn.hasAttribute("data-submenu-click")
        });
      });
      this.panels.forEach((panel, parentId) => {
        const level = this.getCurrentLevelByPanel(panel);
        const nestedButtons = [...panel.querySelectorAll("[data-submenu-id]")].filter(
          (btn) => btn.closest("[data-submenu-panel]") === panel
        );
        nestedButtons.forEach((btn) => {
          const id = btn.dataset.submenuId;
          const childPanel = this.getPanel(id);
          if (!childPanel) return;
          const nextLevel = level + 1;
          btn.dataset.submenuParent = parentId;
          btn.dataset.submenuLevel = nextLevel;
          childPanel.dataset.submenuParent = parentId;
          this.structure.set(id, {
            id,
            level: nextLevel,
            parent: parentId,
            button: btn,
            panel: childPanel,
            title: btn.textContent.trim(),
            clickOnly: btn.hasAttribute("data-submenu-click")
          });
        });
      });
    }
    initAccessibility() {
      this.structure.forEach((item) => {
        item.button.setAttribute("aria-expanded", "false");
        item.panel.setAttribute("aria-hidden", "true");
        item.panel.inert = true;
      });
    }
    getLevelOfElement(el) {
      if (!el) return null;
      const button = el.closest("[data-submenu-id]");
      if (button) {
        const item = this.structure.get(button.dataset.submenuId);
        if (item) return item.level;
      }
      const panel = el.closest("[data-submenu-panel]");
      if (panel) {
        return this.getCurrentLevelByPanel(panel);
      }
      return null;
    }
    bindEvents() {
      this.addListener(this.root, "click", (e) => {
        const btn = e.target.closest("[data-submenu-id]");
        const closeBtn = e.target.closest("[data-submenu-back]");
        const closeAllBtn = e.target.closest("[data-submenu-close]");
        if (btn && this.root.contains(btn)) {
          const id = btn.dataset.submenuId;
          const item = this.structure.get(id);
          if (!item) return;
          e.preventDefault();
          const isOpened = this.openedLevels.get(item.level) === id;
          if (isOpened) {
            this.closeLevel(item.level);
          } else {
            if (this.pendingOpenId) {
              clearTimeout(this.hoverTimer);
              this.pendingOpenId = null;
            }
            this.open(id);
          }
          return;
        }
        if (closeBtn) {
          e.preventDefault();
          const levelWrap = closeBtn.closest("[data-submenu-level]");
          if (!levelWrap) return;
          const level = Number(levelWrap.dataset.submenuLevelIndex);
          this.closeLevel(level);
          return;
        }
        if (closeAllBtn) {
          e.preventDefault();
          this.closeAll();
        }
      });
      if (!isTouch && !isMobile2) {
        this.structure.forEach((item) => {
          const { button, panel, id, level, clickOnly } = item;
          if (clickOnly) return;
          const onEnter = () => {
            clearTimeout(this.closeTimer);
            clearTimeout(this._pointerLeaveTimer);
            if (this.pendingOpenId && this.pendingOpenId !== id) {
              clearTimeout(this.hoverTimer);
              this.pendingOpenId = null;
            }
            const currentId = this.openedLevels.get(level);
            if (currentId !== id) {
              if (this.hoverTimer) clearTimeout(this.hoverTimer);
              this.hoverTimer = setTimeout(() => {
                this.open(id);
                this.pendingOpenId = null;
              }, this.OPEN_DELAY);
              this.pendingOpenId = id;
            }
          };
          const onLeave = (e) => {
            if (this.pendingOpenId === id) {
              clearTimeout(this.hoverTimer);
              this.pendingOpenId = null;
            }
            this.handlePointerLeave(level, e);
          };
          this.addListener(button, "mouseenter", onEnter);
          this.addListener(button, "mouseleave", onLeave);
          this.addListener(panel, "mouseenter", () => {
            clearTimeout(this.closeTimer);
            clearTimeout(this._pointerLeaveTimer);
            if (this.pendingOpenId === id) {
              clearTimeout(this.hoverTimer);
              this.pendingOpenId = null;
              this.open(id);
            }
          });
          this.addListener(panel, "mouseleave", (e) => {
            this.handlePointerLeave(level, e);
          });
        });
        this.addListener(this.root, "mousemove", (e) => {
          this._lastX = e.clientX;
          this._lastY = e.clientY;
          const target = e.target;
          const targetLevel = this.getLevelOfElement(target);
          if (targetLevel !== null && this.openedLevels.size > 0) {
            const maxOpenedLevel = Math.max(...this.openedLevels.keys());
            if (targetLevel < maxOpenedLevel) {
              clearTimeout(this._moveTimer);
              this._moveTimer = setTimeout(() => {
                const maxNow = this.openedLevels.size ? Math.max(...this.openedLevels.keys()) : 0;
                if (targetLevel < maxNow) {
                  this.closeLevelsAfter(targetLevel);
                }
              }, 80);
            } else {
              clearTimeout(this._moveTimer);
            }
          }
        });
        this.addListener(this.root, "mouseleave", (e) => {
          const related = e.relatedTarget;
          if (!related || !this.root.contains(related)) {
            if (this.pendingOpenId) {
              clearTimeout(this.hoverTimer);
              this.pendingOpenId = null;
            }
            this._startPointerTracking();
          }
        });
      }
    }
    _startPointerTracking() {
      if (this._pointerHandler) return;
      this._pointerHandler = (e) => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el || !this.root.contains(el)) {
          clearTimeout(this._pointerLeaveTimer);
          this._pointerLeaveTimer = setTimeout(() => {
            this.closeAll();
          }, this.CLOSE_DELAY);
        } else {
          clearTimeout(this._pointerLeaveTimer);
          this._stopPointerTracking();
        }
      };
      document.addEventListener("pointermove", this._pointerHandler, { passive: true });
    }
    _stopPointerTracking() {
      if (!this._pointerHandler) return;
      document.removeEventListener("pointermove", this._pointerHandler);
      this._pointerHandler = null;
    }
    updateLevelTitle(level, title) {
      const levelWrap = this.levels[level - 1];
      if (!levelWrap) return;
      const titleEl = levelWrap.querySelector("[data-submenu-title]");
      if (titleEl) titleEl.textContent = title;
    }
    updateLevelStates() {
      this.levels.forEach((level) => {
        const hasActive = level.querySelector(`.${ACTIVE_CLASS}`);
        level.classList.toggle(ACTIVE_LEVEL_CLASS, !!hasActive);
      });
    }
    handlePointerLeave(level, e) {
      clearTimeout(this.closeTimer);
      const related = e.relatedTarget;
      if (!related) {
        this._startPointerTracking();
        return;
      }
      if (!this.root.contains(related)) {
        this._startPointerTracking();
        return;
      }
      this.closeTimer = setTimeout(() => {
        const currentId = this.openedLevels.get(level);
        if (!currentId) return;
        const item = this.structure.get(currentId);
        if (!item) return;
        let isInside = false;
        let checkElement = related;
        while (checkElement && checkElement !== this.root) {
          if (checkElement === item.button || checkElement === item.panel) {
            isInside = true;
            break;
          }
          if (checkElement.closest && checkElement.closest("[data-submenu-panel]") === item.panel) {
            isInside = true;
            break;
          }
          checkElement = checkElement.parentElement;
        }
        if (isInside) return;
        const targetLevel = this.getLevelOfElement(related);
        if (targetLevel !== null && targetLevel < level) {
          this.closeLevelsAfter(targetLevel);
        } else if (targetLevel === null || targetLevel < level) {
          this.closeLevelsAfter(level - 1);
        }
      }, this.CLOSE_DELAY);
    }
    open(id) {
      clearTimeout(this.hoverTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this._pointerLeaveTimer);
      this._stopPointerTracking();
      this.pendingOpenId = null;
      const item = this.structure.get(id);
      if (!item) return;
      const { level } = item;
      const currentId = this.openedLevels.get(level);
      if (currentId === id) return;
      this.closeLevelsAfter(level);
      if (currentId && currentId !== id) {
        this.deactivate(currentId);
        this.openedLevels.delete(level);
      }
      this.activate(id);
      this.openedLevels.set(level, id);
      this.positionPanel(item.panel, item.button);
      html.classList.add("submenu-open");
    }
    activate(id) {
      const item = this.structure.get(id);
      if (!item) return;
      item.panel.classList.add(ACTIVE_CLASS);
      item.button.classList.add(ACTIVE_BUTTON_CLASS);
      item.panel.setAttribute("aria-hidden", "false");
      item.button.setAttribute("aria-expanded", "true");
      item.panel.inert = false;
      this.updateLevelTitle(item.level, item.title);
      this.updateLevelStates();
    }
    deactivate(id) {
      const item = this.structure.get(id);
      if (!item) return;
      item.panel.classList.remove(ACTIVE_CLASS);
      item.button.classList.remove(ACTIVE_BUTTON_CLASS);
      item.panel.setAttribute("aria-hidden", "true");
      item.button.setAttribute("aria-expanded", "false");
      item.panel.inert = true;
      this.updateLevelStates();
    }
    closeLevel(level) {
      this.closeLevelsAfter(level - 1);
      const id = this.openedLevels.get(level);
      if (!id) return;
      this.deactivate(id);
      this.openedLevels.delete(level);
      if (!this.openedLevels.size) {
        html.classList.remove("submenu-open");
      }
    }
    closeLevelsAfter(level) {
      [...this.openedLevels.entries()].forEach(([lvl, id]) => {
        if (lvl > level) {
          this.deactivate(id);
          this.openedLevels.delete(lvl);
        }
      });
    }
    closeAll() {
      this.openedLevels.forEach((id) => this.deactivate(id));
      this.openedLevels.clear();
      clearTimeout(this.hoverTimer);
      clearTimeout(this.closeTimer);
      clearTimeout(this._moveTimer);
      clearTimeout(this._pointerLeaveTimer);
      this._stopPointerTracking();
      this.pendingOpenId = null;
      this.updateLevelStates();
      html.classList.remove("submenu-open");
    }
    positionPanel(panel, button) {
      if (!panel || !button || isMobile2) return;
      const rect = button.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const prevDisplay = panel.style.display;
      const prevVisibility = panel.style.visibility;
      panel.style.visibility = "hidden";
      panel.style.display = "block";
      const width = panel.getBoundingClientRect().width;
      panel.style.display = prevDisplay;
      panel.style.visibility = prevVisibility;
      let left = rect.right;
      if (left + width > viewportWidth - 8) {
        left = viewportWidth - width - 8;
      }
      if (left < 8) left = 8;
      panel.style.setProperty("--submenu-left", `${left}px`);
      panel.style.setProperty("--submenu-top", `${rect.top}px`);
      panel.style.setProperty("--submenu-btn-bottom", `${rect.bottom}px`);
    }
    destroy() {
      this.closeAll();
      this.listeners.forEach(({ target, type, handler, options }) => {
        target.removeEventListener(type, handler, options);
      });
      this.listeners = [];
      submenuInstances.delete(this);
    }
  }
  const instances = [];
  document.querySelectorAll("[data-submenu-root]").forEach((root) => {
    instances.push(new Submenu(root));
  });
  window.submenuAPI = {
    instances,
    closeAll() {
      instances.forEach((i) => i.closeAll());
    },
    destroyAll() {
      instances.forEach((i) => i.destroy());
    }
  };
};
document.addEventListener("DOMContentLoaded", window.initSubmenu);
