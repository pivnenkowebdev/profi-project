// Согласие на cookie и пиксель Meta.
// Пиксель загружается только после нажатия «Принять».
// Сигнал Global Privacy Control считается отказом.

const STORAGE_KEY = "anton-code-consent";
const PIXEL_ID = "2091556748224312";
const MAX_AGE_DAYS = 365;

function readChoice() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return null;
    const ageDays = (Date.now() - saved.date) / 86400000;
    if (ageDays > MAX_AGE_DAYS) return null;
    return saved.value;
  } catch {
    return null;
  }
}

function saveChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, date: Date.now() }));
  } catch {
    // хранилище недоступно — спросим снова при следующем визите
  }
}

function loadPixel() {
  if (window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

function removePixelCookies() {
  ["_fbp", "_fbc"].forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
  });
}

function createBanner() {
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Согласие на использование файлов cookie");
  banner.innerHTML = `
    <p class="cookie-banner__text">
      <strong>Я преподаю сам, без большой школы за спиной.</strong>
      Cookie и пиксель Meta показывают, какая реклама действительно приводит родителей, —
      так я трачу меньше на рекламу и больше времени уделяю урокам.
      Включаются только с вашего согласия, отозвать можно в любой момент.
      <a href="legal/privacy.html#cookies">Подробнее</a>
    </p>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-banner__btn" data-consent="denied">Отклонить</button>
      <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-consent="granted">Принять</button>
    </div>`;

  banner.addEventListener("click", (event) => {
    const button = event.target.closest("[data-consent]");
    if (!button) return;
    const value = button.dataset.consent;
    const wasGranted = readChoice() === "granted";
    saveChoice(value);
    banner.remove();

    if (value === "granted") {
      loadPixel();
    } else if (wasGranted) {
      // согласие отозвано: удаляем cookie и перезагружаем страницу, чтобы выгрузить пиксель
      removePixelCookies();
      location.reload();
    }
  });

  document.body.append(banner);
}

const gpc = navigator.globalPrivacyControl === true;
const choice = readChoice();

if (choice === "granted" && !gpc) {
  loadPixel();
} else if (choice === null && !gpc) {
  createBanner();
}

// «Настройки cookie» в футере — показать баннер снова
document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!document.querySelector(".cookie-banner")) createBanner();
  });
});

// Событие Contact — клик по ссылке на Telegram (только если пиксель включён)
document.addEventListener("click", (event) => {
  if (event.target.closest('a[href*="t.me/"]') && window.fbq) {
    window.fbq("track", "Contact");
  }
});
