import React from "react";
import background from "../../assets/screen-back.png";
import qr from "../../assets/qr.svg";

export default function ThirdScreen() {
  return (
    <>
      <div
        className="screen-container-back"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="banner banner-big">
          <p className="banner-title banner-title-big">Заявка принята</p>
          <p className="banner-text banner-text-info">
            Держите телефон под рукой
          </p>
          <p className="banner-text banner-text-info">
            Скоро с Вами свяжется наш менеджер.
          </p>
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
