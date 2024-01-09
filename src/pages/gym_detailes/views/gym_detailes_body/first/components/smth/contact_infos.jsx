import React from "react";
import TextAndTextButton from "../../../components/text_and_textbutton";
import "./contact_infos.css"
import phoneSvg from "../../../../../../../assets/svg/phone.svg"
import tgSvg from "../../../../../../../assets/svg/tg.svg"
import vkSvg from "../../../../../../../assets/svg/vk.svg"

export default function ContactInfos() {
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-row  gap-[32px]">
        {/* Name  */}
        <div className="name">
          <TextAndTextButton
            text1={"Название заведения"}
            text2={"Изменить"}
            onclick={() => {}}
          />
          <div className="text-[14px]">Top DOG Fight Club</div>
        </div>
        {/* Describtion  */}
        <div className="describtion">
          <TextAndTextButton
            text1={"Описание"}
            text2={"Изменить"}
            onclick={() => {}}
          />
          <div className="leading-[14px] text-[13px]">
            В июне 2021 года был открыт Top Dog Club — зал с фитнессом и
            единоборствами, просуществовавший более двух лет.
          </div>
        </div>
        {/* Address  */}
        <div className="address">
          <TextAndTextButton
            text1={"Адрес"}
            text2={"Изменить"}
            onclick={() => {}}
          />
          <div className="leading-[16px] text-[14px]">
            ул. Лёни Ленина, д. 12, БЦ “Big Мук”
          </div>
        </div>
      </div>
      {/* Contacts */}
      <div className="flex flex-col gap-[5px] ">
        <TextAndTextButton text1={"Контакты"} text2={"Изменить"} />
        <div className="flex flex-row gap-[24px]">
          {/* Phone */}
          <div className="icon_and_tag">
            <img src={phoneSvg} alt="" />
            <div className="font-normal text-[14px]">+7 (965) 029 25-55</div>
          </div>
          {/* Tg */}
          <div className="icon_and_tag">
            <img src={tgSvg} alt="" />
            <div className="font-normal text-[14px]">TopDogFC</div>
          </div>
          {/* Vk */}
          <div className="icon_and_tag">
            <img src={vkSvg} alt="" />
            <div className="font-normal text-[14px]">TopDog_FC</div>
          </div>
        </div>
      </div>
    </div>
  );
}
