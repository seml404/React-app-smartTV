import React, { Component } from "react";
import check from "../../assets/check.svg";
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
      numberFilled: false,
      permissionGranted: false,
    };
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
      } else if (e.key === "Enter") {
        this.handleSubmit(e);
      }
    });
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
        <div className="keyboard-numbers-line" key={line + "line"}>
          {renderNumbers(startNumber, line, this.handleNumberClick)}
        </div>
      );
      startNumber += 3;
    }
    return lines;
  }

  toggleActiveNumber(obj) {
    document
      .querySelector(`#pn${obj.x}${obj.y}`)
      .classList.toggle("item-active");
  }

  togglePermission() {
    this.setState(({ permissionGranted }) => ({
      permissionGranted: !permissionGranted,
    }));
  }

  handleNavigate(e) {
    const { navInitiated, itemChoosen } = this.state;
    if (!navInitiated) {
      this.toggleActiveNumber(itemChoosen);
      this.setState({ navInitiated: true });
    } else {
      let direction = e.key.toLowerCase().substring(5);
      switch (direction) {
        case "right": {
          if (itemChoosen.y === 4 || itemChoosen.y === 5) {
            break;
          } else if (itemChoosen.y !== 3 && itemChoosen.x === 2) {
            this.toggleActiveNumber(itemChoosen);
            this.setState(({ itemChoosen }) => {
              this.toggleActiveNumber({ ...itemChoosen, x: 0 });
              return { itemChoosen: { ...itemChoosen, x: 0 } };
            });
            break;
          } else if (itemChoosen.y === 3) {
            this.toggleActiveNumber(itemChoosen);
            if (itemChoosen.x === 1) {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ ...itemChoosen, x: 0 });
                return { itemChoosen: { ...itemChoosen, x: 0 } };
              });
              break;
            } else {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({
                  ...itemChoosen,
                  x: itemChoosen.x + 1,
                });
                return {
                  itemChoosen: { ...itemChoosen, x: itemChoosen.x + 1 },
                };
              });
            }
            break;
          } else {
            this.toggleActiveNumber(itemChoosen);
            this.setState(({ itemChoosen }) => {
              this.toggleActiveNumber({
                ...itemChoosen,
                x: itemChoosen.x + 1,
              });
              return {
                itemChoosen: { ...itemChoosen, x: itemChoosen.x + 1 },
              };
            });
            break;
          }
        }
        case "left": {
          if (itemChoosen.y === 4 || itemChoosen.y === 5) {
            break;
          } else if (itemChoosen.y === 3) {
            this.toggleActiveNumber(itemChoosen);
            if (itemChoosen.x === 0) {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ ...itemChoosen, x: 1 });
                return { itemChoosen: { ...itemChoosen, x: 1 } };
              });
              break;
            } else {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({
                  ...itemChoosen,
                  x: itemChoosen.x - 1,
                });
                return {
                  itemChoosen: { ...itemChoosen, x: itemChoosen.x - 1 },
                };
              });
            }
          } else if (itemChoosen.x === 0) {
            this.toggleActiveNumber(itemChoosen);
            this.setState(({ itemChoosen }) => {
              this.toggleActiveNumber({ ...itemChoosen, x: 2 });
              return { itemChoosen: { ...itemChoosen, x: 2 } };
            });
            break;
          } else {
            this.toggleActiveNumber(itemChoosen);
            this.setState(({ itemChoosen }) => {
              this.toggleActiveNumber({ ...itemChoosen, x: itemChoosen.x - 1 });
              return { itemChoosen: { ...itemChoosen, x: itemChoosen.x - 1 } };
            });
          }
          break;
        }
        case "down": {
          this.toggleActiveNumber(itemChoosen);
          if (itemChoosen.y === 2) {
            if (itemChoosen.x !== 2) {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ x: 0, y: 3 });
                return { itemChoosen: { x: 0, y: 3 } };
              });
            } else {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ x: 1, y: 3 });
                return { itemChoosen: { x: 1, y: 3 } };
              });
            }
          } else if (itemChoosen.y === 3) {
            this.setState(() => {
              this.toggleActiveNumber({ x: 0, y: 4 });
              return { itemChoosen: { x: 0, y: 4 } };
            });
          } else if (itemChoosen.y === 4) {
            this.setState(() => {
              this.toggleActiveNumber({ x: 0, y: 5 });
              return { itemChoosen: { x: 0, y: 5 } };
            });
          } else if (itemChoosen.y === 5) {
            this.setState(() => {
              this.toggleActiveNumber({ x: 0, y: 0 });
              return { itemChoosen: { x: 0, y: 0 } };
            });
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveNumber({ ...itemChoosen, y: itemChoosen.y + 1 });
              return { itemChoosen: { ...itemChoosen, y: itemChoosen.y + 1 } };
            });
          }
          break;
        }
        case "up": {
          this.toggleActiveNumber(itemChoosen);
          if (itemChoosen.y === 0) {
            if (itemChoosen.x !== 2) {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ x: 0, y: 5 });
                return { itemChoosen: { x: 0, y: 5 } };
              });
            } else {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ x: 1, y: 3 });
                return { itemChoosen: { x: 1, y: 3 } };
              });
            }
          } else if (itemChoosen.y === 3) {
            if (itemChoosen.x !== 1) {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ x: 0, y: 2 });
                return { itemChoosen: { x: 0, y: 2 } };
              });
            } else {
              this.setState(({ itemChoosen }) => {
                this.toggleActiveNumber({ x: 2, y: 2 });
                return { itemChoosen: { x: 2, y: 2 } };
              });
            }
          } else if (itemChoosen.y === 4) {
            this.setState(() => {
              this.toggleActiveNumber({ x: 0, y: 3 });
              return { itemChoosen: { x: 0, y: 3 } };
            });
          } else if (itemChoosen.y === 5) {
            this.setState(() => {
              this.toggleActiveNumber({ x: 0, y: 4 });
              return { itemChoosen: { x: 0, y: 4 } };
            });
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveNumber({ ...itemChoosen, y: itemChoosen.y - 1 });
              return { itemChoosen: { ...itemChoosen, y: itemChoosen.y - 1 } };
            });
          }
          break;
        }
        default: {
        }
      }
    }
  }

  render() {
    const { permissionGranted } = this.state;
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
            <div className="keyboard-container">{this.renderLines()}</div>
            <div className="check-box-container">
              <div
                className="check-box"
                id="pn04"
                onClick={() => this.togglePermission()}
              >
                {permissionGranted && <img src={check}></img>}
              </div>
              <div className="check-box-text">
                <p>Согласие на обработку</p>
                <p>персональных данных</p>
              </div>
            </div>

            <button className="btn btn-banner" id="pn05">
              <p>Подтвердить номер</p>
            </button>
          </div>
        </div>
      </>
    );
  }
}
