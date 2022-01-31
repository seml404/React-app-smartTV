import React, { Component } from "react";

import slider1 from "../../assets/slider-1.png";
import slider2 from "../../assets/slider-2.png";
import slider3 from "../../assets/slider-3.png";

export default class ThirdScreenSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidePosition: 0,
      itemChoosen: { x: 0, y: 6 },
      keyCoordinates: "",
      navInitiated: false,
    };
    this.handleArrowBtnClick = this.handleArrowBtnClick.bind(this);
  }

  componentDidMount() {
    document.querySelector("body").addEventListener("keydown", (e) => {
      if (e.key.toLowerCase().includes("arrow")) {
        let direction = e.key.toLowerCase().substring(5);
        if (direction === "left") {
          this.handleArrowBtnClick("left");
        } else if (direction === "right") this.handleArrowBtnClick("right");
      }
    });
  }

  handleArrowBtnClick(direction) {
    const { slidePosition, itemChoosen, navInitiated } = this.state;
    if (!navInitiated) {
      this.setState({ navInitiated: true });
    } else {
      this.toggleActiveItem(itemChoosen);
    }
    if (direction === "left") {
      this.setState({ itemChoosen: { x: 0, y: 6 } });
      this.toggleActiveItem({ x: 0, y: 6 });
      if (slidePosition === 0) {
        this.setState({ slidePosition: -1280 * 2 });
      } else {
        this.setState({ slidePosition: slidePosition + 1280 });
      }
    } else if (direction === "right") {
      this.setState({ itemChoosen: { x: 1, y: 6 } });
      this.toggleActiveItem({ x: 1, y: 6 });
      if (slidePosition === -1280 * 2) {
        this.setState({ slidePosition: 0 });
      } else {
        this.setState({ slidePosition: slidePosition - 1280 });
      }
    }
  }

  toggleActiveItem(obj) {
    document
      .querySelector(`#pn${obj.x}${obj.y}`)
      .classList.toggle("item-active");
  }

  render() {
    const { slidePosition } = this.state;
    return (
      <>
        <div className="slider">
          <div className="slider-items" style={{ left: slidePosition }}>
            <div className="slider-item">
              <img src={slider1} alt="slide"></img>
            </div>
            <div className="slider-item">
              <img src={slider2} alt="slide"></img>
            </div>
            <div className="slider-item">
              <img src={slider3} alt="slide"></img>
            </div>
          </div>
          <div className="nav-buttons-container">
            <button
              className="btn nav-buttons-btn"
              id="pn06"
              onClick={() => this.handleArrowBtnClick("left")}
            >
              &#x3c;
            </button>
            <button
              id="pn16"
              className="btn nav-buttons-btn"
              onClick={() => this.handleArrowBtnClick("right")}
            >
              &#x3e;
            </button>
          </div>
        </div>
        <button className="btn btn-close">&#10006; </button>
      </>
    );
  }
}
