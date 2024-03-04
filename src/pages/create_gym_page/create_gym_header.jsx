import React from "react";

export default function CreateGymHeader() {
  return (
    <div className="pl-[35px] pr-[19px] py-[18px] bg-white flex flex-col gap-1  rounded-[16px] ">
      <div className="text-[16px] font-semibold leading-[16px]">
        Создание нового заведения
      </div>
      <div className="text-[14px] font-normal leading-[16px]">
        Сначала вам нужно добавить основную информацию о заведении, такую как
        его адрес, название, логотип, описание, заглавное фото и контакты.
      </div>
    </div>
  );
}
