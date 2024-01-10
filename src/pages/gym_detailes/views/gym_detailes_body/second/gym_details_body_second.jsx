import React from "react";
import "./gym_details_body_second.css";
import {
  chips,
  features,
  activityPhotos,
} from "../../../../../dummy_data/dymmy_data";
import TextAndTextButton from "../../../components/text_and_textbutton";
import { useState, useRef, useEffect } from "react";
import { EditableTextfield } from "../first/gym_detailes_body_first";
import doneSvg from "../../../../../assets/svg/done.svg";

export default function GymDetailesBodySecondContainer() {
  const [activeChip, setActiveChip] = useState("");
  const [isDescribtionEdittingEnabled, setDescribtionEditting] =
    useState(false);
  const [isFeaturesEdittingEnabled, setFeaturesEditting] = useState(false);
  const [describtion, setDescribtion] = useState(
    "Смешанные единоборства в нашем зале представляют собой смесь изразных видов единоборств. Освоить все виды могут не только лишь все, мало кто может это делать."
  );
  const [features, setFeatures] = useState("");
  const handleSaveDescribtion = (newDescribtion) => {
    setDescribtion(newDescribtion);
    setDescribtionEditting(false);
  };
  const handleSaveFeatures = (newFeaturesArray) => {
    // Assuming newFeaturesArray is already an array of strings
    setFeatures(newFeaturesArray); // Set new features array to state
    setFeaturesEditting(false); // Exit editing mode
  };
  const handleChange = (textValue) => {
    const newFeaturesArray = textValue
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => line.trim());
    handleSaveFeatures(newFeaturesArray);
  };

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
          {/* describtion */}
          <div className="describtion_to_activity">
            {!isDescribtionEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Описание"}
                  text2={"Изменить"}
                  onclick={() => setDescribtionEditting(true)}
                />
                <div className="text-[14px] font-normal leading-[14px]">
                  {describtion}
                </div>
              </>
            )}
            {isDescribtionEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Описание"}
                  text2={"Отменить"}
                  onclick={() => setDescribtionEditting(false)}
                  isRedText={isDescribtionEdittingEnabled}
                />
                <EditableTextfield
                  value={describtion}
                  handleChange={handleChange}
                  fontsize={"13px"}
                  lineheight={"14px"}
                  minHeight={"90px"}
                />
              </>
            )}
          </div>
          {/* features */}

          <div className="features">
            {!isFeaturesEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Особенности посещения"}
                  text2={"Изменить"}
                  isRedText={isFeaturesEdittingEnabled}
                  onclick={() => setFeaturesEditting(true)}
                />
                <Features />
              </>
            )}
            {isFeaturesEdittingEnabled && (
              <>
                <TextAndTextButton
                  text1={"Особенности посещения"}
                  text2={"Отменить"}
                  isRedText={isFeaturesEdittingEnabled}
                  onclick={() => setFeaturesEditting(false)}
                />
                <EditableFeaturesTextfield
                  handleChange={handleSaveFeatures}
                  fontsize={"13px"}
                  lineheight={"14px"}
                />
              </>
            )}
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

function EditableFeaturesTextfield({ handleChange, fontsize, lineheight }) {
  // Join the array with newline and bullet point for display in textarea
  const initialFeaturesString = features.join("\n• ");

  // Set this string as the initial value for  textarea
  const [tempValue, setTempValue] = useState(`• ${initialFeaturesString}`);

  const inputRef = useRef(null);
  // for autofocus calls when component first renders
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      // Set the cursor to the end of the text
      const length = input.value.length;
      input.setSelectionRange(length, length);
      // set the height relatively textfields content
      input.style.height = "inherit"; // Reset height to recalculate
      input.style.height = `${input.scrollHeight}px`; // Set new height based on scroll height
    }
  }, []);

  const handleTempChange = (event) => {
    setTempValue(event.target.value);
    const target = event.target;
    target.style.height = "inherit"; // Reset height to recalculate
    target.style.height = `${target.scrollHeight}px`; // Set new height based on scroll height
  };

  const handleSave = () => {
    handleChange(tempValue); // Call handleChange with the current value of the textarea
  };

  return (
    <div className="flex flex-row justify-between gap-[10px] items-start">
      <textarea
        ref={inputRef}
        value={tempValue}
        //className="textarea-transition"
        onChange={handleTempChange}
        style={{
          width: "100%",
          padding: "10px 16px 10px 8px",
          border: "1px solid #77AAF9",
          borderRadius: "8px",
          outline: "none",
          maxHeight: "120px",
          resize: "none",
          fontSize: fontsize,
          lineHeight: lineheight,
        }}
      />
      <button onClick={handleSave}>
        <img src={doneSvg} alt="" />
      </button>
    </div>
  );
}
