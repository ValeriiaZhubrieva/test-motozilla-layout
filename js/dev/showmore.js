import { d as dataMediaQueries, s as slideUp, e as slideDown } from "./common.min.js";
function showMore() {
  const showMoreBlocks = document.querySelectorAll("[data-fls-showmore]");
  let showMoreBlocksRegular;
  let mdQueriesArray;
  if (showMoreBlocks.length) {
    showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function(item, index, self) {
      return !item.dataset.flsShowmoreMedia;
    });
    showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
    document.addEventListener("click", showMoreActions);
    window.addEventListener("resize", showMoreActions);
    mdQueriesArray = dataMediaQueries(showMoreBlocks, "flsShowmoreMedia");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function() {
          initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      });
      initItemsMedia(mdQueriesArray);
    }
  }
  function initItemsMedia(mdQueriesArray2) {
    mdQueriesArray2.forEach((mdQueriesItem) => {
      initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
    });
  }
  function initItems(showMoreBlocks2, matchMedia) {
    showMoreBlocks2.forEach((showMoreBlock) => {
      initItem(showMoreBlock, matchMedia);
    });
  }
  function initItem(showMoreBlock, matchMedia = false) {
    showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
    let showMoreContent = showMoreBlock.querySelectorAll("[data-fls-showmore-content]");
    let showMoreButton = showMoreBlock.querySelectorAll("[data-fls-showmore-button]");
    showMoreContent = Array.from(showMoreContent).filter(
      (item) => item.closest("[data-fls-showmore]") === showMoreBlock
    )[0];
    showMoreButton = Array.from(showMoreButton).filter(
      (item) => item.closest("[data-fls-showmore]") === showMoreBlock
    )[0];
    applyMaxHeight(showMoreContent);
    const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
    if (matchMedia.matches || !matchMedia) {
      if (hiddenHeight < getOriginalHeight(showMoreContent)) {
        slideUp(
          showMoreContent,
          0,
          showMoreBlock.classList.contains("--showmore-active") ? getOriginalHeight(showMoreContent) : hiddenHeight
        );
        showMoreButton.hidden = false;
        showMoreBlock.classList.contains("--showmore-active") && toggleMaxHeightOverflow(showMoreBlock, showMoreContent, 0);
      } else {
        slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    } else {
      slideDown(showMoreContent, 0, hiddenHeight);
      showMoreButton.hidden = true;
    }
  }
  function getMaxHeightValue(showMoreContent) {
    const maxHeightAttr = showMoreContent.dataset.flsShowmoreMax;
    return maxHeightAttr ? parseFloat(maxHeightAttr) : null;
  }
  function applyMaxHeight(showMoreContent) {
    const maxHeightValue = getMaxHeightValue(showMoreContent);
    if (maxHeightValue) {
      showMoreContent.style.maxHeight = `${maxHeightValue}px`;
    }
  }
  function toggleMaxHeightOverflow(showMoreBlock, showMoreContent, speed) {
    const maxHeightValue = getMaxHeightValue(showMoreContent);
    if (!maxHeightValue) return;
    window.setTimeout(
      () => {
        if (showMoreBlock.classList.contains("--showmore-active")) {
          showMoreContent.style.overflowY = "auto";
        } else {
          showMoreContent.style.overflowY = "hidden";
        }
      },
      parseFloat(speed) || 0
    );
  }
  function getHeight(showMoreBlock, showMoreContent) {
    let hiddenHeight = 0;
    const showMoreType = showMoreBlock.dataset.flsShowmore ? showMoreBlock.dataset.flsShowmore : "size";
    const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;
    if (showMoreType === "items") {
      const showMoreTypeValue = showMoreContent.dataset.flsShowmoreContent ? showMoreContent.dataset.flsShowmoreContent : 3;
      const showMoreItems = showMoreContent.children;
      for (let index = 1; index < showMoreItems.length; index++) {
        const showMoreItem = showMoreItems[index - 1];
        const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) ? parseFloat(getComputedStyle(showMoreItem).marginTop) : 0;
        const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) ? parseFloat(getComputedStyle(showMoreItem).marginBottom) : 0;
        hiddenHeight += showMoreItem.offsetHeight + marginTop;
        if (index == showMoreTypeValue) break;
        hiddenHeight += marginBottom;
      }
      rowGap ? hiddenHeight += (showMoreTypeValue - 1) * rowGap : null;
    } else {
      const showMoreTypeValue = showMoreContent.dataset.flsShowmoreContent ? showMoreContent.dataset.flsShowmoreContent : 150;
      hiddenHeight = showMoreTypeValue;
    }
    return hiddenHeight;
  }
  function getOriginalHeight(showMoreContent) {
    let parentHidden;
    let hiddenHeight = showMoreContent.offsetHeight;
    showMoreContent.style.removeProperty("height");
    if (showMoreContent.closest(`[hidden]`)) {
      parentHidden = showMoreContent.closest(`[hidden]`);
      parentHidden.hidden = false;
    }
    let originalHeight = showMoreContent.offsetHeight;
    checkMaxHeightScroll(showMoreContent, originalHeight);
    parentHidden ? parentHidden.hidden = true : null;
    showMoreContent.style.height = `${hiddenHeight}px`;
    return originalHeight;
  }
  function checkMaxHeightScroll(showMoreContent, cappedHeight) {
    const maxHeightValue = getMaxHeightValue(showMoreContent);
    if (!maxHeightValue) return;
    const hasScroll = showMoreContent.scrollHeight > cappedHeight;
    showMoreContent.classList.toggle("--showmore-scroll", hasScroll);
  }
  function showMoreActions(e) {
    const targetEvent = e.target;
    const targetType = e.type;
    if (targetType === "click") {
      if (targetEvent.closest("[data-fls-showmore-button]")) {
        const showMoreButton = targetEvent.closest("[data-fls-showmore-button]");
        const showMoreBlock = showMoreButton.closest("[data-fls-showmore]");
        const showMoreContent = showMoreBlock.querySelector("[data-fls-showmore-content]");
        const showMoreSpeed = showMoreBlock.dataset.flsShowmoreButton ? showMoreBlock.dataset.flsShowmoreButton : "500";
        const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
        if (!showMoreContent.classList.contains("--slide")) {
          showMoreBlock.classList.contains("--showmore-active") ? slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
          showMoreBlock.classList.toggle("--showmore-active");
          toggleMaxHeightOverflow(showMoreBlock, showMoreContent, showMoreSpeed);
        }
      }
    } else if (targetType === "resize") {
      showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
      mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
    }
  }
}
window.addEventListener("load", showMore);
