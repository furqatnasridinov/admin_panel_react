import React from "react";
import "./gym_detailes.css";
import { useState } from "react";
import CustomDropdown from "../../../../components/dropdown/custom_dropdown";
import { toast } from "react-toastify";
import CustomButton from "../../../../components/button/button"
import questionLogo from "../../../../assets/svg/questionModal.svg";


export default function GymDetailesHeader({
  gym,
  listOfGyms,
  showDropDown,
  selectAnotherGym,
}) {

  // use states
  const [isDropDownOpened, openDropDown] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // functions
  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY + rect.height + 30, // 70 - height of the tooltip
      left: rect.left + window.scrollX - 330, // 70 - width of the tooltip
    });
    setIsTooltipVisible(true);
  };
  function openCloseDropDown() {
    openDropDown(!isDropDownOpened);
  }

  function setCurrentGymAndPop(gym) {
    selectAnotherGym(gym);
    openCloseDropDown();
  }


  const handleDownload = () => {
    try {
      const fileName = `qrcode_${gym.name}.jpg`
      const link = document.createElement('a');
      link.href = `http://77.222.53.122/image/${gym.qrcode}`;
      link.setAttribute('download', fileName); //or any other extension
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast(`handleDownload ${error}`);
    }
  };

  return (
    console.log(`gym ${JSON.stringify(gym)}`),
    <div className="h-[82px] mb-[10px] pl-[35px] pr-[19px] py-[21px] bg-white flex flex-row items-center rounded-[16px] justify-between ">

      <div className="flex flex-row items-center">
        <div className="text-[14px] font-normal">Ваши заведения</div>

        <div className="slash"> / </div>
        {showDropDown && (
          <CustomDropdown
            text={gym.name}
            isDropDownOpened={isDropDownOpened}
            openCloseDropDown={openCloseDropDown}
            map={listOfGyms.map((item, index) => (
              <button
                key={index}
                className="gym_names"
                onClick={() => setCurrentGymAndPop(item)}
              >
                {item.name}
              </button>
            ))}
          />
        )}
        {!showDropDown && (
          <div className="text-[14px font-normal]">{gym.name}</div>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        <CustomButton
          width={"340px"}
          height={"40px"}
          title={"Показать QR код заведения"}
          onСlick={handleDownload}
          showShadow={true}
          isLoading={false}
        />
        <div className="relative w-[24px] h-[24px] bg-white flex items-center justify-center rounded-[50%]">
          <img
            className="cursor-pointer"
            src={questionLogo}
            alt=""
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsTooltipVisible(false)}
          />
        </div>
      </div>
      {isTooltipVisible && (
        <div
          className="overlay"
          style={{
            top: tooltipPosition.top + "px",
            left: tooltipPosition.left + "px",
          }}
        >
          <div className="text-[16px] font-semibold">
            QR код заведения
          </div>
          <div className="text-[14px] font-normal">
            Когда пользователь приложения запишется к вам на занятие и придёт в
            назначенное время, ему нужно будет отсканировать QR код на входе.
            Можно просто распечатать его и повесить на стойке.
          </div>
          <div className="text-[14px] font-normal">
            Это позволит вам лишний раз не отвлекаться на валидацию посетителя лично.
          </div>
          <div className="text-[14px] font-normal">
            Если вам требуется узнать кто именно пришёл, чтобы сверить личность -
            вы можете сделать это в разделе “Клиенты”
          </div>
        </div>
      )}
    </div>
  );
}
