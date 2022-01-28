export function renderNumbers(value, line, handleClickFunction) {
  let nums = [];
  for (let i = 0; i < 3; i++, value++) {
    switch (value) {
      case 10:
        nums.push(
          <div
            className="phone-number-item phone-number-item-word"
            name="erase"
            key={value}
            id={"pn" + line + i}
            onClick={(e) => handleClickFunction(e)}
          >
            Стереть
          </div>
        );
        break;
      case 11:
        nums.push(
          <div
            className="phone-number-item"
            name="0"
            key={value}
            id={"pn" + line + i}
            onClick={(e) => handleClickFunction(e)}
          >
            0
          </div>
        );
        break;
      case 12:
        break;
      default:
        nums.push(
          <div
            className="phone-number-item"
            name={value}
            key={value}
            id={"pn" + line + i}
            onClick={(e) => handleClickFunction(e)}
          >
            {value}
          </div>
        );
        break;
    }
  }
  return nums;
}

export function renderNumSymbol() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push("_");
  }
  return arr;
}

export function renderPhoneNumber(number) {
  return `+7(${number[0]}${number[1]}${number[2]})${number[3]}${number[4]}${number[5]}-${number[6]}${number[7]}-${number[8]}${number[9]}`;
}

// export function setEVentListeners(func1, func2) {
//   document.querySelector("body").addEventListener("keydown", (e) => {
//     if (e.key.toLowerCase().includes("arrow")) {
//       func1(e);
//     } else if (!isNaN(+e.key) || e.key === "Backspace") {
//       func2(e);
//     }
//   });
// }
