const form = document.getElementById("registration-form");
const message = document.getElementById("form-message");

function showMessage(text, isSuccess) {
  message.textContent = text;
  message.classList.remove("d-none", "alert-success", "alert-danger");
  message.classList.add(isSuccess ? "alert-success" : "alert-danger");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const participants = Number(document.getElementById("participants").value);

  if (!name || !email) {
    showMessage("Помилка: заповніть ім'я та email.", false);
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage("Помилка: введіть коректний email.", false);
    return;
  }

  if (!(participants > 0)) {
    showMessage("Помилка: кількість учасників має бути більшою за нуль.", false);
    return;
  }

  showMessage("Реєстрація успішна!", true);
  form.reset();
});

const priceForm = document.getElementById("price-form");
const priceMessage = document.getElementById("price-message");
const priceResult = document.getElementById("price-result");
const standardPrice = 400;
const vipPrice = 800;
const promoValue = 50;

function money(amount) {
  return amount + " грн";
}

priceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const category = document.getElementById("category").value;
  const tickets = Number(document.getElementById("tickets").value);
  const promoCode = document.getElementById("promo").value.trim();

  if (!(tickets > 0)) {
    priceMessage.textContent = "Помилка: введіть кількість квитків більшу за нуль.";
    priceMessage.classList.remove("d-none", "alert-warning");
    priceMessage.classList.add("alert-danger");
    priceResult.classList.add("d-none");
    return;
  }

  let ticketPrice = standardPrice;
  let categoryName = "Standard";

  if (category === "vip") {
    ticketPrice = vipPrice;
    categoryName = "VIP";
  } else {
    ticketPrice = standardPrice;
    categoryName = "Standard";
  }

  const baseCost = ticketPrice * tickets;
  let discountRate = 0;

  if (tickets >= 5) {
    discountRate = 0.2;
  } else if (tickets >= 3 && tickets <= 4) {
    discountRate = 0.1;
  } else {
    discountRate = 0;
  }

  const discountAmount = baseCost * discountRate;
  const costAfterPercent = baseCost - discountAmount;

  let promoDiscount = 0;
  let promoText = "не вказано, 0 грн";
  let promoWarning = "";

  if (promoCode === "EVENT50") {
    promoDiscount = promoValue;
    promoText = "EVENT50, −" + promoValue + " грн";
  } else if (promoCode !== "") {
    promoDiscount = 0;
    promoText = "не застосовано, 0 грн";
    promoWarning = "Промокод недійсний. Розрахунок показано без нього.";
  } else {
    promoDiscount = 0;
    promoText = "не вказано, 0 грн";
  }

  let totalCost = costAfterPercent - promoDiscount;

  if (totalCost < 0) {
    promoDiscount = costAfterPercent;
    totalCost = 0;
    promoText = "EVENT50, −" + promoDiscount + " грн";
  }

  document.getElementById("result-category").textContent = categoryName;
  document.getElementById("result-ticket-price").textContent = money(ticketPrice);
  document.getElementById("result-tickets").textContent = String(tickets);
  document.getElementById("base-cost").textContent = money(baseCost);
  document.getElementById("discount-amount").textContent = discountAmount + " грн (" + (discountRate * 100) + "%)";
  document.getElementById("after-percent").textContent = money(costAfterPercent);
  document.getElementById("promo-amount").textContent = promoText;
  document.getElementById("total-cost").textContent = money(totalCost);

  if (promoWarning) {
    priceMessage.textContent = promoWarning;
    priceMessage.classList.remove("d-none", "alert-danger");
    priceMessage.classList.add("alert-warning");
  } else {
    priceMessage.classList.add("d-none");
  }

  priceResult.classList.remove("d-none");
});
