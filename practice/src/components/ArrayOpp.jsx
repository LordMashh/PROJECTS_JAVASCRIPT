import React from "react";
import { useState } from "react";

function ArrayOpp() {
  const [input, setInput] = useState();
  const [initial, setInitial] = useState(["1"]);

  function insert() {
    const updated = [...initial];
    updated.push(input);
    setInitial(updated);
  }
  function del() {
    const updated = [...initial];
    updated.pop();
    setInitial(updated);
  }
//   function update(index) {
//     const updated1 = [...initial];
//     updated1.splice(index,1,input);
//     setInitial(updated1);
//   }
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        className="mt-3  border-2"
        placeholder="Enter a Value"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <div className="mt-3"> Given Output is {initial} </div>
      <button onClick={insert}>add</button>
      <table border="2px" className="border-2 ">
        <thead>
          <tr>
            <td>values</td>
            <td>Buttons</td>
          </tr>
        </thead>
        <tbody>
          {initial.map((item, index) => (
            <>
              <tr >
                <td key={index}>{item}</td>
                <td>
                  {/* <button onClick={update(index)}>update</button> */}
                  <button className="ml-3" onClick={del}>delete</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArrayOpp;
