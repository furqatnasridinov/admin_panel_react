import React from 'react'
import "./photo_and_logos.css"
import TextAndTextButton from '../../../components/text_and_textbutton'
import SizeOfPicture from '../../../components/size_of_picture'
import topDogMainPic from "../../../../../../../assets/images/top_dog.png"
import topDogLogo from "../../../../../../../assets/images/top_dog_logo.jpeg"

export default function PhotoAndLogos() {
  return (
    <div className="photos_row">
        {/* Main picture  */}
        <div className="gym_main_photo_column">
          <TextAndTextButton
            text1={"Фоновая фотография"}
            text2={"Изменить"}
            onclick={() => {}}
          />
          <button onClick={() => {}}>
            <img className="main_pic" src={topDogMainPic} alt="" />
          </button>
          <SizeOfPicture size={"375x210px"} />
        </div>
        {/* Big logo */}
        <div className="flex flex-col gap-[10px] mt-[30px] ml-[43px]">
          <TextAndTextButton
            text1={"Логотип"}
            text2={"Изменить"}
            onclick={() => {}}
          />
          <button onClick={() => {}} className="w-[180px] h-[180px]">
            <img className="logo_rounded" src={topDogLogo} alt="" />
          </button>
          <SizeOfPicture size={"180x180px"} />
        </div>
        {/* Medium logo */}
        <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
        <button onClick={() => {}} className="w-[90px] h-[90px]">
            <img className="logo_rounded" src={topDogLogo} alt="" />
          </button>
          <SizeOfPicture size={"90x90px"} />
        </div>
        {/* Small logo */}
        <div className="flex flex-col gap-[10px] ml-[10px] justify-end">
        <button onClick={() => {}} className="w-[50px] h-[50px]">
            <img className="logo_rounded" src={topDogLogo} alt="" />
          </button>
          <SizeOfPicture size={"50x50px"} />
        </div>
      </div>
  )
}
