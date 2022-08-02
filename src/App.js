import "./App.css";
import CurrencyInput from "./CurrencyInput";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmountOne] = useState(1);
  const [amount2, setAmountTwo] = useState(1);
  const [currency1, setCurrencyOne] = useState("USD");
  const [currency2, setCurrencyTwo] = useState("USD");
  const [rates, getRates] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/exchangerates_data/latest?apikey=4UYqjCM5zL4hKb4tGCc1bS2Uuy3uQzDf"
      )
      .then((response) => {
        getRates(response.data.rates);
      });
  }, []);

  return (
    <div className="App">
      <CurrencyInput
        onAmountChange={setAmountOne}
        onCurrencyChange={setCurrencyOne}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onCurrencyChange={setCurrencyTwo}
        onAmountChange={setAmountTwo}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
}

export default App;
