import React from "react";
import { useState } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [exchange, setExchange] = useState(0);

const currencyrate = 82; // 1 rupee to dollar

 
const handlechange = (e) => {
    const input = parseFloat(e.target.value) || 0;
    console.log(e.target.value);
    setAmount(input);
      setExchange(input * 85)
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl p-5">Currency converter</h1>
      <label className="flex gap-3">
        Enter the amount for conversion
        <input
          type="number"
        gtgt
          onChange={handlechange}
          className="border-2 border-black w-max items-center px-2"
          placeholder="Enter Ruppes to Change "
        />
      </label>
      <div className="mt-6">conversion rate is 1 rupees = {currencyrate} $ </div>
      
      <div className="mt-6">Your Exchange amount is {exchange} $ </div>
      
    </div>
  );
}
export default CurrencyConverter;
