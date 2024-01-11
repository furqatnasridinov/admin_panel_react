import React, { Component } from "react";
import "./statisticks.css";
import topDogPhoto from "../../assets/images/top_dog.png";
import gosling from "../../assets/images/gosling.jpg";
import arrowLeftSvg from "../../assets/svg/arrow_left.svg";
import logo from "../../assets/images/top_dog_logo.jpeg";

export class StatisticksPage extends Component {
  render() {
    return (
      <div className="flex flex-col items-center gap-[50px] p-[20px]">
        <ChangeMainPhotoModal />
        <ChangeLogoModal />
      </div>
    );
  }
}

export default StatisticksPage;

 function ChangeMainPhotoModal() {
  return (
    <div className="photo_dialog_container">
      {/* photo */}
      <img className="w-[513px] h-[250px] rounded-t-[16px]" src={gosling}></img>
      {/* white container */}
      <div className="bg-white p-[32px] flex flex-col justify-center items-center gap-[24px] rounded-b-[16px]">
        <div className="flex flex-col gap-[5-x]">
          <div className="font-semibold text-[16px] ">
            Изменение фоновой фотографии
          </div>
          <div className="font-normal text-[14px]">Что вы хотите сделать?</div>
        </div>
        {/* Row of buttons */}
        <div className="flex flex-row w-full h-[40px] gap-[10px] ">
          <button className="rounded_button">
            <img src={arrowLeftSvg} alt="" />
          </button>
          <button className="second_button">
            <p>Удалить фото</p>
          </button>
          <button className="third_button">
            <div className="text-[14px] font-medium text-white">
              {" "}
              Загрузить другое фото
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangeLogoModal() {
  return (
    <div className="logo_dialog_container">
      <div className="w-full flex justify-center">
        <img className="logo" src={gosling}></img>
      </div>
      {/* white container */}
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[5-x] ml-[50px]">
          <div className="font-semibold text-[16px] ">Изменение логотипа</div>
          <div className="font-normal text-[14px]">Что вы хотите сделать?</div>
        </div>
        {/* Row of buttons */}
        <div className="flex flex-row w-full h-[40px] gap-[10px] ">
          <button className="rounded_button">
            <img src={arrowLeftSvg} alt="" />
          </button>
          <button className="second_button">
            <p>Удалить логотип</p>
          </button>
          <button className="third_button">
            <div className="text-[14px] font-medium text-white">
              {" "}
              Загрузить другой логотип
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
