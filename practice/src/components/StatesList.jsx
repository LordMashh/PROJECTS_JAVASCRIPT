import React from "react";
import { useState } from "react";
const countries = [
  { name: "India", value: "In", cities: ["Delhi", "Mumbai"] },
  { name: "Pak", value: "PK", cities: ["Lahore", "Karachi"] },
  { name: "Bangladesh", value: "BG", cities: ["Dhaka", "Chittagong"] },
];

export default function Stateslist() {
  // states to store country value
  const [country, setCountry] = useState("");
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1>stateslist</h1>
      <div className="flex gap-5">
        <select
          value={country}
          onChange={(e) => {
            console.log(e.target.value);
            setCountry(e.target.value);
          }}
        >
          {countries.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
  
        <select>
          {countries
            .find((item) => item.value === country)
            ?.cities.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
  
}
