const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector("#currency-selector");
const currencySelectTo = document.querySelector("#currency-selector-to");

const rates = {
  BRL: 1,    // Real Brasileiro
  USD: 5.2,  // Dólar Americano
  EUR: 6.2,  // Euro
  GBP: 6.1,  // Libra Esterlina
  BTC: 100000 // Bitcoin (apenas uma taxa fictícia, substitua conforme necessário)
};

const currencyImages = {
  BRL: "./Assets/brasil 2.png", //real
  USD: "./Assets/estados-unidos (1) 1.png", //dolar 
  EUR: "./Assets/Design sem nome 3.png", //euro
  GBP: "./Assets/libra 1.png", // Imagem para Libra
  BTC: "./Assets/bitcoin 1.png" // Imagem para Bitcoin
};

// Função que realiza a conversão
function convertValues() {
  const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value.replace(/[^0-9.]/g, "")); // Extrair o valor numérico

  if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
    document.querySelector(".currency-value-to-convert").innerHTML = "Valor inválido";
    return;
  }

  const fromCurrency = currencySelectFrom.value;
  const toCurrency = currencySelectTo.value;

  if (fromCurrency === toCurrency) {
    document.querySelector(".currency-value-to-convert").innerHTML = "Selecione moedas diferentes";
    return;
  }

  // Convertendo de uma moeda para outra
  const convertedValue = inputCurrencyValue * (rates[toCurrency] / rates[fromCurrency]);

  // Atualizar o valor convertido para a moeda de origem
  document.querySelector(".currency-value-to-convert").innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: fromCurrency
  }).format(inputCurrencyValue);

  // Atualizar o valor convertido para a moeda de destino
  document.querySelector(".currency-value").innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: toCurrency
  }).format(convertedValue);

  // Atualizar a imagem da moeda convertida
  document.querySelector(".currency-img").src = currencyImages[toCurrency] || "";
  document.querySelector("#currency-name").innerHTML = getCurrencyName(toCurrency);
}

// Função que atualiza o nome da moeda
function getCurrencyName(currency) {
  switch (currency) {
    case "BRL": return "Real Brasileiro";
    case "USD": return "Dólar Americano";
    case "EUR": return "Euro";
    case "GBP": return "Libra Esterlina";
    case "BTC": return "Bitcoin";
    default: return "Moeda desconhecida";
  }
}

// Função que altera a moeda de destino
function updateCurrencyInfo() {
  const selectedCurrency = currencySelectTo.value;
  document.querySelector("#currency-name").innerHTML = getCurrencyName(selectedCurrency);
  document.querySelector(".currency-img").src = currencyImages[selectedCurrency] || "";

  convertValues(); // Chama a conversão quando o destino for alterado
}

// Adicionando ouvintes de evento
currencySelectFrom.addEventListener("change", convertValues);  // Quando a moeda de origem mudar, converte
currencySelectTo.addEventListener("change", updateCurrencyInfo); // Quando a moeda de destino mudar, atualiza a imagem
convertButton.addEventListener("click", convertValues); // Ao clicar no botão "Converter", realiza a conversão
