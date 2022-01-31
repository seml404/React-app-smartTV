import React, { Component } from "react";
import check from "../../assets/check.svg";
import { validatePhoneNumber } from "../../services";
import background from "../../assets/screen-back.png";
import { useNavigate } from "react-router-dom";
import qr from "../../assets/qr.svg";

class SecondScreenClassItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: this.renderNumSymbol(),
      lastNumberIdx: 0,
      itemChoosen: { x: 0, y: 0 },
      keyCoordinates: "",
      navInitiated: false,
      numberFilled: false,
      permissionGranted: false,
      numberIsFine: true,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.definePhoneNumber = this.definePhoneNumber.bind(this);
    this.correctPhoneNumber = this.correctPhoneNumber.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.toggleActiveItem = this.toggleActiveItem.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleNumBtnPush = this.handleNumBtnPush.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // установка слушателей событий нажатия кнопок

  onKeyDown(e) {
    const { navInitiated, itemChoosen } = this.state;
    if (e.key.toLowerCase().includes("arrow")) {
      if (navInitiated) {
        this.toggleActiveItem(itemChoosen);
        this.handleNavigate(e);
      } else {
        this.setState({ navInitiated: true });
        this.toggleActiveItem(itemChoosen);
      }
    } else if (e.key === "Backspace") {
      if (navInitiated) {
        this.toggleActiveItem(itemChoosen);
      } else {
        this.setState({ navInitiated: true });
      }
      this.correctPhoneNumber();
      this.setState(() => {
        this.toggleActiveItem({ x: 0, y: 3 });
        return { itemChoosen: { x: 0, y: 3 } };
      });
    } else if (e.key === "Enter") {
      this.handleEnterPush(e);
    } else if (!isNaN(+e.key)) {
      if (navInitiated) {
        this.toggleActiveItem(itemChoosen);
      } else {
        this.setState({ navInitiated: true });
      }
      this.handleNumBtnPush(e.key);
    }
  }

  componentDidMount() {
    document.querySelector("body").addEventListener("keydown", this.onKeyDown);
  }

  // вызов метода определения заполнения номера при каждом вводе цифры
  componentDidUpdate(prevProps, prevState) {
    if (prevState.phoneNumber !== this.state.phoneNumber) {
      this.setState({ numberIsFine: true });
      const { phoneNumber } = this.state;
      if (!isNaN(phoneNumber[phoneNumber.length - 1])) {
        this.setState({ numberFilled: true });
      } else {
        this.setState({ numberFilled: false });
      }
    }
  }

  // удаление слушателей событий нажатия кнопок при размонтировании компонента
  componentWillUnmount() {
    console.log("done");
    document
      .querySelector("body")
      .removeEventListener("keydown", this.onKeyDown);
  }

  // удаление последней цифры номера путем нажатия либо Backspace, либо клика по "стереть", либо наведения на кнопку "стереть" и нажатия клавиши Enter
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

  // функция записи номера при нажатии либо клавиш на клавиатуре, либо клика по цифрам на экранной клавиатуре, либо наведения на цифры и нажатия клавиши Enter
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

  // метод отрисовки строк на экранной клавиатуре
  renderLines() {
    let lines = [];
    for (let line = 0, startNumber = 1; line < 4; line++) {
      lines[line] = (
        <div className="keyboard-numbers-line" key={line + "line"}>
          {this.renderNumbers(startNumber, line, this.handleItemClick)}
        </div>
      );
      startNumber += 3;
    }
    return lines;
  }

  // метод отрисовки клавиш на экранной клавиатуре
  renderNumbers(value, line, handleClickFunction) {
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
              onClick={(e) => handleClickFunction(e.target)}
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
              onClick={(e) => handleClickFunction(e.target)}
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
              onClick={(e) => handleClickFunction(e.target)}
            >
              {value}
            </div>
          );
          break;
      }
    }
    return nums;
  }
  // метод отрисовки дефолтного значения телефонного номера
  renderNumSymbol() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push("_");
    }
    return arr;
  }
  // метод отрисовки телефонного номера
  renderPhoneNumber(number) {
    return `+7(${number[0]}${number[1]}${number[2]})${number[3]}${number[4]}${number[5]}-${number[6]}${number[7]}-${number[8]}${number[9]}`;
  }

  // метод указания активного (выбранного или нажатого) элемента на экранной клавиатуре, а также чекбока и основной кнопки
  toggleActiveItem(obj) {
    document
      .querySelector(`#pn${obj.x}${obj.y}`)
      .classList.toggle("item-active");
  }

  // метод установки/отзыва дачи согласия на обработку персональных данных
  togglePermission() {
    this.setState(({ permissionGranted }) => ({
      permissionGranted: !permissionGranted,
    }));
  }

  // метод обработки события клика по клавише на экранной клавиатуре (как мышью, так и путем наведения и нажатия на клавишу Enter)
  handleItemClick(itemClicked) {
    const { navInitiated, itemChoosen } = this.state;
    if (navInitiated) {
      this.toggleActiveItem(itemChoosen);
    } else {
      this.setState({ navInitiated: true });
    }
    if (itemClicked.innerHTML === "Стереть") {
      this.correctPhoneNumber();
      this.setState(() => {
        this.toggleActiveItem({ x: 0, y: 3 });
        return { itemChoosen: { x: 0, y: 3 } };
      });
    } else if (
      itemClicked.classList.contains("check-box") ||
      itemClicked.classList.contains("check-box-checked")
    ) {
      this.togglePermission();
      this.setState(() => {
        this.toggleActiveItem({ x: 0, y: 4 });
        return { itemChoosen: { x: 0, y: 4 } };
      });
    } else if (
      itemClicked.classList.contains("keyboard-numbers-item") &&
      !isNaN(+itemClicked.innerHTML)
    ) {
      this.definePhoneNumber(itemClicked.innerHTML);
      let coordinates = { x: +itemClicked.id[2], y: +itemClicked.id[3] };
      this.setState(() => {
        this.toggleActiveItem(coordinates);
        return { itemChoosen: coordinates };
      });
    } else if (itemClicked.classList.contains("btn-banner")) {
      this.handleSubmit(itemClicked.disabled);
      this.setState(() => {
        this.toggleActiveItem({ x: 0, y: 5 });
        return { itemChoosen: { x: 0, y: 5 } };
      });
    }
  }

  //метод навигации по экранной клавиатуре и основным кнопкам с помощью нажатия стрелок на клавиатуре
  handleNavigate(e) {
    const { itemChoosen } = this.state;
    let direction = e.key.toLowerCase().substring(5);
    switch (direction) {
      case "right": {
        if (itemChoosen.y === 4) {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ x: 0, y: 4 });
            return { itemChoosen: { x: 0, y: 4 } };
          });
          break;
        } else if (itemChoosen.y === 5) {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ x: 0, y: 5 });
            return { itemChoosen: { x: 0, y: 5 } };
          });
          break;
        } else if (itemChoosen.y !== 3 && itemChoosen.x === 2) {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ ...itemChoosen, x: 0 });
            return { itemChoosen: { ...itemChoosen, x: 0 } };
          });
          break;
        } else if (itemChoosen.y === 3) {
          if (itemChoosen.x === 1) {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ ...itemChoosen, x: 0 });
              return { itemChoosen: { ...itemChoosen, x: 0 } };
            });
            break;
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({
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
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({
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
        if (itemChoosen.y === 4) {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ x: 0, y: 4 });
            return { itemChoosen: { x: 0, y: 4 } };
          });
          break;
        } else if (itemChoosen.y === 5) {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ x: 0, y: 5 });
            return { itemChoosen: { x: 0, y: 5 } };
          });
          break;
        } else if (itemChoosen.y === 3) {
          if (itemChoosen.x === 0) {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ ...itemChoosen, x: 1 });
              return { itemChoosen: { ...itemChoosen, x: 1 } };
            });
            break;
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({
                ...itemChoosen,
                x: itemChoosen.x - 1,
              });
              return {
                itemChoosen: { ...itemChoosen, x: itemChoosen.x - 1 },
              };
            });
          }
        } else if (itemChoosen.x === 0) {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ ...itemChoosen, x: 2 });
            return { itemChoosen: { ...itemChoosen, x: 2 } };
          });
          break;
        } else {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ ...itemChoosen, x: itemChoosen.x - 1 });
            return { itemChoosen: { ...itemChoosen, x: itemChoosen.x - 1 } };
          });
        }
        break;
      }
      case "down": {
        if (itemChoosen.y === 2) {
          if (itemChoosen.x !== 2) {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ x: 0, y: 3 });
              return { itemChoosen: { x: 0, y: 3 } };
            });
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ x: 1, y: 3 });
              return { itemChoosen: { x: 1, y: 3 } };
            });
          }
        } else if (itemChoosen.y === 3) {
          this.setState(() => {
            this.toggleActiveItem({ x: 0, y: 4 });
            return { itemChoosen: { x: 0, y: 4 } };
          });
        } else if (itemChoosen.y === 4) {
          this.setState(() => {
            this.toggleActiveItem({ x: 0, y: 5 });
            return { itemChoosen: { x: 0, y: 5 } };
          });
        } else if (itemChoosen.y === 5) {
          this.setState(() => {
            this.toggleActiveItem({ x: 0, y: 0 });
            return { itemChoosen: { x: 0, y: 0 } };
          });
        } else {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ ...itemChoosen, y: itemChoosen.y + 1 });
            return { itemChoosen: { ...itemChoosen, y: itemChoosen.y + 1 } };
          });
        }
        break;
      }
      case "up": {
        if (itemChoosen.y === 0) {
          if (itemChoosen.x !== 2) {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ x: 0, y: 5 });
              return { itemChoosen: { x: 0, y: 5 } };
            });
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ x: 1, y: 3 });
              return { itemChoosen: { x: 1, y: 3 } };
            });
          }
        } else if (itemChoosen.y === 3) {
          if (itemChoosen.x !== 1) {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ x: 0, y: 2 });
              return { itemChoosen: { x: 0, y: 2 } };
            });
          } else {
            this.setState(({ itemChoosen }) => {
              this.toggleActiveItem({ x: 2, y: 2 });
              return { itemChoosen: { x: 2, y: 2 } };
            });
          }
        } else if (itemChoosen.y === 4) {
          this.setState(() => {
            this.toggleActiveItem({ x: 0, y: 3 });
            return { itemChoosen: { x: 0, y: 3 } };
          });
        } else if (itemChoosen.y === 5) {
          this.setState(() => {
            this.toggleActiveItem({ x: 0, y: 4 });
            return { itemChoosen: { x: 0, y: 4 } };
          });
        } else {
          this.setState(({ itemChoosen }) => {
            this.toggleActiveItem({ ...itemChoosen, y: itemChoosen.y - 1 });
            return { itemChoosen: { ...itemChoosen, y: itemChoosen.y - 1 } };
          });
        }
        break;
      }
      default: {
      }
    }
  }

  // метод обработки нажатия кнопки "Подтвердить номер"
  handleSubmit = async function (disbaled) {
    if (!disbaled) {
      await validatePhoneNumber(this.state.phoneNumber, (value) =>
        this.setState({ numberIsFine: value })
      );
      if (this.state.numberIsFine) {
        this.props.navigate("/third-slider/");
      }
    }
  };

  // метод обработки нажатия клавиши Enter
  handleEnterPush(e) {
    const { navInitiated, itemChoosen } = this.state;
    if (navInitiated) {
      let btnPushed = document.querySelector(
        `#pn${itemChoosen.x}${itemChoosen.y}`
      );
      this.handleItemClick(btnPushed);
    }
  }

  // метод обработки нажатия клавиш c цифрами на клавиатуре
  handleNumBtnPush(num) {
    this.definePhoneNumber(num);
    let numKey = Array.from(
      document.querySelectorAll(".keyboard-numbers-item")
    ).filter((item) => item.innerHTML === num)[0];
    let coordinates = { x: +numKey.id[2], y: +numKey.id[3] };
    this.setState(() => {
      this.toggleActiveItem(coordinates);
      return { itemChoosen: coordinates };
    });
  }

  render() {
    const { permissionGranted, numberFilled, numberIsFine } = this.state;
    return (
      <>
        <div
          className="screen-container-back second-screen"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="banner banner-big">
            <div className="banner-title">
              <p>Введите ваш номер </p>
              <p>мобильного телефона</p>
            </div>
            <div
              className={
                numberIsFine ? "banner-number" : "banner-number error-item"
              }
            >
              {this.renderPhoneNumber(this.state.phoneNumber)}
            </div>
            <p className="banner-text">
              и с Вами свяжется наш менеждер для дальнейшей консультации
            </p>
            <div className="keyboard-container">{this.renderLines()}</div>

            <div className="check-box-container">
              {numberIsFine ? (
                <>
                  <div
                    className="check-box"
                    id="pn04"
                    onClick={(e) => this.handleItemClick(e.target)}
                  >
                    {permissionGranted && (
                      <img
                        className="check-box-checked"
                        src={check}
                        alt="checked"
                      ></img>
                    )}
                  </div>
                  <div className="check-box-text">
                    <p>Согласие на обработку</p>
                    <p>персональных данных</p>
                  </div>
                </>
              ) : (
                <p className="error-item error-alert">Неверно введен номер</p>
              )}
            </div>

            <button
              className="btn btn-banner"
              id="pn05"
              disabled={
                numberFilled && permissionGranted && numberIsFine ? false : true
              }
              onClick={(e) => this.handleItemClick(e.target)}
            >
              {numberIsFine ? "Подтвердить номер" : null}
            </button>
          </div>
        </div>
        <button className="btn btn-close">&#10006; </button>
        <div className="info-box">
          <p className="info-box-text">
            Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
          </p>
          <div className="banner-code-container">
            <img alt="banner-code-img" src={qr}></img>
          </div>
        </div>
      </>
    );
  }
}

// оборачивание в функциональный компонент для возможности использования хуков react-router в классовом компоненте
function SecondScreen(props) {
  const navigate = useNavigate();
  return <SecondScreenClassItem {...props} navigate={navigate} />;
}

export default SecondScreen;
