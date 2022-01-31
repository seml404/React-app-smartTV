import React from "react";
import qr from "../../assets/qr.svg";
import video from "../../assets/video.mp4";
import { useNavigate } from "react-router-dom";
import { Component } from "react";

class FirstScreenClassItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerVisible: false,
      timerId: null,
    };
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleVideoPaused = this.handleVideoPaused.bind(this);
  }

  handleOnPlay() {
    if (this.state.timerId) {
      clearTimeout(this.state.timerId);
    }
    let value = setTimeout(() => {
      this.setState({ bannerVisible: true });
    }, 5000);
    this.setState({ timerId: value });
  }

  componentDidMount() {
    let videoItem = document.querySelector(".video");
    if (localStorage.timeMark) {
      videoItem.currentTime = +localStorage.timeMark;
      videoItem.play();
    } else {
      videoItem.play();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timerId);
    let videoItem = document.querySelector(".video");
    localStorage.setItem("timeMark", videoItem.currentTime);
  }

  handleNavigate() {
    let videoItem = document.querySelector(".video");
    localStorage.setItem("timeMark", videoItem.currentTime);
    this.props.navigate("/second");
  }

  handleVideoPaused() {}

  render() {
    return (
      <>
        <div className="video-container">
          <video
            className="video"
            src={video}
            // autoPlay
            muted
            controls
            onPlaying={() => this.handleOnPlay()}
            onPause={() => this.handleVideoPaused()}
          ></video>
        </div>
        <div
          className={
            this.state.bannerVisible
              ? "banner banner-small show-small-show"
              : "banner banner-small"
          }
        >
          <div className="banner-title">
            <p>Исполните мечту вашего малыша!</p>
            <p>подарите ему собаку</p>
          </div>
          <div className="banner-code-container">
            <img alt="banner-code-img" src={qr}></img>
          </div>
          <p className="banner-text">Сканируйте QR-код или нажмите OK</p>
          <button
            className="btn btn-active"
            onClick={() => this.handleNavigate()}
          >
            OK
          </button>
        </div>
      </>
    );
  }
}

function FirstScreen(props) {
  const navigate = useNavigate();
  return <FirstScreenClassItem {...props} navigate={navigate} />;
}

export default FirstScreen;
