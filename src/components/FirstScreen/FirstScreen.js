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
  }

  // установщик таймера для показа всплывающего окна
  handleOnPlay() {
    if (this.state.timerId) {
      clearTimeout(this.state.timerId);
    }
    let value = setTimeout(() => {
      this.setState({ bannerVisible: true });
    }, 5000);
    this.setState({ timerId: value });
  }

  // в случае нахождения в сессионном хранилище данных о последнем времени просмотра видео оно продолжит воспроизводиться с этого момента
  componentDidMount() {
    let videoItem = document.querySelector(".video");
    if (sessionStorage.timeMark) {
      videoItem.currentTime = +sessionStorage.timeMark;
      videoItem.play();
    } else {
      videoItem.play();
    }
  }

  // при переходе на другую страницу в сессионное хранилище данных записываются сведения о времени, на котором находилось видео
  componentWillUnmount() {
    clearTimeout(this.state.timerId);
    let videoItem = document.querySelector(".video");
    sessionStorage.setItem("timeMark", videoItem.currentTime);
  }

  // обработчик клика по кнопке для навигации на следующую страницу
  handleNavigate() {
    this.props.navigate("/second/");
  }

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

// оборачивание в функциональный компонент для возможности использования хуков react-router в классовом компоненте
function FirstScreen(props) {
  const navigate = useNavigate();
  return <FirstScreenClassItem {...props} navigate={navigate} />;
}

export default FirstScreen;
