(function() {
  var ICON_LOUPE = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3a6 6 0 014.65 9.78l3.78 3.79-1.41 1.41-3.79-3.78A6 6 0 119 3zm0 2a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/></svg>';
  var ICON_MIC = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.92V21h2v-3.08A7 7 0 0019 11h-2z" fill="currentColor"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0007 10.586L16.9507 5.63599L18.3647 7.04999L13.4147 12L18.3647 16.95L16.9507 18.364L12.0007 13.414L7.05072 18.364L5.63672 16.95L10.5867 12L5.63672 7.04999L7.05072 5.63599L12.0007 10.586Z" fill="currentColor"/></svg>';
  var ICON_CART = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99954 6C5.99954 4.93913 6.42097 3.92172 7.17111 3.17157C7.92126 2.42143 8.93867 2 9.99954 2H13.9995C15.0604 2 16.0778 2.42143 16.828 3.17157C17.5781 3.92172 17.9995 4.93913 17.9995 6V8H21.9995C22.1447 8.00007 22.2881 8.03174 22.4198 8.09281C22.5515 8.15388 22.6683 8.24288 22.7621 8.35365C22.8559 8.46441 22.9245 8.59427 22.9631 8.73421C23.0017 8.87415 23.0093 9.02081 22.9855 9.164L21.4035 18.658C21.2478 19.5916 20.7661 20.4398 20.044 21.0517C19.3218 21.6636 18.4061 21.9996 17.4595 22H6.53954C5.59283 21.9999 4.67686 21.664 3.95451 21.052C3.23216 20.4401 2.75027 19.5918 2.59454 18.658L1.01354 9.164C0.989734 9.02081 0.997387 8.87415 1.03597 8.73421C1.07455 8.59427 1.14314 8.46441 1.23696 8.35365C1.33079 8.24288 1.4476 8.15388 1.57929 8.09281C1.71098 8.03174 1.85438 8.00007 1.99954 8H5.99954V6ZM7.99954 8H12.9995C13.2648 8 13.5191 8.10536 13.7066 8.29289C13.8942 8.48043 13.9995 8.73478 13.9995 9C13.9995 9.26522 13.8942 9.51957 13.7066 9.70711C13.5191 9.89464 13.2648 10 12.9995 10H3.17954L4.56854 18.329C4.64636 18.7957 4.88709 19.2196 5.24795 19.5255C5.60882 19.8315 6.06645 19.9996 6.53954 20H17.4595C17.9328 19.9998 18.3907 19.8318 18.7517 19.5259C19.1128 19.2199 19.3537 18.7958 19.4315 18.329L20.8195 10H16.9995C16.7343 10 16.48 9.89464 16.2924 9.70711C16.1049 9.51957 15.9995 9.26522 15.9995 9V6C15.9995 5.46957 15.7888 4.96086 15.4138 4.58579C15.0387 4.21071 14.53 4 13.9995 4H9.99954C9.46911 4 8.9604 4.21071 8.58533 4.58579C8.21025 4.96086 7.99954 5.46957 7.99954 6V8Z" fill="currentColor"/></svg>';
  var ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414L13.172 12z" fill="currentColor"/></svg>';
  var ICON_CHEVRON = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.05 4.55L12.5 10l-5.45 5.45L5.64 14l4-4-4-4 1.41-1.45z" fill="currentColor"/></svg>';
  var CASHBACK = "/assets/img/icons/Cashback.svg";
  var IMGS = [
    "/assets/img/products/1122406.400.webp",
    "/assets/img/products/370954.400.webp",
    "/assets/img/products/529590.400.webp",
    "/assets/img/products/564994.400.webp",
    "/assets/img/products/805689.400.webp",
    "/assets/img/products/840920.400.webp"
  ];
  function img(i) {
    return IMGS[i % IMGS.length];
  }
  var VIEWED = [
    {
      href: "#",
      img: img(0),
      title: "Шолом-інтеграл MT Thunder 4 SV матовий чорний, розмір L",
      sticker: "Знижки без приводу",
      old: "3 999",
      cut: "-400",
      price: "3 599",
      bonus: "+36"
    },
    {
      href: "#",
      img: img(1),
      title: "Електромотоцикл дитячий Forte JT-1188 камуфляж",
      promo: true,
      chip: { text: "5% бонусів за оплату онлайн", mod: "bonus" },
      old: "14 999",
      cut: "-3 400",
      price: "11 599",
      bonus: "+116"
    },
    {
      href: "#",
      img: img(2),
      title: "Акумулятор гелевий MOTOBATT 12V 9Ah для мотоцикла",
      promo: true,
      chip: { text: "Відновлений", mod: "refurb" },
      old: "34 099",
      cut: "-3 100",
      price: "30 999",
      bonus: "+310"
    },
    { href: "#", img: img(3), title: "Карбюратор у зборі Delta 110/125cc, Ø22мм", price: "1 030", bonus: "+10" },
    {
      href: "#",
      img: img(4),
      title: "Кермо мото Ø22-28мм, L770мм, h110мм, сталь (#Plasma)",
      price: "884",
      bonus: "+8"
    }
  ];
  var FACETS = [
    { name: "Усі результати", badge: "343", active: true },
    { name: "Велосипеди", sub: "Велозапчастини", count: 39 },
    { name: "Карбюратори", sub: "Мотозапчастини", count: 36 },
    { name: "Керма", sub: "Мотозапчастини", count: 30 },
    { name: "Стартери", sub: "Запчастини для бензоінструмента", count: 7 },
    { name: "Карбюратори", sub: "Запчастини для бензоінструмента", count: 5 },
    { name: "Карбюратор на мотоблок", sub: "Запчастини для мотоблоків", count: 5 },
    { name: "Мотошини (покришки)", sub: "Мотоколеса та гума", count: 67 },
    { name: "Моторні масла", sub: "Мастила та хімія", count: 58 },
    { name: "Диски та обода", sub: "Мотоколеса та гума", count: 20 },
    { name: "Велокамери", sub: "Велозапчастини", count: 20 },
    { name: "Двигуни для мотоблоків", sub: "Інструменти", count: 12 }
  ];
  var GROUPS = [
    {
      name: "Велосипеди",
      sub: "Велозапчастини",
      more: 35,
      items: [
        {
          img: img(3),
          name: 'Електровелосипед 27.5" Leon GAVANA 500Вт 48В, 12.8Ач, 2022 (темно-сірий, M)',
          price: "46 000",
          stock: false
        },
        {
          img: img(4),
          name: 'Електровелосипед 29" Leon MATTERHORN 500Вт 48В редуктор, 2022 (темно-сірий, M)',
          price: "48 905",
          stock: false
        },
        {
          img: img(5),
          name: 'Велосипед 28" Dorozhnik COMFORT MALE 2022 (коричневий)',
          price: "8 617",
          stock: false
        },
        {
          img: img(0),
          name: 'Велосипед 29" Leon TN-70 AM Hydraulic lock out HDD 2022 (чорно-червоний, M)',
          price: "20 476",
          stock: false
        }
      ]
    },
    {
      name: "Карбюратори",
      sub: "Мотозапчастини",
      more: 32,
      items: [
        { img: img(2), name: "Карбюратор ALPHA 110cc-125cc, D=22", price: "777", stock: true },
        { img: img(3), name: "Карбюратор Alpha 110 (PZ 22) KOMATCU", price: "901", stock: true },
        {
          img: img(1),
          name: "Карбюратор у зборі Delta 110/125cc, Ø22мм (якісна копія)",
          price: "1 030",
          stock: true
        },
        { img: img(5), name: "Карбюратор (PZ22C) для мопеда VIGOR 110cc", price: "1 019", stock: true }
      ]
    },
    {
      name: "Керма",
      sub: "Мотозапчастини",
      more: 26,
      items: [
        {
          img: img(4),
          name: "Кермо «низьке» Viper-125-150J (довжина: 700 мм, товщина: 22 мм, хром)",
          price: "415",
          stock: true
        },
        {
          img: img(0),
          name: "Кермо мото Ø22-28мм, L770мм, h110мм, сталь (#Plasma, бірюза/бузок/хром)",
          price: "884",
          stock: true
        },
        { img: img(2), name: "Кермо 4T CB/CG 125/150 (високе, хром, D=22мм)", price: "489", stock: true },
        {
          img: img(3),
          name: "Кермо мото Ø22-28мм, L770мм, h110мм, сталь (#Plasma, бірюза/бузок)",
          price: "884",
          stock: true
        }
      ]
    },
    {
      name: "Стартери",
      sub: "Запчастини для бензоінструмента",
      more: 4,
      items: [
        { img: img(5), name: "Стартер ручний (у зборі) мотокоси (mod:22) HXQ", price: "132", stock: false },
        { img: img(1), name: "Стартер ручний для бензопили 4500/5200", price: "198", stock: true },
        { img: img(0), name: "Стартер у зборі для мотоблока 168F/170F", price: "356", stock: true }
      ]
    },
    {
      name: "Карбюратори",
      sub: "Запчастини для бензоінструмента",
      more: 2,
      items: [
        { img: img(2), name: "Карбюратор мотокоси Honda GT-22, SRM-22 SABER", price: "483", stock: false },
        { img: img(3), name: "Карбюратор бензопили 4500/5200 (1E45F)", price: "264", stock: true },
        { img: img(4), name: "Карбюратор для тримера 1E40F-5 / Ø22", price: "312", stock: true }
      ]
    },
    {
      name: "Карбюратор на мотоблок",
      sub: "Запчастини для мотоблоків",
      more: 3,
      items: [
        {
          img: img(0),
          name: "Ремонтний комплект карбюратора 173F/177F/182F/188F/190F",
          price: "189",
          stock: true
        },
        { img: img(5), name: "Карбюратор мотоблок 168F (Ø22) у зборі", price: "421", stock: true },
        { img: img(1), name: "Карбюратор дизель 178F/186F для мотоблока", price: "654", stock: true }
      ]
    }
  ];
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function promoBadge() {
    return '<span class="search-card__promo"><b>-5%</b><i>UKRSIBBANK</i><i>BNP PARIBAS GROUP</i></span>';
  }
  function chipHtml(chip) {
    if (!chip) return "";
    return '<span class="search-chip search-chip--' + chip.mod + '">' + esc(chip.text) + "</span>";
  }
  function priceHtml(p) {
    var old = "";
    if (p.old) {
      old = '<div class="search-card__old"><s>' + esc(p.old) + " грн</s>" + (p.cut ? '<span class="search-card__cut">' + esc(p.cut) + "</span>" : "") + "</div>";
    }
    return '<div class="search-card__prices">' + old + '<div class="search-card__price">' + esc(p.price) + " <span>грн</span></div></div>";
  }
  function cardHtml(p) {
    return '<a class="search-card" href="' + p.href + '"><div class="search-card__media">' + (p.sticker ? '<span class="search-card__sticker">' + esc(p.sticker) + "</span>" : "") + (p.promo ? promoBadge() : "") + '<img class="search-card__img" loading="lazy" alt="" src="' + p.img + '"></div><div class="search-card__title">' + esc(p.title) + "</div>" + (p.chip ? '<div class="search-card__chips">' + chipHtml(p.chip) + "</div>" : "") + '<div class="search-card__foot">' + priceHtml(p) + '<button type="button" class="search-card__buy" aria-label="Додати в кошик">' + ICON_CART + '</button></div><div class="search-card__bonus"><img src="' + CASHBACK + '" alt="" width="20" height="20"><span><b>' + esc(p.bonus) + " ₴</b> на бонусний рахунок</span></div></a>";
  }
  function facetHtml(f) {
    var right = f.badge ? '<span class="search-mega__facet-badge">' + esc(f.badge) + "</span>" : '<span class="search-mega__facet-count">' + esc(f.count) + "</span>";
    return '<button type="button" class="search-mega__facet' + (f.active ? " is-active" : "") + '"><span class="search-mega__facet-text"><span class="search-mega__facet-name">' + esc(f.name) + "</span>" + (f.sub ? '<span class="search-mega__facet-sub">' + esc(f.sub) + "</span>" : "") + "</span>" + right + "</button>";
  }
  function groupItemHtml(it) {
    var price = '<span class="search-group__cost">' + esc(it.price) + " грн</span>" + (it.stock === false ? '<span class="search-group__stock">Немає в наявності</span>' : "");
    return '<a class="search-group__item" href="/search-results.html"><span class="search-group__thumb"><img loading="lazy" alt="" src="' + it.img + '"></span><span class="search-group__info"><span class="search-group__name">' + esc(it.name) + '</span><span class="search-group__price">' + price + "</span></span></a>";
  }
  function groupHtml(g) {
    return '<section class="search-group"><a class="search-group__head" href="/search-results.html"><span class="search-group__title">' + esc(g.name) + '</span><span class="search-group__sub">' + esc(g.sub) + '</span><span class="search-group__arrow">' + ICON_ARROW + "</span></a>" + g.items.map(groupItemHtml).join("") + '<a class="search-group__more" href="/search-results.html">ще ' + g.more + " …</a></section>";
  }
  function buildDrop() {
    var drop = document.createElement("div");
    drop.className = "search-drop";
    drop.setAttribute("data-search-drop", "");
    drop.setAttribute("data-top-position", "");
    drop.innerHTML = '<button type="button" class="search-drop__close" data-search-close aria-label="Закрити">' + ICON_CLOSE + '</button><div class="search-drop__inner"><div class="search-drop__state" data-state="empty"><div class="search-panel"><div class="search-panel__head"><h3 class="search-panel__title">Переглянуті товари</h3><a class="search-panel__link" href="#">Усі переглянуті товари' + ICON_CHEVRON + '</a></div><div class="search-cards">' + VIEWED.map(cardHtml).join("") + '</div></div></div><div class="search-drop__state" data-state="results" hidden><div class="search-mega"><aside class="search-mega__aside">' + FACETS.map(facetHtml).join("") + '</aside><div class="search-mega__groups">' + GROUPS.map(groupHtml).join("") + "</div></div></div></div>";
    return drop;
  }
  ready(function() {
    const HTML = document.documentElement;
    var search = document.querySelector(".header__search");
    if (!search || search.hasAttribute("data-search-ready")) return;
    var input = search.querySelector(".header__search-input");
    if (!input) return;
    var container = search.parentElement;
    search.setAttribute("data-search-ready", "");
    var field = document.createElement("div");
    field.className = "search__field";
    search.insertBefore(field, input);
    field.appendChild(input);
    var tools = document.createElement("div");
    tools.className = "search__tools";
    tools.innerHTML = '<button type="button" class="search__mic" aria-label="Голосовий пошук">' + ICON_MIC + '</button><button type="button" class="search__clear" aria-label="Очистити" hidden>' + ICON_CLOSE + "</button>";
    field.appendChild(tools);
    var submit = document.createElement("button");
    submit.type = "button";
    submit.className = "search__submit";
    submit.innerHTML = "<span>Знайти</span>" + ICON_LOUPE;
    search.appendChild(submit);
    var drop = buildDrop();
    (container || search).appendChild(drop);
    var stateEmpty = drop.querySelector('[data-state="empty"]');
    var stateResults = drop.querySelector('[data-state="results"]');
    var micBtn = tools.querySelector(".search__mic");
    var clearBtn = tools.querySelector(".search__clear");
    var backdrop = document.createElement("div");
    backdrop.className = "search-backdrop";
    backdrop.setAttribute("data-search-backdrop", "");
    document.body.appendChild(backdrop);
    function render() {
      var has = input.value.trim().length > 0;
      micBtn.hidden = has;
      clearBtn.hidden = !has;
      stateEmpty.hidden = has;
      stateResults.hidden = !has;
    }
    function open() {
      if (drop.classList.contains("is-open")) return;
      search.classList.add("is-open");
      drop.classList.add("is-open");
      backdrop.classList.add("is-open");
      HTML.classList.add("search-open");
      render();
    }
    function close() {
      if (!drop.classList.contains("is-open")) return;
      search.classList.remove("is-open");
      drop.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      HTML.classList.remove("search-open");
    }
    input.addEventListener("focus", open);
    input.addEventListener("input", function() {
      open();
      render();
    });
    clearBtn.addEventListener("click", function() {
      input.value = "";
      render();
      input.focus();
    });
    function goToResults() {
      var q = input.value.trim();
      window.location.href = "/search-results.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    }
    submit.addEventListener("click", goToResults);
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        goToResults();
      }
    });
    drop.addEventListener("click", function(e) {
      if (e.target.closest("[data-search-close]")) close();
    });
    document.addEventListener("click", function(e) {
      if (search.contains(e.target) || drop.contains(e.target)) return;
      close();
    });
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && drop.classList.contains("is-open")) {
        close();
        input.blur();
      }
    });
    render();
  });
})();
(function() {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function() {
    var modeBox = document.querySelector("[data-price-mode]");
    if (modeBox) {
      modeBox.addEventListener("click", function(e) {
        var btn = e.target.closest("[data-price-mode-btn]");
        if (!btn) return;
        modeBox.querySelectorAll("[data-price-mode-btn]").forEach(function(b) {
          b.classList.toggle("is-active", b === btn);
        });
      });
    }
    var chip = document.querySelector("[data-search-chip]");
    if (chip) {
      chip.addEventListener("click", function() {
        chip.remove();
      });
    }
    var clear = document.querySelector("[data-search-clear]");
    if (clear) {
      clear.addEventListener("click", function() {
        var box = clear.closest(".catalog__selecteds");
        if (!box) return;
        box.querySelectorAll(".catalog__selected").forEach(function(c) {
          c.remove();
        });
      });
    }
  });
})();
