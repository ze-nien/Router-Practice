import React from "react";

const NumberPad = ({ onSelect }) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div className="flex flex-col ml-5">
        <h3>NumberPod</h3>
        <div className="grid grid-cols-3 border flex-1">
          {nums.map((n) => (
            <button className="border" key={n} onClick={() => onSelect(n)}>
              {n}
            </button>
          ))}
          <button>Clear</button>
        </div>
      </div>
    </>
  );
};

export default NumberPad;
