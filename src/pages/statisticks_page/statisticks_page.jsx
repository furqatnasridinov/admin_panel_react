import React, { Component } from "react";
import "./statisticks.css";
import CustomButton from "../../components/button/button";
import removeActivitySvg from "../../assets/svg/remove_activities.svg";
import editActivitySvg from "../../assets/svg/edit_activities.svg";
import AddActivitySvg from "../../assets/svg/add_activity.svg";
import { activities } from "../../dummy_data/dymmy_data";
import { useState } from "react";

export default function StatisticksPage() {
  const [activeActivity, setActiveActivity] = useState("Бокс");

  return (
    <div className="flex flex-col items-center gap-[50px] p-[20px]">
      <div className="main_container ">
        <div className="flex flex-col gap-[5px]">
          <div className="text-[16px] font-semibold leading-[16px]">
            Редактирование активностей
          </div>
          <div className="text-[14px] font-normal leading-[16px]">
            Выберите активность, чтобы добавить в неё занятия. Дополнительные
            занятия - это не обязательная опция, вы можете использовать только
            основные активности.
          </div>
        </div>
        {/* activities and podactivities */}
        <div className="flex flex-row gap-[24px]">
          <div className="activities_col">
            <div className="text-[14px] font-bold">Ваши активности:</div>
            <div className="blue_bordered_container">
              {activities.map((activity) => {
                return (
                  <EachActivity
                    key={activity.id}
                    title={activity.name}
                    onclick={() => {
                      setActiveActivity(activity.name);
                    }}
                    isActive={activity.name === activeActivity}
                  />
                );
              })}
              <AddActivity />
            </div>
          </div>
          <div className="podactivities_col">
            <div className="text-[14px] font-bold">
              Доп. занятия внутри активности:
            </div>
            <div className="blue_bordered_container"></div>
          </div>
        </div>
        <CustomButton
          height={"40px"}
          width={"100%"}
          title={"Закончить редактирование"}
          onclick={() => {}}
          fontSize={"14px"}
          showShadow={false}
        />
      </div>
    </div>
  );
}

function EachActivity({
  title,
  onclick,
  isActive,
  onRemoveClicked,
  onEditClicked,
}) {
  return (
    <div className={isActive ? "isActive" : "each_activity"}>
      <img
        style={{ cursor: "pointer" }}
        src={removeActivitySvg}
        alt=""
        onClick={onRemoveClicked}
      />
      <p onClick={onclick}>{title}</p>
      <img
        style={{ cursor: "pointer" }}
        className="edit_icon"
        onClick={onEditClicked}
        src={editActivitySvg}
        alt=""
      />
    </div>
  );
}

function AddActivity({ onclick }) {
  return (
    <button className="add_activity">
      <img src={AddActivitySvg} alt="" />
      <button onClick={onclick}>Добавить</button>
    </button>
  );
}
