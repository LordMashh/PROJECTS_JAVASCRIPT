import React from "react";
import useTicTac from "../hooks/useTicTac";

const TicTac = () => {
  const { board, message, handleReset, handleClick } = useTicTac();
  return (
    <div className="mt-20 max-w-[300px] text-center mx-auto">
      <h1>TicTacToe Game</h1>
      <div className="flex gap-6 justify-between mx-2 p-4 items-center">
        {message()}
        <button className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded"
        onClick={handleReset}>Reset Game</button>
      </div>
      <div className="grid grid-cols-3  ">
        {board.map((item, index) => (
          <button
            className="w-[100px] h-[100px] border-black border hover:bg-slate-300 text-lg" 
            key={index}
            onClick={() => handleClick(index)}
            disabled={item !== null}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTac;
