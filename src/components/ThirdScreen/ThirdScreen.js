import React, { Component } from "react";
import background from "../../assets/screen-back.png";

export default class ThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideActive: true,
    };
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
              <p>test</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
