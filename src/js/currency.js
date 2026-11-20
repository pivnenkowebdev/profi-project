// Переключатель валют в секции «Стоимость»: $ / €
const KEY = "anton-code-currency";
const buttons = document.querySelectorAll("[data-currency-btn]");

function setCurrency(currency) {
  document.querySelectorAll("[data-usd]").forEach((el) => {
    el.textContent = el.dataset[currency];
  });
  buttons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.currencyBtn === currency);
  });
}

function getStartCurrency() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "usd" || saved === "eur") return saved;
  } catch (e) {}
  // Европейский часовой пояс — показываем евро
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  return zone.startsWith("Europe/") ? "eur" : "usd";
}

if (buttons.length) {
  setCurrency(getStartCurrency());

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currency = btn.dataset.currencyBtn;
      setCurrency(currency);
      try {
        localStorage.setItem(KEY, currency);
      } catch (e) {}
    });
  });
}
