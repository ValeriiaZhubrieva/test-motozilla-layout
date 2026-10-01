(function() {
  /*!
  	Стан авторизації користувача в шапці
  
  	HTML містить готові блоки:
  
  	DESKTOP:
  	• [data-account] — блок авторизованого користувача
  	• [data-fls-popup-link="popup-login"] — кнопка «Увійти»
  
  	MOBILE:
  	• [data-account-mob] — блок авторизованого користувача
  	• [data-account-mob-login] — блок для неавторизованого
  	  користувача (текст + кнопка «Вхід | Реєстрація»)
  
  	Цей модуль ТІЛЬКИ:
  	• зберігає стан авторизації (localStorage mz-auth)
  	• показує/ховає готові блоки
  	• обробляє вхід (submit форми) і вихід (data-account-logout)
  
  	Dropdown-ом акаунта цей файл НЕ керує напряму —
  	за це відповідає окремий account-dropdown.js.
  	Щоб закрити dropdown при виході, ми лише диспатчимо
  	подію "account:close-dropdown" на document — без
  	прямого виклику чужих функцій.
  
  	ВИДАЛЕННЯ:
  	Якщо цей файл прибрати зі сторінки повністю —
  	dropdown (account-dropdown.js) продовжить працювати
  	без помилок. Блоки авторизації просто залишаться
  	в дефолтному (авторизованому) стані, бо він заданий
  	прямо в HTML/CSS, а не JS.
  
  	localStorage:
  	• mz-auth = "1" → користувач увійшов
  	• mz-auth = "0" → гість
  	Якщо ключа ще немає — за замовчуванням користувач
  	авторизований.
      */
  var KEY = "mz-auth";
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  function isAuthed() {
    var value = localStorage.getItem(KEY);
    return value === null ? true : value === "1";
  }
  function setAuthed(state) {
    localStorage.setItem(KEY, state ? "1" : "0");
  }
  function requestCloseDropdown() {
    document.dispatchEvent(new CustomEvent("account:close-dropdown"));
  }
  ready(function() {
    var account = document.querySelector("[data-account]");
    var loginButtons = document.querySelectorAll('[data-fls-popup-link="popup-login"]');
    var mobileAccount = document.querySelector("[data-account-mob]");
    var mobileLogin = document.querySelector("[data-account-mob-login]");
    if (!account && !loginButtons.length && !mobileAccount && !mobileLogin) {
      return;
    }
    function render() {
      var authed = isAuthed();
      if (account) {
        account.hidden = !authed;
        if (!authed) {
          requestCloseDropdown();
        }
      }
      loginButtons.forEach(function(button) {
        if (!button.closest(".mob-menu__login")) {
          button.hidden = authed;
        }
      });
      if (mobileAccount) {
        mobileAccount.hidden = !authed;
      }
      if (mobileLogin) {
        mobileLogin.hidden = authed;
      }
    }
    document.addEventListener("click", function(e) {
      var logoutBtn = e.target.closest("[data-account-logout]");
      if (!logoutBtn) return;
      e.preventDefault();
      setAuthed(false);
      render();
    });
    var loginForm = document.querySelector(".popup--login .popup__login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        setAuthed(true);
        render();
        if (window.flsPopup && typeof window.flsPopup.close === "function") {
          window.flsPopup.close();
        }
        document.documentElement.classList.remove("popup-show", "lock");
      });
    }
    render();
  });
})();
