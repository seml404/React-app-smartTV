import React, { useEffect, useState } from "react";
import background from "../../assets/screen-back.png";
import { renderNumbers } from "../../services";
export default function SecondScreen(props) {
  let [number, setNumber] = useState(0);
  let [itemChoosen, setItemChoosen] = useState({ x: 0, y: 0 });
  let [keyCoordinates, setKeyCoordinates] = useState("");
  let [navInitiated, setNavInitiated] = useState(false);

  useEffect(() => {
    document.querySelector("body").addEventListener("keydown", (e) => {
      if (e.key.toLowerCase().includes("arrow")) {
        handleNavigate(e);
      }
    });
  });

  function handleNumberClick(e) {
    console.log(e.target.innerHTML);
  }

  function renderLines() {
    let lines = [];
    for (let line = 0, startNumber = 1; line < 4; line++) {
      lines[line] = (
        <div className="phone-number-line" key={line + "line"}>
          {renderNumbers(startNumber, line, handleNumberClick)}
        </div>
      );
      startNumber += 3;
    }
    return lines;
  }

  function toggleActiveNumber(obj) {
    console.log(obj);

    document
      .querySelector(`#pn${obj.x}${obj.y}`)
      .classList.toggle("phone-number-item-active");
  }

  function handleNavigate(e) {
    console.log(e.key);
    if (!navInitiated) {
      toggleActiveNumber(itemChoosen);
    }
  }

  return (
    <>
      <div
        className="screen-container-back"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="banner banner-big">
          <div className="banner-title">
            <p>Введите ваш номер </p>
            <p>мобильного телефона</p>
          </div>
          <div className="banner-number">{`+7(${number})`}</div>
          <p className="banner-text">
            и с Вами свяжется наш менеждер для дальнейшей консультации
          </p>
          <div className="phone-number">{renderLines()}</div>
          <button className="btn banner-btn">
            <p>OK</p>
          </button>
        </div>
      </div>
    </>
  );
}
