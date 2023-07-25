const dropdown = document.querySelector("#dropdown");
const result = document.querySelector("#container-result");
const resultCurrency = document.querySelector("#result-currency");

const beforeDate = document.querySelector("#beforeDate");
const nowDate = document.querySelector("#Date");

const getData = (date) => {
  // функция приведения даты к требуемому виду
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const month =
    date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const seconds =
    date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;

  return `${day}/${month}/${date.getFullYear()}, ${hours}:${minutes}:${seconds}`;
};

const getCurrency = (currency, curDate, prevDate) => {
  // функция изменения в графическом интерфейсе
  const currentDateAndTime = new Date(curDate);
  const previousDateAndTime = new Date(prevDate);

  for (const keys of Object.values(currency)) {
    const option = document.createElement("option");
    option.classList.add("dropdown-item");
    option.value = `${keys.NumCode}`;
    option.name = `${keys.Name}`;
    option.textContent = `${keys.ID} - ${keys.Name}`;
    dropdown.appendChild(option);
  }
  dropdown.addEventListener("change", (e) => {
    result.style.opacity = 1;
    for (const keys of Object.values(currency)) {
      if (e.target.value === `${keys.NumCode}`) {
        resultCurrency.textContent = `${keys.ID} - ${keys.Name} (${keys.CharCode}).`;
        nowDate.textContent = `${getData(currentDateAndTime)} - ${keys.Value}`;
        beforeDate.textContent = `${getData(previousDateAndTime)} - ${
          keys.Previous
        }`;
      }
    }
  });
};

const getCurrencyDataAPI = async () => {
  // функция получения данных с API методом fetch
  try {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    if (!response.ok) {
      throw new Error("Ошибка при получении данных!");
    }
    const data = await response.json();
    console.log(data);
    const currency = data.Valute;
    const nowDate = data.Date;
    const beforeDate = data.PreviousDate;
    getCurrency(currency, nowDate, beforeDate);
  } catch (error) {
    console.log(`Ошибка при получении данных: ${error.message}`);
    alert(`Произошла ошибка... Не можем предоставить Вам данные по валюте...`);
  }
};

getCurrencyDataAPI();
