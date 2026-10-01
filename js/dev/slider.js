import { S as Swiper, T as Thumb, M as Mousewheel, P as Pagination, N as Navigation, a as Scrollbar, G as Grid, C as Controller } from "./swiper.min.js";
function initSliders() {
  const resizableSwiper = (breakpoint, swiperElementOrClass, swiperSettings, callback) => {
    const el = typeof swiperElementOrClass === "string" ? document.querySelector(swiperElementOrClass) : swiperElementOrClass;
    if (!el) return;
    const media = window.matchMedia(breakpoint);
    const enable = () => {
      if (el.swiper) return;
      const instance = new Swiper(el, swiperSettings);
      el.swiper = instance;
    };
    const disable = () => {
      if (!el.swiper) return;
      el.swiper.destroy(true, true);
      el.swiper = null;
      el.style.transform = "";
    };
    const checker = () => {
      if (media.matches) {
        enable();
      } else {
        disable();
      }
    };
    media.addEventListener("change", checker);
    checker();
  };
  if (document.querySelector(".product-block__slider")) {
    const parentSliders = document.querySelector(".product-block__slider").parentElement;
    const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
    const arrowNext = parentSliders.querySelector(".swiper-button-next");
    const pagination = parentSliders.querySelector(".swiper-pagination");
    const pageProductThumbs = new Swiper(".product-block__thumbs", {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [],
      observer: true,
      observeParents: true,
      slidesPerView: 6,
      spaceBetween: 8,
      speed: 800,
      breakpoints: {
        319.98: {
          spaceBetween: 6
        },
        479.98: {
          spaceBetween: 10
        }
      }
    });
    new Swiper(".product-block__slider", {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Thumb, Mousewheel, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 800,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true
      },
      // Кнопки "вліво/вправо"
      thumbs: {
        swiper: pageProductThumbs
      },
      navigation: {
        prevEl: arrowPrev,
        nextEl: arrowNext
      },
      pagination: {
        el: pagination
      },
      on: {}
    });
  }
  if (document.querySelector(".product-detail__slider")) {
    const parentSliders = document.querySelector(".product-detail__slider").parentElement.parentElement;
    const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
    const arrowNext = parentSliders.querySelector(".swiper-button-next");
    const pagination = parentSliders.querySelector(".swiper-pagination");
    new Swiper(".product-detail__slider", {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation, Mousewheel, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 800,
      mousewheel: {
        forceToAxis: true
      },
      navigation: {
        prevEl: arrowPrev,
        nextEl: arrowNext
      },
      pagination: {
        el: pagination,
        clickable: true
      },
      on: {
        slideChange: function() {
          const fractionEl = parentSliders.querySelector(".swiper-fraction");
          const currentSlide = this.realIndex + 1;
          const totalSlides = this.slides.length - (this.loop ? 2 : 0);
          fractionEl.textContent = `${currentSlide} / ${totalSlides}`;
        },
        init: function() {
          const fractionEl = parentSliders.querySelector(".swiper-fraction");
          const currentSlide = this.realIndex + 1;
          const totalSlides = this.slides.length - (this.loop ? 2 : 0);
          fractionEl.textContent = `${currentSlide} / ${totalSlides}`;
        }
      }
    });
  }
  if (document.querySelector(".reviews-block__slider")) {
    let toggleLockSliderClass = function(sliderEl) {
      const nextBtn = sliderEl.parentElement.querySelector(".swiper-button-next");
      const myBlock = sliderEl.parentElement.querySelector("[data-swiper-lock]");
      if (!myBlock) return;
      if (nextBtn && nextBtn.classList.contains("swiper-button-lock")) {
        myBlock.classList.add("swiper-block-lock");
      } else {
        myBlock.classList.remove("swiper-block-lock");
      }
    };
    const sliders = document.querySelectorAll(".reviews-block__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      parentSliders.querySelector(".swiper-pagination");
      new Swiper(slider, {
        modules: [Navigation, Mousewheel],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 16,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 8
          },
          479.98: {
            slidesPerView: 1.3,
            spaceBetween: 8
          },
          649.98: {
            slidesPerView: 2.2,
            spaceBetween: 16
          },
          1199.98: {
            slidesPerView: 3,
            spaceBetween: 16
          }
        },
        on: {
          init() {
            toggleLockSliderClass(slider);
          },
          slideChange() {
            toggleLockSliderClass(slider);
          },
          resize() {
            toggleLockSliderClass(slider);
          }
        }
      });
    });
  }
  if (document.querySelector(".proposals-block__slider")) {
    const sliders = document.querySelectorAll(".proposals-block__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      const isInProductBlock = slider.closest(".product-block__inner");
      const isInProfile = slider.closest(".profile");
      let breakpoints;
      if (isInProductBlock) {
        breakpoints = {
          319.98: { slidesPerView: 1.5 },
          359.98: { slidesPerView: 2.12 },
          479.98: { slidesPerView: 2.3 },
          649.98: { slidesPerView: 3.2 },
          767.98: { slidesPerView: 3 }
        };
      } else if (isInProfile) {
        breakpoints = {
          319.98: { slidesPerView: 1.5 },
          359.98: { slidesPerView: 2.12 },
          649.98: { slidesPerView: 3 },
          767.98: { slidesPerView: 4 },
          991.98: { slidesPerView: 3 },
          1199.98: { slidesPerView: 4 }
        };
      } else {
        breakpoints = {
          319.98: { slidesPerView: 1.5 },
          359.98: { slidesPerView: 2.12 },
          479.98: { slidesPerView: 2.3 },
          649.98: { slidesPerView: 3.2 },
          991.98: { slidesPerView: 4 },
          1199.98: { slidesPerView: 5 }
        };
      }
      new Swiper(slider, {
        modules: [Navigation, Mousewheel, Scrollbar],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 1,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        breakpoints,
        on: {}
      });
    });
  }
  if (document.querySelector(".to-block__slider")) {
    const sliders = document.querySelectorAll(".to-block__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      const isInProductBlock = slider.closest(".product-block__inner");
      new Swiper(slider, {
        modules: [Navigation, Mousewheel, Scrollbar, Grid],
        observer: true,
        observeParents: true,
        slidesPerView: 5,
        spaceBetween: 16,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        breakpoints: isInProductBlock ? {
          319.98: {
            slidesPerView: 2.1,
            grid: { fill: "row", rows: 2 }
          },
          549.98: {
            slidesPerView: 3.1,
            grid: false
          },
          767.98: {
            slidesPerView: 4
          },
          1199.98: {
            slidesPerView: 5
          }
        } : {
          319.98: {
            slidesPerView: 2.1,
            grid: { fill: "row", rows: 2 }
          },
          549.98: {
            slidesPerView: 3.1,
            grid: false
          },
          767.98: {
            slidesPerView: 4
          },
          991.98: {
            slidesPerView: 5
          }
        },
        on: {}
      });
    });
  }
  if (document.querySelector(".hero-block__slider")) {
    const sliders = document.querySelectorAll(".hero-block__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      const pagination = parentSliders.querySelector(".swiper-pagination");
      new Swiper(slider, {
        modules: [Navigation, Mousewheel, Pagination],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 16,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        pagination: {
          el: pagination,
          clickable: true
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1,
            spaceBetween: 12
          },
          479.98: {
            slidesPerView: 1.1,
            spaceBetween: 12
          },
          649.98: {
            slidesPerView: 2.2,
            spaceBetween: 16
          },
          1199.98: {
            slidesPerView: 3,
            spaceBetween: 16
          }
        },
        on: {}
      });
    });
  }
  if (document.querySelector(".categories-block__slider")) {
    const sliders = document.querySelectorAll(".categories-block__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      parentSliders.querySelector(".swiper-button-prev");
      parentSliders.querySelector(".swiper-button-next");
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      const isInBlock = slider.closest(".categories-block__inner");
      const isInCatalog = slider.closest(".catalog--categories");
      const swiperSettings = {
        modules: [Mousewheel, Scrollbar, Grid],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 1,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        breakpoints: isInBlock ? {
          319: {
            slidesPerView: 2,
            spaceBetween: 8,
            grid: { fill: "row", rows: 3 }
          },
          649.98: {
            slidesPerView: 3,
            spaceBetween: 16,
            grid: { fill: "row", rows: 3 }
          },
          1199.98: {
            slidesPerView: 6,
            spaceBetween: 16,
            grid: { fill: "row", rows: 2 }
          }
        } : {
          319: {
            slidesPerView: 2,
            spaceBetween: 8,
            grid: { fill: "row", rows: 2 }
          },
          649.98: {
            slidesPerView: 3,
            spaceBetween: 16,
            grid: { fill: "row", rows: 2 }
          },
          1199.98: {
            slidesPerView: 6,
            spaceBetween: 16,
            grid: { fill: "row", rows: 2 }
          }
        }
      };
      if (isInCatalog) {
        resizableSwiper("(max-width: 1199.98px)", slider, swiperSettings);
      } else {
        new Swiper(slider, swiperSettings);
      }
    });
  }
  if (document.querySelector(".blog-articles__slider")) {
    const sliders = document.querySelectorAll(".blog-articles__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      new Swiper(slider, {
        modules: [Scrollbar, Mousewheel],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 16,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          479.98: {
            slidesPerView: 1.2,
            spaceBetween: 16
          },
          649.98: {
            slidesPerView: 2.3,
            spaceBetween: 16
          },
          991.98: {
            slidesPerView: 3,
            spaceBetween: 16
          },
          1199.98: {
            slidesPerView: 4,
            spaceBetween: 16
          }
        },
        on: {}
      });
    });
  }
  if (document.querySelector(".reviews-google__slider")) {
    const sliders = document.querySelectorAll(".reviews-google__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      new Swiper(slider, {
        modules: [Scrollbar, Mousewheel, Navigation],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 16,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 16
          },
          479.98: {
            slidesPerView: 1.2,
            spaceBetween: 16
          },
          649.98: {
            slidesPerView: 2.3,
            spaceBetween: 16
          },
          991.98: {
            slidesPerView: 3,
            spaceBetween: 16
          },
          1199.98: {
            slidesPerView: 4,
            spaceBetween: 16
          }
        },
        on: {}
      });
    });
  }
  if (document.querySelector(".promotions-block__slider")) {
    const sliders = document.querySelectorAll(".promotions-block__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      new Swiper(slider, {
        modules: [Scrollbar, Navigation, Mousewheel],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        breakpoints: {
          319.98: {
            slidesPerView: 2
          },
          767.98: {
            slidesPerView: 1.8
          },
          991.98: {
            slidesPerView: 3
          }
        },
        on: {}
      });
    });
  }
  if (document.querySelector(".choice-motozilla")) {
    const sliders = document.querySelectorAll(".choice-motozilla");
    sliders.forEach((slider, index) => {
      const choiseSlider = slider.querySelector(".choice-motozilla__slider");
      const choiseDescr = slider.querySelector(".choice-motozilla__descr");
      const arrowPrev = slider.querySelector(".swiper-button-prev");
      const arrowNext = slider.querySelector(".swiper-button-next");
      const pagination = slider.querySelector(".swiper-pagination");
      const choiseDescrSlider = new Swiper(choiseDescr, {
        modules: [Pagination, Navigation, Mousewheel, Controller],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 8,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        pagination: {
          el: pagination,
          clickable: true
        },
        breakpoints: {},
        on: {}
      });
      const choiseCardSlider = new Swiper(choiseSlider, {
        modules: [Pagination, Navigation, Mousewheel, Controller],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 8,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        pagination: {
          el: pagination,
          clickable: true
        },
        breakpoints: {},
        on: {}
      });
      choiseDescrSlider.controller.control = choiseCardSlider;
      choiseCardSlider.controller.control = choiseDescrSlider;
    });
  }
  if (document.querySelector(".products__slider")) {
    const sliders = document.querySelectorAll(".products__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      const arrowPrev = parentSliders.querySelector(".swiper-button-prev");
      const arrowNext = parentSliders.querySelector(".swiper-button-next");
      parentSliders.querySelector(".swiper-scrollbar");
      const isInProductBlock = slider.closest(".product-block__inner");
      const isInProfile = slider.closest(".profile");
      let breakpoints;
      if (isInProductBlock) {
        breakpoints = {
          319.98: { slidesPerView: 1.5 },
          479.98: { slidesPerView: 2.12 },
          649.98: { slidesPerView: 3.2 },
          767.98: { slidesPerView: 3 }
        };
      } else if (isInProfile) {
        breakpoints = {
          319.98: { slidesPerView: 1.5 },
          479.98: { slidesPerView: 2.12 },
          649.98: { slidesPerView: 3 },
          767.98: { slidesPerView: 4 },
          991.98: { slidesPerView: 3 },
          1199.98: { slidesPerView: 4 }
        };
      } else {
        breakpoints = {
          319.98: { slidesPerView: 1.5 },
          479.98: { slidesPerView: 2.12 },
          649.98: { slidesPerView: 3.2 },
          991.98: { slidesPerView: 4 },
          1199.98: { slidesPerView: 5 }
        };
      }
      new Swiper(slider, {
        modules: [Navigation, Mousewheel],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 8,
        watchSlidesProgress: true,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        navigation: {
          prevEl: arrowPrev,
          nextEl: arrowNext
        },
        breakpoints,
        on: {}
      });
    });
  }
  if (document.querySelector(".article-block__products-slider")) {
    const sliders = document.querySelectorAll(".article-block__products-slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      parentSliders.querySelector(".swiper-button-prev");
      parentSliders.querySelector(".swiper-button-next");
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      const swiperSettings = {
        modules: [Mousewheel, Scrollbar],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 1,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        breakpoints: {
          319.98: { slidesPerView: 1.5 },
          359.98: { slidesPerView: 2 },
          479.98: { slidesPerView: 2.3 },
          649.98: { slidesPerView: 3.2 },
          991.98: { slidesPerView: 4 },
          1199.98: { slidesPerView: 5 }
        }
      };
      resizableSwiper("(max-width: 991.98px)", slider, swiperSettings);
    });
  }
  if (document.querySelector(".similar-sales__slider")) {
    const sliders = document.querySelectorAll(".similar-sales__slider");
    sliders.forEach((slider, index) => {
      const parentSliders = slider.parentElement;
      parentSliders.querySelector(".swiper-button-prev");
      parentSliders.querySelector(".swiper-button-next");
      const scrollbar = parentSliders.querySelector(".swiper-scrollbar");
      new Swiper(slider, {
        modules: [Scrollbar, Mousewheel],
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 16,
        speed: 800,
        mousewheel: {
          forceToAxis: true
        },
        scrollbar: {
          el: scrollbar,
          draggable: true
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.15
          },
          649.98: {
            slidesPerView: 2
          },
          991.98: {
            slidesPerView: 3
          },
          1199.98: {
            slidesPerView: 4
          }
        },
        on: {}
      });
    });
  }
}
document.querySelector("[data-fls-slider]") ? window.addEventListener("load", initSliders) : null;
