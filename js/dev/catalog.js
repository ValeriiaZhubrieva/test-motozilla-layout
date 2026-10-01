const filtersBlock = document.querySelectorAll("[data-filters-block]");
if (filtersBlock.length) {
  filtersBlock.forEach((block) => {
    const filterItems = block.querySelectorAll(".filters-aside__item");
    filterItems.forEach((item) => {
      const itemToggle = item.querySelector(".filters-aside__toggle");
      if (item.classList.contains("is-open")) {
        itemToggle.classList.add("is-active");
      }
      itemToggle.addEventListener("click", () => {
        item.classList.toggle("is-open");
        itemToggle.classList.toggle("is-active");
      });
    });
  });
}
