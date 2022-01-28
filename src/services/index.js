export function renderNumbers(value, line, handleClickFunction) {
  console.log("used");
  let nums = [];
  for (let i = 0; i < 3; i++, value++) {
    switch (value) {
      case 10:
        nums.push(
          <div
            className="keyboard-numbers-item keyboard-numbers-item-word"
            name="erase"
            key={value}
            id={"pn" + i + line}
            onClick={(e) => handleClickFunction(e)}
          >
            Стереть
          </div>
        );
        break;
      case 11:
        nums.push(
          <div
            className="keyboard-numbers-item"
            name="0"
            key={value}
            id={"pn" + i + line}
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
            className="keyboard-numbers-item"
            name={value}
            key={value}
            id={"pn" + i + line}
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
