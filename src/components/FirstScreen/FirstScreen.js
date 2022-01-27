import React, { useEffect, useState } from "react";
import qr from "../../assets/qr.svg";
import video from "../../assets/video.mp4";
export default function FirstScreen(props) {
  let [bannerVisible, setBannerVisible] = useState(false);
  let videoItem = document.querySelector(".video");
  //   currentTime
  function handleOnPlay() {
    setTimeout(() => {
      setBannerVisible(true);
    }, 5000);
  }

  return (
    <>
      <div className="video-container">
        <video
          className="video"
          src={video}
          autoPlay
          muted
          controls
          onPlaying={() => handleOnPlay()}
        ></video>
      </div>
      {bannerVisible && (
        <div className="banner banner-small">
          <div className="banner-title">
            <p>Исполните мечту вашего малыша!</p>
            <p>подарите ему собаку</p>
          </div>
          <div className="banner-code-container">
            <img alt="banner-code-img" src={qr}></img>
          </div>
          <p className="banner-text">Сканируйте QR-код или нажмите OK</p>
          <button className="btn banner-btn">
            <p>OK</p>
          </button>
        </div>
      )}
    </>
  );
}
