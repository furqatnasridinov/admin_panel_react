import React from "react";
import "./styles.css";
import CustomDropdown from "../../components/dropdown/custom_dropdown";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentGym } from "../../features/current_gym_slice";

export default function BookingHeader({ gym, listOfGyms, showDropDown }) {
  const [isDropDownOpened, openDropDown] = useState(false);
  const dispatch = useDispatch();

  function openCloseDropDown() {
    openDropDown(!isDropDownOpened);
  }

  function setCurrentGymAndPop(gym) {
    try {
      dispatch(setCurrentGym(gym));
      openCloseDropDown();
    } catch (error) {
      toast(`setCurrentGymAndPop ${error}`);
    }
  }

  return (
    <div className="h-[82px] mb-[10px] pl-[35px] pr-[19px] py-[21px] bg-white flex flex-row items-center rounded-[16px] ">
      <div className="text-[14px] font-normal">Работа с клиентами</div>

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
  );
}
