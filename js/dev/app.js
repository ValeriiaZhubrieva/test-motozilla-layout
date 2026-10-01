const toggleActiveBtns = document.querySelectorAll("[data-toggle-active]");
if (toggleActiveBtns.length) {
  toggleActiveBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-active");
    });
  });
}
function initTopPositionBlock() {
  const topPositionBlocks = document.querySelectorAll("[data-top-position]");
  if (topPositionBlocks.length) {
    let setVar2 = function(el, name, value) {
      if (!el._vars) el._vars = {};
      if (el._vars[name] === value) return;
      el.style.setProperty(name, value);
      el._vars[name] = value;
    }, updateTopPositions2 = function() {
      const headerHeight = header ? header.offsetHeight : 0;
      const headerOffsetHeight = headerOffsetEl ? headerOffsetEl.offsetHeight : 0;
      const topInfoHeight = topInfo ? topInfo.offsetHeight : 0;
      const measurements = [];
      topPositionBlocks.forEach((block) => {
        const blockRect = block.getBoundingClientRect();
        let navData = null;
        if (block.hasAttribute("data-top-position-nav")) {
          const blockNav = block.querySelector("[data-top-position-navblock]");
          if (blockNav) {
            const navRect = blockNav.getBoundingClientRect();
            navData = {
              el: blockNav,
              height: navRect.height
            };
          }
        }
        measurements.push({
          block,
          topPosition: Math.max(headerHeight, blockRect.top),
          left: blockRect.left,
          width: blockRect.width,
          nav: navData
        });
      });
      measurements.forEach(({ block, topPosition, left, width, nav }) => {
        setVar2(block, "--top-position", `${topPosition}px`);
        setVar2(block, "--header-height", `${headerHeight}px`);
        setVar2(block, "--header-offset-height", `${headerOffsetHeight}px`);
        setVar2(block, "--top-info-height", `${topInfoHeight}px`);
        if (nav) {
          setVar2(nav.el, "--nav-left", `${left}px`);
          setVar2(nav.el, "--nav-width", `${width}px`);
          setVar2(block, "--nav-height", `${nav.height}px`);
        }
      });
    }, onScroll2 = function() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateTopPositions2();
          ticking = false;
        });
        ticking = true;
      }
    }, runAfterLayout2 = function() {
      requestAnimationFrame(() => {
        requestAnimationFrame(updateTopPositions2);
      });
    };
    var setVar = setVar2, updateTopPositions = updateTopPositions2, onScroll = onScroll2, runAfterLayout = runAfterLayout2;
    const header = document.querySelector("header");
    const headerOffsetEl = header == null ? void 0 : header.querySelector("[data-header-offset]");
    const topInfo = document.querySelector(".top-info");
    let ticking = false;
    runAfterLayout2();
    window.addEventListener("load", runAfterLayout2);
    if (document.fonts) {
      document.fonts.ready.then(runAfterLayout2);
    }
    window.addEventListener("scroll", onScroll2, { passive: true });
    window.addEventListener("resize", runAfterLayout2);
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(runAfterLayout2);
      if (header) observer.observe(header);
      if (headerOffsetEl) observer.observe(headerOffsetEl);
    }
  }
}
document.addEventListener("DOMContentLoaded", initTopPositionBlock);
function initStickyBlocks() {
  const stickyParents = document.querySelectorAll("[data-sticky-parent]");
  if (!stickyParents.length) return;
  const instances = [];
  stickyParents.forEach((parent, index) => {
    const stickyBlock = parent.querySelector("[data-sticky-block]");
    if (!stickyBlock) return;
    const stickyClass = stickyBlock.getAttribute("data-sticky-class") || "block-fixed";
    const instance = {
      offset: 0,
      isFixed: false,
      stickyClass
    };
    function getStickyOffset() {
      const rect = stickyBlock.getBoundingClientRect();
      return window.scrollY + rect.top;
    }
    instance.offset = getStickyOffset();
    function setHeaderOffset() {
      const height = stickyBlock.offsetHeight;
      parent.style.setProperty("--sticky-offset", `${height}px`);
    }
    function clearHeaderOffset() {
      parent.style.removeProperty("--sticky-offset");
    }
    function handleScroll() {
      const shouldBeFixed = window.scrollY >= instance.offset;
      if (shouldBeFixed === instance.isFixed) return;
      instance.isFixed = shouldBeFixed;
      if (shouldBeFixed) {
        stickyBlock.classList.add("--fixed");
        stickyBlock.setAttribute("data-fls-lp", "");
        document.documentElement.classList.add(instance.stickyClass);
        setHeaderOffset();
      } else {
        stickyBlock.classList.remove("--fixed");
        stickyBlock.removeAttribute("data-fls-lp");
        document.documentElement.classList.remove(instance.stickyClass);
        clearHeaderOffset();
      }
    }
    function updateOffset() {
      const wasFixed = instance.isFixed;
      if (wasFixed) {
        stickyBlock.classList.remove("--fixed");
        document.documentElement.classList.remove(instance.stickyClass);
      }
      instance.offset = getStickyOffset();
      if (wasFixed) {
        stickyBlock.classList.add("--fixed");
        document.documentElement.classList.add(instance.stickyClass);
        setHeaderOffset();
      }
      handleScroll();
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    const resizeObserver = new ResizeObserver(() => {
      if (instance.isFixed) {
        setHeaderOffset();
      }
      updateOffset();
    });
    resizeObserver.observe(parent);
    resizeObserver.observe(stickyBlock);
    handleScroll();
  });
  window.stickyBlocksInstances = instances;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStickyBlocks);
} else {
  initStickyBlocks();
}
function closeAllDropdowns(container, except = null) {
  container.querySelectorAll("[data-drop-block].is-active").forEach((drop) => {
    if (drop !== except) {
      drop.classList.remove("is-active");
      const dropBtn = drop.querySelector("[data-drop-toggle]");
      if (dropBtn) {
        dropBtn.classList.remove("is-active");
      }
    }
  });
}
document.querySelectorAll("[data-drop-block]").forEach((block) => {
  const btn = block.querySelector("[data-drop-toggle]");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const parent = block.closest("[data-drop-block-one]");
    const isActive = block.classList.contains("is-active");
    if (parent) {
      if (isActive) {
        block.classList.remove("is-active");
        btn.classList.remove("is-active");
      } else {
        closeAllDropdowns(parent, block);
        setTimeout(() => {
          block.classList.add("is-active");
          btn.classList.add("is-active");
        }, 10);
      }
    } else {
      block.classList.toggle("is-active");
      btn.classList.toggle("is-active");
    }
  });
  document.addEventListener("click", (e) => {
    if (!block.contains(e.target)) {
      block.classList.remove("is-active");
      btn.classList.remove("is-active");
    }
  });
});
const toggleActiveParentBtns = document.querySelectorAll("[data-toggle-parent-active]");
if (toggleActiveParentBtns.length) {
  toggleActiveParentBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.classList.toggle("is-active");
      btn.parentElement.classList.toggle("is-active");
    });
  });
}
const pseudoOptions = document.querySelectorAll("[data-pseudo-options]");
if (pseudoOptions.length) {
  pseudoOptions.forEach((block) => {
    const options = block.querySelectorAll("button, a");
    const setActive = (current) => {
      options.forEach((item) => {
        item.classList.toggle("is-active", item === current);
      });
    };
    options.forEach((item) => {
      item.addEventListener("click", (e) => {
        setActive(item);
      });
    });
  });
}
window.customMiniSelect = function() {
  const selParents = document.querySelectorAll("[data-sel-block]");
  if (!selParents.length) return;
  selParents.forEach((selBlock) => {
    const isSearch = selBlock.hasAttribute("data-sel-block-search");
    const selDropdownButton = selBlock.querySelector("[data-sel-block-current]");
    const selDropdownValueSpan = selDropdownButton.querySelector("[data-sel-block-value] span");
    const selDropdownInput = selDropdownButton.querySelector("[data-sel-block-input]");
    const selOptions = selBlock.querySelectorAll("[data-sel-block-btn]");
    const selCloseBtns = selBlock.querySelectorAll("[data-sel-block-close]");
    const selDropdown = selBlock.querySelector("[data-sel-block-dropdown]");
    const placeholderText = selBlock.getAttribute("data-sel-block-placeholder");
    let isOpen = false;
    function checkDropdownOverflow() {
      if (!selDropdown) return;
      selBlock.classList.remove("is-out-left", "is-out-right");
      const rect = selDropdown.getBoundingClientRect();
      if (rect.left < 0) selBlock.classList.add("is-out-left");
      if (rect.right > window.innerWidth) selBlock.classList.add("is-out-right");
    }
    function checkAndSetPlaceholder() {
      if (!placeholderText) return;
      const hasActiveOption = Array.from(selOptions).some((o) => o.classList.contains("is-active"));
      if (!hasActiveOption) {
        selBlock.classList.add("is-placeholder");
        if (selDropdownValueSpan) {
          selDropdownValueSpan.innerHTML = placeholderText;
        }
      } else {
        selBlock.classList.remove("is-placeholder");
      }
    }
    function filterOptions(query) {
      const value = query.toLowerCase().trim();
      selOptions.forEach((option) => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(value) ? "" : "none";
      });
    }
    function resetFilter() {
      selOptions.forEach((option) => {
        option.style.display = "";
      });
    }
    checkAndSetPlaceholder();
    function closeDropdown() {
      selBlock.classList.remove("sel-open");
      setTimeout(() => {
        selBlock.classList.remove("is-out-left", "is-out-right");
        document.documentElement.classList.remove("sel-open");
      }, 300);
      isOpen = false;
      document.removeEventListener("click", handleDocumentClick);
      if (isSearch && selDropdownInput) {
        resetFilter();
      }
    }
    function handleDocumentClick(e) {
      if (!selBlock.contains(e.target)) {
        closeDropdown();
      }
    }
    selCloseBtns.forEach((btn) => {
      btn.addEventListener("click", closeDropdown);
    });
    selDropdownButton.addEventListener("click", (e) => {
      const isClickOnInput = isSearch && e.target === selDropdownInput;
      if (isClickOnInput && isOpen) return;
      if (!isOpen) {
        isOpen = true;
      } else {
        isOpen = false;
      }
      const parentWithAttr = selBlock.closest("[data-one-sel-block]");
      if (parentWithAttr && isOpen) {
        parentWithAttr.querySelectorAll("[data-sel-block]").forEach((block) => {
          if (block !== selBlock) block.classList.remove("sel-open");
        });
      }
      selBlock.classList.toggle("sel-open", isOpen);
      document.documentElement.classList.toggle("sel-open", isOpen);
      if (isOpen) {
        document.addEventListener("click", handleDocumentClick);
        requestAnimationFrame(() => {
          checkDropdownOverflow();
        });
      } else {
        closeDropdown();
      }
    });
    if (isSearch && selDropdownInput) {
      selDropdownInput.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        if (isOpen) {
          filterOptions(value);
        }
        if (value === "") {
          selOptions.forEach((o) => o.classList.remove("is-active"));
          checkAndSetPlaceholder();
        }
      });
      selDropdownInput.addEventListener("focus", () => {
        if (isOpen) {
          selDropdownInput.value = "";
          resetFilter();
          selOptions.forEach((o) => o.classList.remove("is-active"));
          checkAndSetPlaceholder();
        }
      });
    }
    selOptions.forEach((item) => {
      item.addEventListener("click", () => {
        const selectedText = item.textContent.replace(/\s+/g, " ").trim();
        if (selDropdownInput) {
          selDropdownInput.value = selectedText;
          if (typeof initInputEffects === "function") {
            initInputEffects();
          }
        } else if (selDropdownValueSpan) {
          selDropdownValueSpan.innerHTML = selectedText;
        }
        selOptions.forEach((o) => o.classList.toggle("is-active", o === item));
        closeDropdown();
        checkAndSetPlaceholder();
      });
    });
  });
};
customMiniSelect();
function parseTimeToSeconds(timeStr) {
  const parts = timeStr.split(":").map(Number);
  let hours = 0, minutes = 0, seconds = 0;
  if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    [minutes, seconds] = parts;
  } else if (parts.length === 1) {
    [seconds] = parts;
  }
  return hours * 3600 + minutes * 60 + seconds;
}
function initTimers() {
  const timers = document.querySelectorAll("[data-time]");
  timers.forEach((timerEl) => {
    const timeStr = timerEl.dataset.time;
    if (!timeStr) return;
    let totalSeconds = parseTimeToSeconds(timeStr);
    const hoursEl = timerEl.querySelector("[data-hours]");
    const minutesEl = timerEl.querySelector("[data-minutes]");
    const secondsEl = timerEl.querySelector("[data-seconds]");
    function update() {
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor(totalSeconds % 3600 / 60);
      let seconds = totalSeconds % 60;
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        clearInterval(interval);
      }
    }
    update();
    const interval = setInterval(update, 1e3);
  });
}
document.addEventListener("DOMContentLoaded", initTimers);
