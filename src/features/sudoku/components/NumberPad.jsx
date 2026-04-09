import React from "react";

const NumberPad = ({ handleInput, mistakes, maxMistakes }) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div className="flex flex-col ml-5">
        <h3>NumberPod</h3>
        <div className="grid grid-cols-3 border flex-1">
          {nums.map((n) => (
            <button className="border" key={n} onClick={() => handleInput(n)}>
              {n}
            </button>
          ))}
        </div>
        <button>Clear</button>
        <div className="text-lg font-semibold">
          錯誤次數:
          <span className={mistakes > 0 ? "text-red-500" : ""}>{mistakes}</span>
          / {maxMistakes}
        </div>
      </div>
    </>
  );
};

export default NumberPad;
