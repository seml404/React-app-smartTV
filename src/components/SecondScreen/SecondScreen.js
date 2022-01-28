import React, { Component } from "react";
import {
  renderNumbers,
  renderNumSymbol,
  renderPhoneNumber,
} from "../../services";
import background from "../../assets/screen-back.png";

export default class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: renderNumSymbol(),
      lastNumberIdx: 0,
      itemChoosen: { x: 0, y: 0 },
      keyCoordinates: "",
      navInitiated: false,
    };
    this.handleBtnNumberClick = this.handleBtnNumberClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.definePhoneNumber = this.definePhoneNumber.bind(this);
    this.correctPhoneNumber = this.correctPhoneNumber.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.toggleActiveNumber = this.toggleActiveNumber.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  componentDidMount() {
    document.querySelector("body").addEventListener("keydown", (e) => {
      if (e.key.toLowerCase().includes("arrow")) {
        this.handleNavigate(e);
      } else if (!isNaN(+e.key) || e.key === "Backspace") {
        this.handleNumberClick(e);
      }
    });
  }

  handleBtnNumberClick(e) {
    console.log(this.state.phoneNumber, "is phone number");
    console.log(this.state.lastNumberIdx, "is lastNumberIdx");
  }
  handleNumberClick(e) {
    if (e.target.innerHTML === "Стереть" || e.key === "Backspace") {
      this.correctPhoneNumber();
    } else {
      !isNaN(+e.key)
        ? this.definePhoneNumber(e.key)
        : this.definePhoneNumber(e.target.innerHTML);
    }
  }

  definePhoneNumber(value) {
    const { phoneNumber, lastNumberIdx } = this.state;
    console.log(phoneNumber, "is phone number");
    console.log(lastNumberIdx, "is lastNumberIdx");
    if (!isNaN(phoneNumber[lastNumberIdx])) {
      this.setState(({ phoneNumber }) => {
        let newN = [...phoneNumber];
        let idx =
          lastNumberIdx !== phoneNumber.length - 1
            ? lastNumberIdx + 1
            : lastNumberIdx;
        newN[idx] = value;
        return { phoneNumber: newN };
      });
      this.setState(({ lastNumberIdx }) => {
        let idx =
          lastNumberIdx !== phoneNumber.length - 1
            ? lastNumberIdx + 1
            : lastNumberIdx;
        return { lastNumberIdx: idx };
      });
    } else {
      this.setState(({ phoneNumber }) => {
        let newN = [...phoneNumber];
        newN[0] = value;
        return { phoneNumber: newN };
      });
    }
  }

  correctPhoneNumber() {
    const { lastNumberIdx } = this.state;
    if (lastNumberIdx > 0) {
      this.setState(({ phoneNumber }) => {
        let newN = [...phoneNumber];
        newN[lastNumberIdx] = "_";
        return { phoneNumber: newN };
      });
      this.setState(({ lastNumberIdx }) => {
        return { lastNumberIdx: lastNumberIdx - 1 };
      });
    } else {
      this.setState(({ phoneNumber }) => {
        let newN = [...phoneNumber];
        newN[0] = "_";
        return { phoneNumber: newN };
      });
    }
  }

  renderLines() {
    let lines = [];
    for (let line = 0, startNumber = 1; line < 4; line++) {
      lines[line] = (
        <div className="phone-number-line" key={line + "line"}>
          {renderNumbers(startNumber, line, this.handleNumberClick)}
        </div>
      );
      startNumber += 3;
    }
    return lines;
  }

  toggleActiveNumber(obj) {
    console.log(obj);
    document
      .querySelector(`#pn${obj.x}${obj.y}`)
      .classList.toggle("phone-number-item-active");
  }

  handleNavigate(e) {
    const { phoneNumber, lastNumberIdx, navInitiated, itemChoosen } =
      this.state;
    console.log(phoneNumber, "is phone number");
    console.log(lastNumberIdx, "is lastNumberIdx");
    console.log(e.key);
    if (!navInitiated) {
      this.toggleActiveNumber(itemChoosen);
    }
  }

  render() {
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
            <div className="banner-number">
              {renderPhoneNumber(this.state.phoneNumber)}
            </div>
            <p className="banner-text">
              и с Вами свяжется наш менеждер для дальнейшей консультации
            </p>
            <div className="phone-numbers">{this.renderLines()}</div>
            <button className="btn banner-btn">
              <p>OK</p>
            </button>
          </div>
        </div>
      </>
    );
  }
}
