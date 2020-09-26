const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  // console.log(currency_one);
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((statusError) => {
          throw new Error(
            `Fetch error: ${statusError.error_type} (${res.statusText} - ${res.status})`
          );
        });
      }
    })
    .then(data => {
      console.log(data);
      for (const tags in data.rates) {
        let tag = document.createElement("option");
        tag.textContent = `${tags}`;
        tag.value = tags;
        document.querySelector("#currency-one").appendChild(tag);
      }
      for (const tags in data.rates) {
        let tag = document.createElement("option");
        tag.textContent = `${tags}`;
        tag.value = tags;
        document.querySelector("#currency-two").appendChild(tag);
      }

      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
    .catch(error => {
      console.error(error);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();
