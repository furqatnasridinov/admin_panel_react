import React from "react";
import "./employees.css";
import arrowDownSvg from "../../../../../assets/svg/arrow_down.svg";
import addSvg from "../../../../../assets/svg/add_employee.svg";
import userLogo from "../../../../../assets/svg/user_logo.svg";
import phoneSvg from "../../../../../assets/svg/phone2.svg";
import availableSvg from "../../../../../assets/svg/available.svg";
import notAvailable from "../../../../../assets/svg/not_available.svg";
import goggins from "../../../../.././assets/images/goggins.jpg"
import starSvg from "../../../../../assets/svg/star.svg";
import docsSvg from "../../../../../assets/svg/docs.svg";
import garbage from "../../../../../assets/images/garbage.png";
import { roles, employees } from "../../../../../dummy_data/dymmy_data";
import { useState } from "react";
import CustomButton from "../../../../../components/button/button";
import TextAndTextButton from "../../../components/text_and_textbutton";
import CustomDialog from "../../../../../components/dialog/dialog";
import ReactInputMask from "react-input-mask";

export default function Employees({listOfEmployees}) {
  // use state for add employees dialog
  const [nameTextfieldHasFocus, setNameFocus] = useState(false);
  const [surnameTextfieldHasFocus, setSurnameFocus] = useState(false);
  const [phoneNumberTextfieldHasFocus, setPhoneFocus] = useState(false);
  const [isDropDownOpened, openDropDown] = useState(false);
  const [name, setname] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState("Администратор");
  const [nameNotValidated, setNameNotValidated] = useState();
  const [phoneNotValidated, setPhoneNotValidated] = useState();
  const [isAddEmployeesDialogOpened, openAddEmployeesDialog] = useState(false);

  //use states for refactor employees dialog
  const [nameTextfield2HasFocus, setName2Focus] = useState(false);
  const [surnameTextfield2HasFocus, setSurname2Focus] = useState(false);
  const [phoneNumberTextfield2HasFocus, setPhone2Focus] = useState(false);
  const [isDropDown2Opened, openDropDown2] = useState(false);
  const [name2, setName2] = useState("");
  const [surname2, setSurname2] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [currentEmployee2, setCurrentEmployee2] = useState("Администратор");
  const [selectedEmployeeId, selectEmployee] = useState(0);
  const [isRefEmployeesDialogOpened, openRefEmployeesDialog] = useState(false);

  // functions for add employees dialog
  function openCloseDropDown() {
    openDropDown(!isDropDownOpened);
  }

  function setCurrentGymAndPop(name) {
    if (currentEmployee != name) {
      setCurrentEmployee(name);
      openCloseDropDown();
    }
  }

  const changeName = (event) => {
    setname(event.target.value);
  };

  const changeSurName = (event) => {
    setSurname(event.target.value);
  };

  const changePhone = (event) => {
    setPhoneNumber(event.target.value);
  };
  const checkValidation = () => {
    // Assume both fields are valid to start with
    let isPhoneValid = true;
    let isNameValid = true;

    // Check phone number validity (assuming you want exactly 18 characters)
    if (phoneNumber.length !== 18) {
      setPhoneNotValidated(true);
      isPhoneValid = false; // Set the phone validity to false
    } else {
      setPhoneNotValidated(false);
    }

    // Check name validity (assuming you want at least 1 character)
    if (name.trim().length === 0) {
      setNameNotValidated(true);
      isNameValid = false; // Set the name validity to false
    } else {
      setNameNotValidated(false);
    }

    // Only proceed if both fields are valid
    if (isPhoneValid && isNameValid) {
      alert("Сотрудник добавлен");
    }
  };

  const closeAddEmolyeesDialogOntapOutside = () =>
    openAddEmployeesDialog(false);

  // functions for refactor employees dialog
  function openCloseDropDown2() {
    openDropDown2(!isDropDown2Opened);
  }

  function setCurrentEmployeeAndPop2(name) {
    if (currentEmployee2 != name) {
      setCurrentEmployee2(name);
      openCloseDropDown2();
    }
  }

  const changeName2 = (event) => {
    setName2(event.target.value);
  };

  const changeSurName2 = (event) => {
    setSurname2(event.target.value);
  };

  const changePhone2 = (event) => {
    setPhoneNumber2(event.target.value);
  };

  return (
    <div className="employees_container">
      <TextAndTextButton
        text1={"Сотрудники"}
        text2={"Редактировать"}
        onclick={() => {
          openRefEmployeesDialog(true);
        }}
      />
      <CustomDialog isOpened={isRefEmployeesDialogOpened}>
        {/* Refactor employees dialog body */}
        <div className="ref_employee_dialog">
          <div className="flex flex-col gap-[5px]">
            <div className="text-[16px] font-semibold leading-[16px]">
              Редактировать сотрудника
            </div>
            <div className="text-[14px] font-normal leading-[16px]">
              Здесь вы можете изменить личную информацию о сотруднике, такую как
              имя, или номер телефона, а так же настроить уровень его доступа.
            </div>
          </div>
          {/* Choose an employee */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-row gap-[10px] items-center">
              <img src={userLogo} />
              <div className="text-[16px] font-semibold leading-[16px]">
                Выберите сотрудника для редактирования
              </div>
            </div>
            <div className="employees_wrap">
              {employees.map((employee) => {
                return (
                  <EachEmployee
                    key={employee.id}
                    photo={employee.photo}
                    name={employee.name}
                    job={employee.job}
                    isThatYou={employee.isThatYou}
                    showPointer={true}
                    onEmployeeClicked={() => {
                      selectEmployee(employee.id);
                    }}
                    isSelected={employee.id === selectedEmployeeId}
                  />
                );
              })}
            </div>
          </div>
          {/* Personal info */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-row gap-[10px] items-center">
              <img className="w-[24px] h-[24px]" src={docsSvg} />
              <div className="text-[16px] font-semibold leading-[16px]">
                Личная информация
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row gap-[32px]">
                {/* Name */}
                <TextAndTextfield
                  value={name2}
                  onChange={changeName2}
                  textfieldHasFocus={nameTextfield2HasFocus}
                  requestFocus={() => setName2Focus(true)}
                  removeFocus={() => setName2Focus(false)}
                  text={"Имя сотрудника"}
                  placeholder={"Имя"}
                  logo={userLogo}
                />
                {/* Surname */}
                <TextAndTextfield
                  value={surname2}
                  onChange={changeSurName2}
                  textfieldHasFocus={surnameTextfield2HasFocus}
                  requestFocus={() => setSurname2Focus(true)}
                  removeFocus={() => setSurname2Focus(false)}
                  text={"Фамилия"}
                  placeholder={"Фамилия"}
                  logo={userLogo}
                />
              </div>
              <div className="flex flex-row gap-[32px]">
                {/* Phone */}
                <TextAndTextfield
                  value={phoneNumber2}
                  onChange={changePhone2}
                  textfieldHasFocus={phoneNumberTextfield2HasFocus}
                  requestFocus={() => setPhone2Focus(true)}
                  removeFocus={() => setPhone2Focus(false)}
                  text={"Номер телефона"}
                  placeholder={"+7 (900) 855 45-58"}
                  logo={phoneSvg}
                  isPhoneTextfield={true}
                />
                {/* Empty space */}
                <div className="w-full"></div>
              </div>
            </div>
          </div>
          {/* Dropdown section */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-row gap-[10px] items-center">
              <img src={starSvg} />
              <div className="text-[16px] font-semibold leading-[16px]">
                Роль сотрудника
              </div>
            </div>
            <div className="flex flex-col gap-[5px] w-fit h-fit ml-[34px]">
              <div className="text-[16px] font-medium leading-[16px]">
                Уровень доступа сотрудника{" "}
              </div>
              <CustomDropdown
                currentGym={currentEmployee2}
                isDropDownOpened={isDropDown2Opened}
                openCloseDropDown={openCloseDropDown2}
                ongymSelected={setCurrentEmployeeAndPop2}
              />
            </div>
          </div>

          {/* blue container  */}
          <div className="big_blue_container">
            <div className="text-[14px] font-normal leading-[16px]">
              Подробная информация о том, какими правами наделён “
              {currentEmployee2}”:
            </div>
            {roles.map((role) => {
              return role.available ? (
                <div
                  key={role.id}
                  className="flex flex-row gap-[10px] items-center"
                >
                  <img src={availableSvg} />
                  <div className="text-[14px] font-normal leading-[16px]">
                    {role.name}
                  </div>
                </div>
              ) : (
                <div
                  key={role.id}
                  className="flex flex-row gap-[10px] items-center"
                >
                  <img src={notAvailable} />
                  <div className="text-[14px] font-normal leading-[16px] text-grey-text">
                    {role.name}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <CustomButton
              width={"100%"}
              height={"40px"}
              title={"Завершить редактирование"}
              onСlick={() => {}}
            />
          </div>
        </div>
      </CustomDialog>
      <div className="employees_list">
        {listOfEmployees.map((employee) => {
          return (
            <EachEmployee
              key={employee.id}
              photo={goggins}
              name={employee.user.firstName}
              lastName={employee.user.lastName}
              job={employee.roles}
              isThatYou={employee.isThatYou}
            />
          );
        })}
        {/* Add button */}
        <div
          className="button"
          onClick={() => {
            openAddEmployeesDialog(true);
          }}
        >
          <img src={addSvg} alt="" />
          <div className="">Добавить</div>
        </div>
        {/* Add employee dialog */}
        <CustomDialog
          isOpened={isAddEmployeesDialogOpened}
          closeOnTapOutside={() =>
            /* not working */
            openAddEmployeesDialog(false)
          }
        >
          {/* Add employee dialog body */}
          <div className="add_employee_dialog">
            <div className="flex flex-col gap-[5px]">
              <div className="text-[16px] font-semibold leading-[16px]">
                Добавить нового сотрудника
              </div>
              <div className="text-[14px] font-normal leading-[16px]">
                Вам нужно указать номер телефона человека, которого вы хотите
                добавить. С помощью этого номера он сможет войти на платформу.
                Так же необходимо задать уровень доступа.
              </div>
            </div>
            <div className="flex flex-row gap-[24px]">
              {/* Иям */}
              <TextAndTextfield
                value={name}
                onChange={changeName}
                textfieldHasFocus={nameTextfieldHasFocus}
                requestFocus={() => setNameFocus(true)}
                removeFocus={() => setNameFocus(false)}
                text={"Имя сотрудника"}
                placeholder={"Имя"}
                logo={userLogo}
                isError={nameNotValidated}
              />
              {/* Фамилия */}
              <TextAndTextfield
                value={surname}
                onChange={changeSurName}
                textfieldHasFocus={surnameTextfieldHasFocus}
                requestFocus={() => setSurnameFocus(true)}
                removeFocus={() => setSurnameFocus(false)}
                text={"Фамилия"}
                placeholder={"Фамилия"}
                logo={userLogo}
              />
            </div>
            <div className="flex flex-row gap-[24px]">
              {/* Номер */}
              <TextAndTextfield
                value={phoneNumber}
                onChange={changePhone}
                textfieldHasFocus={phoneNumberTextfieldHasFocus}
                requestFocus={() => setPhoneFocus(true)}
                removeFocus={() => setPhoneFocus(false)}
                text={"Номер телефона"}
                placeholder={"+7 (900) 855 45-58"}
                logo={phoneSvg}
                isPhoneTextfield={true}
                isError={phoneNotValidated}
              />
              {/* Drop down */}
              <div className="flex flex-col gap-[5px] w-full ">
                <div className="text-[14px] font-bold">
                  Уровень доступа сотрудника
                </div>
                <CustomDropdown
                  currentGym={currentEmployee}
                  isDropDownOpened={isDropDownOpened}
                  openCloseDropDown={openCloseDropDown}
                  ongymSelected={setCurrentGymAndPop}
                />
              </div>
            </div>
            {/* blue container  */}
            <div className="big_blue_container">
              <div className="text-[14px] font-normal leading-[16px]">
                Подробная информация о том, какими правами наделён “
                {currentEmployee}”:
              </div>
              {roles.map((role) => {
                return role.available ? (
                  <div
                    key={role.id}
                    className="flex flex-row gap-[10px] items-center"
                  >
                    <img src={availableSvg} />
                    <div className="text-[14px] font-normal leading-[16px]">
                      {role.name}
                    </div>
                  </div>
                ) : (
                  <div
                    key={role.id}
                    className="flex flex-row gap-[10px] items-center"
                  >
                    <img src={notAvailable} />
                    <div className="text-[14px] font-normal leading-[16px] text-grey-text">
                      {role.name}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Инструкция */}
            <div className="flex flex-col gap-[5px]">
              <div className="text-[16px] font-semibold leading-[16px]">
                Как сотруднику войти в систему?
              </div>
              <div className="text-[14px] font-normal leading-[16px]">
                После того, как вы добавите нового сотрудника - ему необходимо
                перейти по адресу myfit.ru/admin и войти в систему, используя
                свой номер телефона. Там он получит смс с кодом, который сможет
                использовать как пароль для входа.
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <CustomButton
                width={"100%"}
                height={"40px"}
                title={"Добавить сотрудника"}
                onСlick={checkValidation}
              />
              {(nameNotValidated || phoneNotValidated) && (
                <div className="text-[14px] font-normal text-red-400 leading-[16px]">
                  Чтобы продолжить - необходимо заполнить все обязательные поля,
                  выделенные красным
                </div>
              )}
            </div>
          </div>
        </CustomDialog>
      </div>
    </div>
  );
}

export function EachEmployee({
  photo,
  name,
  lastName,
  job,
  isThatYou,
  showPointer,
  onEmployeeClicked,
  isSelected,
}) {
  return (
    <div
      className={
        isSelected
          ? "selected_employee_row"
          : showPointer
          ? "each_employee cursor-pointer"
          : "each_employee"
      }
      onClick={onEmployeeClicked}
    >
      {!isSelected && (
        <>
          {/* Photo */}
          <div className="w-[32px] h-[32px] bg-button-color rounded-[50%] p-[2px]">
            <img className="w-full h-full rounded-[50%]" src={photo} alt="" />
          </div>
          {/* Name and job */}
          <div className="flex flex-col gap-0 justify-center">
            <div className="flex flex-row gap-[3px]">
              <div className="text-[14px] font-bold leading-none">{name} {lastName}</div>
              <div className="you leading-none">{isThatYou ? "(Вы)" : ""}</div>
            </div>
            <div className="text-[14px] font-normal leading-none">{job}</div>
          </div>
        </>
      )}

      {isSelected && (
        <>
          <div className="selected_employee">
            {/* Photo */}
            <div className="w-[32px] h-[32px] bg-button-color rounded-[50%] p-[2px]">
              <img className="w-full h-full rounded-[50%]" src={photo} alt="" />
            </div>
            {/* Name and job */}
            <div className="flex flex-col gap-0 justify-center">
              <div className="flex flex-row gap-[3px]">
                <div className="text-[14px] font-bold leading-none">{name}</div>
                <div className="you leading-none">
                  {isThatYou ? "(Вы)" : ""}
                </div>
              </div>
              <div className="text-[14px] font-normal leading-none">{job}</div>
            </div>
          </div>
          <div className="delete_red_container">
            <img src={garbage} />
          </div>
        </>
      )}
    </div>
  );
}

export function TextAndTextfield({
  value,
  textfieldHasFocus,
  requestFocus,
  removeFocus,
  text,
  placeholder,
  logo,
  onChange,
  isPhoneTextfield,
  isError,
}) {
  return (
    <div className="flex flex-col gap-[5px] w-full">
      <div
        className={
          isError
            ? "text-[14px] font-bold text-red-text"
            : "text-[14px] font-bold"
        }
      >
        {text}
      </div>
      <div
        className={
          textfieldHasFocus
            ? "icon_and_textfield_row_focused"
            : isError
            ? "error"
            : "icon_and_textfield_row"
        }
      >
        <img src={logo} className="userlogo" />
        {isPhoneTextfield && (
          <ReactInputMask
            className="textfiled"
            mask="+7 (999) 999 99-99"
            placeholder="+7 (900) 855 45-58"
            value={value}
            onFocus={requestFocus}
            onBlur={removeFocus}
            onChange={onChange}
          />
        )}
        {!isPhoneTextfield && (
          <input
            value={value}
            type="text"
            required
            minLength={"1"}
            className="textfiled"
            onFocus={requestFocus}
            onBlur={removeFocus}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

function CustomDropdown({
  isDropDownOpened,
  currentGym,
  openCloseDropDown,
  ongymSelected,
}) {
  return (
    <div className="column">
      <button
        className={
          isDropDownOpened ? "dropdown_header_opened" : "dropdown_header"
        }
        onClick={openCloseDropDown}
      >
        <div className="text-[14px] font-medium">{currentGym}</div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div className="dropdown_body">
          {employees.map((item, index) => (
            <button
              key={index}
              className="gym_names"
              onClick={() => ongymSelected(item.job)}
            >
              {item.job}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
