import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(1);
  const [currencyOne, setCurrencyOne] = useState("NGN");
  const [currencyTwo, setCurrencyTwo] = useState("USD");
  const [rates, getRates] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/exchangerates_data/latest?apikey=4UYqjCM5zL4hKb4tGCc1bS2Uuy3uQzDf"
      )
      .then((response) => {
        getRates(response.data.rates);
      });
  }, [rates]);

  useEffect(() => {
    if (!!rates) {
      handleAmountOneChange(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmountOneChange(amountOne) {
    setAmountTwo(format((amountOne * rates[currencyTwo]) / rates[currencyOne]));
    setAmountOne(amountOne);
  }
  function handleCurrencyOneChange(currencyOne) {
    setAmountTwo(format((amountOne * rates[currencyTwo]) / rates[currencyOne]));
    setCurrencyOne(currencyOne);
  }

  function handleAmountTwoChange(amountTwo) {
    setAmountOne(format((amountTwo * rates[currencyOne]) / rates[currencyTwo]));
    setAmountTwo(amountTwo);
  }
  function handleCurrencyTwoChange(currencyTwo) {
    setAmountOne(format((amountTwo * rates[currencyOne]) / rates[currencyTwo]));
    setCurrencyTwo(currencyTwo);
  }

  return (
    <div className="App">
      <CurrencyInput
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
        currencies={Object.keys(rates)}
        amount={amountOne}
        currency={currencyOne}
      />
      <CurrencyInput
        onCurrencyChange={handleCurrencyTwoChange}
        onAmountChange={handleAmountTwoChange}
        currencies={Object.keys(rates)}
        amount={amountTwo}
        currency={currencyTwo}
      />
    </div>
  );
}

export default App;
