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
