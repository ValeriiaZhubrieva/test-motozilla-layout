/*!
 * Довідковий центр
 *
 * Функціонал:
 * - перемикання основних розділів як tabs
 * - відкриття / закриття підменю
 * - активний пункт меню
 * - збереження активного розділу в hash
 * - підтримка Back / Forward браузера
 * - mobile menu
 *
 * Працює на двох типах сторінок:
 *
 * 1. Головна сторінка довідкового центру:
 *    [data-help-panel] присутні
 *    → працюють tabs
 *
 * 2. Текстова сторінка:
 *    [data-help-panel] відсутні
 *    → sidebar, submenu та mobile menu продовжують працювати
 */
function initHelpCenter() {
  const blocks = document.querySelectorAll("[data-help-center]");
  if (!blocks.length) return;
  blocks.forEach((block) => {
    const tabs = block.querySelectorAll("[data-help-tab]");
    const panels = block.querySelectorAll("[data-help-panel]");
    const menuButton = block.querySelector("[data-help-menu]");
    const sidebar = block.querySelector("[data-help-sidebar]");
    const sidebarClose = block.querySelector("[data-help-sidebar-close]");
    const closeSubmenus = (except = null) => {
      const items = block.querySelectorAll("[data-help-item]");
      items.forEach((item) => {
        if (except && item === except) return;
        item.classList.remove("is-open");
      });
    };
    const setActiveItem = (tab) => {
      if (!tab) return;
      const activeItem = tab.closest("[data-help-item]");
      if (!activeItem) return;
      const items = block.querySelectorAll("[data-help-item]");
      items.forEach((item) => {
        item.classList.toggle(
          "is-active",
          item === activeItem
        );
      });
    };
    const setActiveTab = (name, updateHash = true) => {
      if (!name) return;
      const activeTab = [...tabs].find(
        (tab) => tab.dataset.helpTab === name
      );
      if (!activeTab) return;
      tabs.forEach((tab) => {
        tab.classList.toggle(
          "is-active",
          tab === activeTab
        );
      });
      setActiveItem(activeTab);
      const activeItem = activeTab.closest("[data-help-item]");
      if (activeItem == null ? void 0 : activeItem.querySelector("[data-help-submenu]")) {
        closeSubmenus(activeItem);
        activeItem.classList.add("is-open");
      } else {
        closeSubmenus();
      }
      if (panels.length) {
        const activePanel = [...panels].find(
          (panel) => panel.dataset.helpPanel === name
        );
        if (activePanel) {
          panels.forEach((panel) => {
            panel.classList.toggle(
              "is-active",
              panel === activePanel
            );
          });
        }
      }
      if (panels.length && updateHash) {
        const newHash = `#${name}`;
        if (window.location.hash !== newHash) {
          history.pushState(
            { helpTab: name },
            "",
            newHash
          );
        }
      }
    };
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.dataset.helpTab;
        if (!name) return;
        if (panels.length) {
          setActiveTab(name);
          return;
        }
        const item = tab.closest("[data-help-item]");
        if (!item) return;
        const submenu = item.querySelector("[data-help-submenu]");
        setActiveItem(tab);
        if (submenu) {
          const isOpen = item.classList.contains("is-open");
          closeSubmenus(item);
          item.classList.toggle(
            "is-open",
            !isOpen
          );
        } else {
          closeSubmenus();
        }
      });
    });
    menuButton == null ? void 0 : menuButton.addEventListener("click", () => {
      sidebar == null ? void 0 : sidebar.classList.add("is-open");
      document.documentElement.classList.add(
        "help-menu-open"
      );
    });
    sidebarClose == null ? void 0 : sidebarClose.addEventListener("click", () => {
      sidebar == null ? void 0 : sidebar.classList.remove("is-open");
      document.documentElement.classList.remove(
        "help-menu-open"
      );
    });
    const getHashTab = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return null;
      const exists = [...tabs].some(
        (tab) => tab.dataset.helpTab === hash
      );
      return exists ? hash : null;
    };
    if (panels.length) {
      const initialTab = getHashTab();
      if (initialTab) {
        setActiveTab(initialTab, false);
      } else {
        const activeTab = block.querySelector(
          "[data-help-tab].is-active"
        );
        if (activeTab) {
          setActiveTab(
            activeTab.dataset.helpTab,
            false
          );
        }
      }
    } else {
      const activeTab = block.querySelector(
        "[data-help-tab].is-active"
      );
      if (activeTab) {
        const activeItem = activeTab.closest("[data-help-item]");
        if (activeItem == null ? void 0 : activeItem.querySelector(
          "[data-help-submenu]"
        )) {
          activeItem.classList.add("is-open");
        }
      }
    }
    if (panels.length) {
      window.addEventListener("popstate", () => {
        const hashTab = getHashTab();
        if (hashTab) {
          setActiveTab(hashTab, false);
        } else {
          const activeTab = block.querySelector(
            "[data-help-tab].is-active"
          );
          if (activeTab) {
            setActiveTab(
              activeTab.dataset.helpTab,
              false
            );
          }
        }
      });
      window.addEventListener("hashchange", () => {
        const hashTab = getHashTab();
        if (hashTab) {
          setActiveTab(hashTab, false);
        }
      });
    }
    const submenuLinks = block.querySelectorAll(
      "[data-help-submenu] a"
    );
    submenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebar == null ? void 0 : sidebar.classList.remove("is-open");
        document.documentElement.classList.remove(
          "help-menu-open"
        );
      });
    });
  });
}
initHelpCenter();
