//currency exchange rates conversion from one currency to another.
let btn = document.querySelector("#convert");
let amountInput = document.getElementById("amount");
let fromCurrencySelect = document.getElementById("from-currency");
let toCurrencySelect = document.getElementById("to-currency");
let resultElement = document.getElementById("result");
let errorElement = document.getElementById("error");

fetch("https://open.er-api.com/v6/latest")
    .then(response => response.json())
    .then(data => {
        let currencies = Object.keys(data.rates);
       
        

        currencies.forEach(currency => {
            let option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option.cloneNode(true));
            toCurrencySelect.appendChild(option);
        });
    });

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let amount = amountInput.value;

    if (!amount || amount === "") {
       alert("Please enter a valid amount");
        return;
    } else {
        errorElement.innerText = '';
    }

    fetch(`https://open.er-api.com/v6/latest/${fromCurrencySelect.value}`)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[toCurrencySelect.value];
            let result = amount * exchangeRate;
            resultElement.style.color = "black";
            resultElement.style.display = "flex";
            resultElement.style.flexDirection = "row";
            resultElement.style.justifyContent = "space-between";
            resultElement.style.alignItems = "center";
            resultElement.innerHTML = `
             <p>${amount} ${fromCurrencySelect.value}</p>  <p>${result.toFixed(2)} ${toCurrencySelect.value}</p>`;
        });
});