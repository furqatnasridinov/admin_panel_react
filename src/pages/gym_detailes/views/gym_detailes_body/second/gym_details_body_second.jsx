import React from "react";
import "./gym_details_body_second.css";
import {
  chips,
  features,
  activityPhotos,
} from "../../../../../dummy_data/dymmy_data";
import TextAndTextButton from "../components/text_and_textbutton";
import { useState } from "react";
import firstPhoto from "../../../../../assets/images/image1.png";

export default function GymDetailesBodySecondContainer() {
  const [activeChip, setActiveChip] = useState("");

  return (
    <div className="flex flex-col bg-white h-fit rounded-[16px] p-[32px] gap-[32px]">
      <div className="activities">
        <TextAndTextButton
          text1={"Активности"}
          text2={"Редактировать список активностей"}
          onclick={() => {}}
        />
        <div className="chips_row ">
          {chips.map((chip) => {
            return (
              <Chip
                key={chip.id}
                name={chip.name}
                isActive={chip.name === activeChip}
                onclick={() => setActiveChip(chip.name)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row gap-[50px]">
        <div className="describtion_and_features_column">
          <div className="describtion_to_activity">
            <TextAndTextButton text1={"Описание"} text2={"Изменить"} />
            <div className="text-[14px] font-normal leading-[14px]">
              Смешанные единоборства в нашем зале представляют собой смесь из
              разных видов единоборств. Освоить все виды могут не только лишь
              все, мало кто может это делать.
            </div>
          </div>
          <div className="features">
            <TextAndTextButton
              text1={"Особенности посещения"}
              text2={"Изменить"}
            />
            <Features />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-[609px] ">
          <TextAndTextButton text1={"Фотографии:"} text2={"Изменить"} />
          <div className="recomendations_to_photo">
            <p>Рекомендуемые форматы для загрузки: jpeg, png</p>
            <p>Минимально допустимая сторона фотографии: 1080px</p>
          </div>
          <div className="activity_photos_container">
            {activityPhotos.map((item, index) => (
              <img
                className="activity_each_photo"
                key={index}
                src={item}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ name, onclick, isActive }) {
  return (
    <button className={isActive ? "chip_active" : "chip"} onClick={onclick}>
      {name}
    </button>
  );
}

function Features() {
  return (
    <ul className="marked_list">
      {features.map((item, index) => (
        <li key={index}>{item} </li>
      ))}
    </ul>
  );
}
