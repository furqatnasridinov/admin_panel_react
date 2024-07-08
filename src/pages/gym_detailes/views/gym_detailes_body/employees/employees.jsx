import React, { useRef } from "react";
import "./employees.css";
import arrowDownSvg from "../../../../../assets/svg/arrow_down.svg";
import addSvg from "../../../../../assets/svg/add_employee.svg";
import userLogo from "../../../../../assets/svg/user_logo.svg";
import phoneSvg from "../../../../../assets/svg/phone2.svg";
import availableSvg from "../../../../../assets/svg/available.svg";
import notAvailable from "../../../../../assets/svg/not_available.svg";
import goggins from "../../../../.././assets/images/goggins.jpg";
import starSvg from "../../../../../assets/svg/star.svg";
import docsSvg from "../../../../../assets/svg/docs.svg";
import garbage from "../../../../../assets/images/garbage.png";
import { priveledges, allRoles } from "../../../../../dummy_data/dymmy_data";
import { useState, useEffect } from "react";
import CustomButton from "../../../../../components/button/button";
import TextAndTextButton from "../../../components/text_and_textbutton";
import CustomDialog from "../../../../../components/dialog/dialog";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import AppConstants from "../../../../../config/app_constants";
import {
  selectAnEmployee,
  changeSelectedEmployeesName,
  changeSelectedEmployeesLastname,
  changeSelectedEmployeesPhone,
  changeSelectedEmployeesRole,
  getListOfEmployees,
  addEmployee,
  editEmployee,
  selectARoleName,
  selectARoleId,
  selectARoleCode,
  deleteEmployee,
  resetChanges,
  removeEmployeeFromList,
  returnDeletedEmployee,
  selectAPriveledge,
} from "../../../../../features/employees_slice";
import CustomSnackbar from "../../../../../components/snackbar/custom_snackbar";

export default function Employees({ listOfEmployees, gymId }) {
  const dispatch = useDispatch();
  const employeesSlice = useSelector((state) => state.employees);
  const canEdit = localStorage.getItem(AppConstants.keyRoleId) === "1" || localStorage.getItem(AppConstants.keyRoleId) === "3";

  // use state for add employees dialog
  const [nameTextfieldHasFocus, setNameFocus] = useState(false);
  const [surnameTextfieldHasFocus, setSurnameFocus] = useState(false);
  const [phoneNumberTextfieldHasFocus, setPhoneFocus] = useState(false);
  const [isDropDownOpened, openDropDown] = useState(false);
  const [name, setname] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState("1");
  const [roleCode, setRoleCode] = useState("ROLE_ADMIN");
  const [roleName, setRoleName] = useState("Администратор");
  const [priveledgesOfEmployee, setPriveledges] = useState([1, 2, 3, 4]);
  const [nameNotValidated, setNameNotValidated] = useState();
  const [phoneNotValidated, setPhoneNotValidated] = useState();
  const [isAddEmployeesDialogOpened, openAddEmployeesDialog] = useState(false);
  const [cancelDeleteTimeoutEmployees, setCancelDeleteTimeoutEmployees] =
    useState([]);
  //use states for refactor employees dialog
  const [nameTextfield2HasFocus, setName2Focus] = useState(false);
  const [surnameTextfield2HasFocus, setSurname2Focus] = useState(false);
  const [phoneNumberTextfield2HasFocus, setPhone2Focus] = useState(false);
  const [isDropDown2Opened, openDropDown2] = useState(false);
  const [isRefEmployeesDialogOpened, openRefEmployeesDialog] = useState(false);
  const [isFromRef, setIsFromRef] = useState(false);

  // snackbar ref
  const deleteEmployeeSnackRef = useRef();

  // functions for addemployees dialog
  function openCloseDropDown() {
    openDropDown(!isDropDownOpened);
  }

  const changeName = (event) => {
    setname(event.target.value);
  };

  const changeSurName = (event) => {
    setSurname(event.target.value);
  };

  function removeDatas() {
    setname("");
    setSurname("");
    setPhoneNumber("");
    setRoleId("1");
    setRoleCode("ROLE_ADMIN");
    setRoleName("Администратор");
    setPriveledges([1, 2, 3, 4]);
  }

  const changePhone = (event) => {
    // Удалить все нецифровые символы из строки
    const digitsOnly = event.target.value.replace(/\D/g, "");
    // Добавить нужные символы для форматирования номера
    const formattedNumber = `+7${digitsOnly.slice(1, 11)}`;
    setPhoneNumber(formattedNumber);
  };

  // functions for refactor employees dialog
  function openCloseDropDown2() {
    openDropDown2(!isDropDown2Opened);
  }

  function getCorrectRole(userRoles){
    const firstFoundRole = allRoles.find(role => 
      userRoles.some(userRole => userRole.id === role.id)
    );
    return firstFoundRole;
  }

  useEffect(() => {
    if (employeesSlice.selectedEmployee !== null) {
      dispatch(selectAPriveledge(employeesSlice.selectedEmployee.roles[0].privilegesId));
    }
  }, [employeesSlice.selectedEmployee]);

  return (
    (
      <div className="employees_container">
        <TextAndTextButton
          text1={"Сотрудники"}
          text2={listOfEmployees && listOfEmployees?.length === 0 ? "" : "Редактировать"}
          onclick={() => listOfEmployees?.length === 0 ? {} : openRefEmployeesDialog(true)}
          showText2={canEdit}
        />
        {listOfEmployees?.length !== 0 && isRefEmployeesDialogOpened && (
          <CustomDialog
            isOpened={isRefEmployeesDialogOpened}
            closeOnTapOutside={() => {openRefEmployeesDialog(false)}}
          >
          {/* Refactor employees dialog body */}
            <div className="refEmployeeDialog">
              <div className="flex flex-col gap-[5px]">
                <div className="text-[16px] font-semibold leading-[16px]">
                  Редактировать сотрудника
                </div>
                <div className="text-[14px] font-normal leading-[16px]">
                  Здесь вы можете изменить личную информацию о сотруднике, такую
                  как имя, или номер телефона, а так же настроить уровень его
                  доступа.
                </div>
              </div>
              {/* Choose an employee */}
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-row gap-[10px] items-center">
                  <img src={userLogo} alt="" />
                  <div className="text-[16px] font-semibold leading-[16px]">
                    Выберите сотрудника для редактирования
                  </div>
                </div>
                <div className="employees_wrap">
                  {listOfEmployees?.filter((employee) =>
                        !employeesSlice.deletedEmployess.some(
                          (deletedEmployee) =>deletedEmployee.id === employee.id))
                    .map((employee) => {
                      return (
                        <EachEmployee
                          key={employee.id}
                          photo={goggins}
                          lastName={employee.lastName == null || employee.lastName == ""? "" : employee.lastName}
                          name={employee.firstName}
                          job={employee.roles?.length === 0 ? "Нет роли": employee.roles[0].name}
                          onDeleteClicked={async () => {
                            dispatch(removeEmployeeFromList(employee));
                            const cancelTimeOut =
                              deleteEmployeeSnackRef.current.show(
                                "Вы удалили сотрудника",
                                // function when time ended
                                async () => {
                                  const { gymid, employeeId } = {
                                    gymid: gymId,
                                    employeeId: employee.id,
                                  };
                                  await dispatch(deleteEmployee({ gymid, employeeId }));
                                  dispatch(getListOfEmployees(gymId));
                                }
                              );
                            setCancelDeleteTimeoutEmployees((prevState) => [
                              ...prevState,
                              cancelTimeOut,
                            ]);
                          }}
                          //isThatYou={localStorage.id === employee.id} <== maybe?
                          showPointer={true}
                          onEmployeeClicked={() =>dispatch(selectAnEmployee(employee))}
                          isSelected={employeesSlice.selectedEmployee !== null 
                            ? employeesSlice.selectedEmployee.id === employee.id : false }/>
                      );
                    })}
                  <div
                    className="button"
                    onClick={() => {
                      openRefEmployeesDialog(false);
                      setIsFromRef(true);
                      openAddEmployeesDialog(true);
                    }}
                  >
                    <img src={addSvg} alt="" />
                    <div className="">Добавить</div>
                  </div>
                </div>
              </div>
              {/* Personal info */}
              {employeesSlice.selectedEmployee !== null && (
                <>
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-row gap-[10px] items-center">
                      <img className="w-[24px] h-[24px]" src={docsSvg} alt="" />
                      <div className="text-[16px] font-semibold leading-[16px]">
                        Личная информация
                      </div>
                    </div>
                    <div className="flex flex-col gap-[10px] pl-[35px]">
                      <div className="flex flex-row gap-[32px] ">
                        {/* Name */}
                        <TextAndTextfield
                        textfieldsMinHeight={"40px"}
                          value={employeesSlice.selectedEmployee !== null ? employeesSlice.selectedEmployee.firstName : ""}
                          onChange={(event) => {dispatch(changeSelectedEmployeesName(event.target.value))}}
                          textfieldHasFocus={nameTextfield2HasFocus}
                          requestFocus={() => setName2Focus(true)}
                          removeFocus={() => setName2Focus(false)}
                          text={"Имя сотрудника"}
                          placeholder={"Имя"}
                          logo={userLogo}
                          showLogo={true}
                        />
                        {/* Surname */}
                        <TextAndTextfield
                        textfieldsMinHeight={"40px"}
                          value={employeesSlice.selectedEmployee !== null && employeesSlice.selectedEmployee.lastName === null
                              ? "": employeesSlice.selectedEmployee !== null && employeesSlice.selectedEmployee.lastName !==
                              null? employeesSlice.selectedEmployee.lastName : ""}
                          onChange={(event) => {dispatch(changeSelectedEmployeesLastname(event.target.value))}}
                          textfieldHasFocus={surnameTextfield2HasFocus}
                          requestFocus={() => setSurname2Focus(true)}
                          removeFocus={() => setSurname2Focus(false)}
                          text={"Фамилия"}
                          placeholder={"Фамилия"}
                          logo={userLogo}
                          showLogo={true}
                        />
                      </div>
                      <div className="flex flex-row gap-[32px]">
                        {/* Phone */}
                        <TextAndTextfield
                          textfieldsMinHeight={"40px"}
                          value={employeesSlice.selectedEmployee !== null ? employeesSlice.selectedEmployee.login : ""}
                          onChange={(event) => {
                            dispatch(changeSelectedEmployeesPhone(event.target.value.replace(/\D/g, "")));
                          }}
                          textfieldHasFocus={phoneNumberTextfield2HasFocus}
                          requestFocus={() => setPhone2Focus(true)}
                          removeFocus={() => setPhone2Focus(false)}
                          text={"Номер телефона"}
                          placeholder={"+7 (900) 855 45-58"}
                          logo={phoneSvg}
                          isPhoneTextfield={true}
                          showLogo={true}
                        />
                        {/* Empty space */}
                        <div className="w-full"></div>
                      </div>
                    </div>
                  </div>
                  {/* Dropdown section */}
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex flex-row gap-[10px] items-center">
                      <img src={starSvg} alt="" />
                      <div className="text-[16px] font-semibold leading-[16px]">
                        Роль сотрудника
                      </div>
                    </div>
                    <div className="flex flex-col gap-[5px] w-fit h-fit ml-[34px]">
                      <div className="text-[16px] font-medium leading-[16px]">
                        Уровень доступа сотрудника{" "}
                      </div>
                      <CustomDropdownForRef
                        currentRole={ employeesSlice.selectedEmployee.roles[0].name
                          
                          /* employeesSlice.selectedRoleName !== null ? employeesSlice.selectedRoleName
                            : employeesSlice.selectedEmployee === null ? "": employeesSlice.selectedEmployee.roles.length === 0
                            ? "Нет роли" : employeesSlice.selectedEmployee.roles[0].name */
                        }
                        isDropDownOpened={isDropDown2Opened}
                        openCloseDropDown={openCloseDropDown2}
                        bloclClick={employeesSlice.selectedEmployee === null}
                        othetFunctions={(role) => {
                          setRoleId(role.id);
                          setRoleCode(role.code);
                          setRoleName(role.name);
                          setPriveledges(role.priveledges);
                        }}
                      />
                    </div>
                  </div>

                  {/* blue container  */}
                  <div className="big_blue_container">
                    <div className="text-[14px] font-normal leading-[16px]">
                      Подробная информация о том, какими правами наделена
                      выбранная вами роль
                    </div>
                    {priveledges.map((priveledge) => {
                      if (employeesSlice.selectedEmployeesPriveledges) {
                        const isAvailable = employeesSlice.selectedEmployeesPriveledges.includes(priveledge.id);
                        return (
                          <div
                            key={priveledge.id}
                            className="flex flex-row gap-[10px] items-center">
                            <img
                              src={isAvailable ? availableSvg : notAvailable}
                              alt=""/>
                            <div
                            className={`text-[14px] font-normal leading-[16px] ${isAvailable ? "" : "text-grey-text"}`}>
                              {priveledge.name}
                            </div>
                          </div>
                        );
                      } /* else {
                        const isAvailable = priveledgesOfEmployee.includes(priveledge.id);
                        return (
                          <div
                            key={priveledge.id}
                            className="flex flex-row gap-[10px] items-center">
                            <img
                              src={isAvailable ? availableSvg : notAvailable}
                              alt=""/>
                            <div
                              className={`text-[14px] font-normal leading-[16px] ${isAvailable ? "" : "text-grey-text"}`}>
                              {priveledge.name}
                            </div>
                          </div>
                        );
                      } */
                    })}
                  </div>
                </>
              )}
              <div className="flex flex-col gap-2">
                <CustomButton
                  width={"100%"}
                  height={"40px"}
                  title={employeesSlice.isChangesOccured ? "Применять изменения" : "Завершить редактирование"}
                  onСlick={async () => {
                    if (employeesSlice.isChangesOccured) {
                      const { id, roles, firstName, lastName, login } = employeesSlice.selectedEmployee;
                      await dispatch(editEmployee({gymId,id,roles,firstName,lastName,login}));
                      dispatch(getListOfEmployees(gymId));
                    }
                    dispatch(resetChanges());
                    openRefEmployeesDialog(false);
                  }}
                />
              </div>
            </div>
          </CustomDialog>
        )}
        <div className="employees_list">
          {listOfEmployees
            ?.filter((employee) =>!employeesSlice.deletedEmployess.some(
                  (deletedEmployee) => deletedEmployee.id === employee.id))
            .map((employee) => {
              return (
                <EachEmployee
                  key={employee.id}
                  photo={goggins}
                  name={employee.firstName}
                  lastName={employee.lastName}
                  job={getCorrectRole(employee.roles).name}
                //isThatYou={localStorage.id === employee.id} <== maybe?
                />
              );
            })}
          {/* Add button */}
          <div
            style={{
              borderRadius: "16px",
            }}
            className="button"
            onClick={() => {
              openAddEmployeesDialog(true);
              if (isFromRef) {
                setIsFromRef(false);
              }
            }}
          >
            <img src={addSvg} alt="" />
            <div className="">Добавить</div>
          </div>
          <CustomSnackbar
            ref={deleteEmployeeSnackRef}
            undoAction={() => {
              dispatch(returnDeletedEmployee());
              if (cancelDeleteTimeoutEmployees.length > 0) {
                const lastCancelFunction =
                  cancelDeleteTimeoutEmployees[
                  cancelDeleteTimeoutEmployees.length - 1
                  ];
                lastCancelFunction();
                setCancelDeleteTimeoutEmployees((prevState) =>
                  prevState.slice(0, -1)
                );
              }
            }}
          />

          {/* Add employee dialog */}
          {isAddEmployeesDialogOpened && (
            <CustomDialog
              isOpened={isAddEmployeesDialogOpened}
              closeOnTapOutside={() => {
                openAddEmployeesDialog(false);
                if (isFromRef) {
                  openRefEmployeesDialog(true);
                }
              }}
            >
              {/* Add employee dialog body */}
              <div className="add_employee_dialog">
                <div className="flex flex-col gap-[5px]">
                  <div className="text-[16px] font-semibold leading-[16px]">
                    Добавить нового сотрудника
                  </div>

                  <div className="text-[14px] font-normal leading-[16px]">
                    Вам нужно указать номер телефона человека, которого вы
                    хотите добавить. С помощью этого номера он сможет войти на
                    платформу. Так же необходимо задать уровень доступа.
                  </div>
                </div>
                <div className="flex flex-row gap-[24px]">
                  {/* Иям */}
                  <TextAndTextfield
                    textfieldsMinHeight={"40px"}
                    value={name}
                    onChange={changeName}
                    textfieldHasFocus={nameTextfieldHasFocus}
                    requestFocus={() => setNameFocus(true)}
                    removeFocus={() => setNameFocus(false)}
                    text={"Имя сотрудника"}
                    placeholder={"Имя"}
                    logo={userLogo}
                    isError={nameNotValidated}
                    showLogo={true}
                  />
                  {/* Фамилия */}
                  <TextAndTextfield
                    textfieldsMinHeight={"40px"}
                    value={surname}
                    onChange={changeSurName}
                    textfieldHasFocus={surnameTextfieldHasFocus}
                    requestFocus={() => setSurnameFocus(true)}
                    removeFocus={() => setSurnameFocus(false)}
                    text={"Фамилия"}
                    placeholder={"Фамилия"}
                    logo={userLogo}
                    showLogo={true}
                  />
                </div>
                <div className="flex flex-row gap-[24px]">
                  {/* Номер */}
                  <TextAndTextfield
                    textfieldsMinHeight={"40px"}
                    value={phoneNumber}
                    onChange={changePhone}
                    textfieldHasFocus={phoneNumberTextfieldHasFocus}
                    requestFocus={() => setPhoneFocus(true)}
                    removeFocus={() => setPhoneFocus(false)}
                    text={"Номер телефона"}
                    placeholder={"+7 (900) 855 45-58"}
                    logo={phoneSvg}
                    isPhoneTextfield={true}
                    showLogo={true}
                    isError={phoneNotValidated}
                  />
                  {/* Drop down */}
                  <div className="flex flex-col gap-[5px] w-full ">
                    <div className="text-[14px] font-bold">
                      Уровень доступа сотрудника
                    </div>
                    <CustomDropdownForAddingEmployee
                      currentRole={roleName}
                      isDropDownOpened={isDropDownOpened}
                      openCloseDropDown={openCloseDropDown}
                      onRoleSelected={async (role) => {
                        setRoleId(role.id);
                        setRoleCode(role.code);
                        setRoleName(role.name);
                        setPriveledges(role.priveledges);
                        openCloseDropDown();
                      }}
                    />
                  </div>
                </div>
                {/* blue container  */}
                <div className="big_blue_container">
                  <div className="text-[14px] font-normal leading-[16px]">
                    Подробная информация о том, какими правами наделена
                    выбранная вами роль
                  </div>
                  {priveledges.map((priveledge) => {
                    const isAvailable = priveledgesOfEmployee.includes(priveledge.id);
                    return (
                      <div
                        key={priveledge.id}
                        className="flex flex-row gap-[10px] items-center">
                        <img
                          src={isAvailable ? availableSvg : notAvailable}
                          alt=""/>
                        <div
                          className={`text-[14px] font-normal leading-[16px] ${isAvailable ? "" : "text-grey-text"}`}>
                          {priveledge.name}
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
                    После того, как вы добавите нового сотрудника - ему
                    необходимо перейти по адресу myfit.ru/admin и войти в
                    систему, используя свой номер телефона. Там он получит смс с
                    кодом, который сможет использовать как пароль для входа.
                  </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <CustomButton
                    width={"100%"}
                    height={"40px"}
                    title={"Добавить сотрудника"}
                    onСlick={async () => {
                      // Assume both fields are valid to start with
                      let isPhoneValid = true;
                      let isNameValid = true;
                      // Check phone number validity (assuming you want exactly 18 characters)
                      if (phoneNumber.length !== 12) {
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
                      // when validation passes
                      if (isPhoneValid && isNameValid) {
                        const { firstName, lastName, login, roles } = {
                          firstName: name,
                          lastName: surname,
                          login: phoneNumber,
                          roles: [
                            {
                              id: roleId,
                              code: roleCode,
                              name: roleName,
                            },
                          ],
                        };
                        await dispatch(addEmployee({gymId,firstName,lastName,login,roles}));
                        dispatch(getListOfEmployees(gymId));
                        openAddEmployeesDialog(false);
                        if (isFromRef) {
                          openRefEmployeesDialog(true);
                        }
                        removeDatas();
                      }
                    }}
                  />
                  {(nameNotValidated || phoneNotValidated) && (
                    <div className="text-[14px] font-normal text-red-400 leading-[16px]">
                      Чтобы продолжить - необходимо заполнить все обязательные
                      поля, выделенные красным
                    </div>
                  )}
                </div>
              </div>
            </CustomDialog>
          )}
        </div>
      </div>
    )
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
  onDeleteClicked,
}) {
  return (
    <div
      className={isSelected ? "selected_employee_row" : showPointer ? "each_employee cursor-pointer" : "each_employee"}
      onClick={onEmployeeClicked}>
      {!isSelected && (
        <>
          {/* Photo */}
          <div className="w-[32px] h-[32px] bg-button-color rounded-[50%] p-[2px]">
            <img className="w-full h-full rounded-[50%]" src={photo} alt="" />
          </div>
          {/* Name and job */}
          <div className="flex flex-col gap-0 justify-center">
            <div className="flex flex-row gap-[3px]">
              <div className="text-[14px] font-bold leading-none">
                {name} {lastName}
              </div>
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
                <div className="text-[14px] font-bold leading-none">
                  {name} {lastName}
                </div>
                <div className="you leading-none">
                  {isThatYou ? "(Вы)" : ""}
                </div>
              </div>
              <div className="text-[14px] font-normal leading-none">{job}</div>
            </div>
          </div>
          <div className="delete_red_container" onClick={onDeleteClicked}>
            <img src={garbage} alt="" />
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
  showLogo,
  lineheight,
  maxLength,
  showMaxLength,
  showTextArea,
  fontSize,
  fontWeight,
  textfieldsMinHeight,
  onKeyDown,
}) {

  const inputRef = useRef(null);
  // for autofocus calls when component first renders
  useEffect(() => {
    const input = inputRef.current;
    if (input && !isPhoneTextfield) {
      input.focus();
      // Set the cursor to the end of the text
      const length = input.value.length;
      input.setSelectionRange(length, length);
      // set the height relatively textfields content
      input.style.height = "inherit"; // Reset height to recalculate
      input.style.height = `${input.scrollHeight}px`; // Set new height based on scroll height
    }
    if (input && isPhoneTextfield) {
      const length = value.length; //79999999999
      const selection = input.getSelection();
      //input.setSelectionRange(length, length);
      console.log(selection);
      
    }
  }, [value]);

  // Обработчик события вставки
  const handlePaste = (e) => {
    if (!isPhoneTextfield) return;

    e.preventDefault(); // Предотвратить стандартное поведение вставки
    const text = e.clipboardData.getData('text'); // Получить текст из буфера обмена
    const cleanedText = text.replace(/\D/g, ''); // Очистить текст от нецифровых символов

    // Программно установить значение, учитывая маску
    if (cleanedText) {
      const formattedNumber = `+7${cleanedText.substring(1)}`; // Форматировать номер, добавив +7
      onChange({ target: { value: formattedNumber } }); // Имитировать событие изменения для обновления состояния
      // Проверьте, существует ли input элемент и метод setSelectionRange
    if (inputRef.current && inputRef.current.input && typeof inputRef.current.input.setSelectionRange === 'function') {
      inputRef.current.input.setSelectionRange(formattedNumber.length, formattedNumber.length);
    }
    }
  };

  return (
    <div className="flex flex-col gap-[5px] w-full ">
      <div
        className={isError ? "text-[14px] font-bold text-red-text" : "text-[14px] font-bold"}
      >
        {text}
      </div>
      <div
      style={{minHeight : textfieldsMinHeight}}
        className={textfieldHasFocus ? "icon_and_textfield_row_focused" : isError ? "error" : "icon_and_textfield_row"}
      >
        {showLogo && <img src={logo} className="userlogo" alt="" />}
        {isPhoneTextfield && (
          <ReactInputMask
            className="textfiled"
            mask="+7 (999) 999 99-99"
            placeholder="+7 (900) 855 45-58"
            ref={(ref) => inputRef.current = ref} 
            maskChar={null}
            value={value}
            onFocus={requestFocus}
            onBlur={removeFocus}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={handlePaste}
          />
        )}
        {!isPhoneTextfield && !showTextArea && (
          <input
            ref={inputRef}
            value={value}
            type="text"
            required
            minLength={"1"}
            className="textfiled"
            onFocus={requestFocus}
            onBlur={removeFocus}
            placeholder={placeholder}
            onChange={onChange}
            style={{
              lineHeight: `${lineheight}px`,
              fontSize: fontSize ,
              fontWeight: fontWeight,
              height: "auto",
              maxHeight: `${10 * lineheight}px`, // Set max height to 10 lines
              minHeight: `${lineheight}px`,
              overflow: 'auto',
            }}

          />
        )}
        {showTextArea && (
          <textarea
            ref={inputRef}
            value={value}
            type="text"
            className="textfiled"
            onFocus={requestFocus}
            onBlur={removeFocus}
            placeholder={placeholder}
            onChange={onChange}
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              lineHeight: `${lineheight}px`,
              height: "auto",
              maxHeight: `${10 * lineheight}px`, // Set max height to 10 lines
              minHeight: `${lineheight}px`,
              overflow: 'auto',
              resize: 'none', // Disables user resize
              boxSizing: 'border-box', 
            }}
          />
        )}
      </div>
      {showMaxLength &&
        <div className="text-[12px] font-normal text-grey-text">{`${value.length}/${maxLength ?? 100}`}</div>
      }
    </div>
  );
}

function CustomDropdownForRef({
  isDropDownOpened,
  currentRole,
  openCloseDropDown,
  bloclClick,
  othetFunctions,
}) {
  const dispatch = useDispatch();
  return (
    <div className="column">
      <button
        className={
          isDropDownOpened ? "dropdown_header_opened" : "dropdown_header"
        }
        onClick={bloclClick ? () => { } : openCloseDropDown}
      >
        <div className="text-[14px] font-medium">
          {bloclClick ? "Выберите сотрудника" : currentRole}
        </div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div className="dropdownBody">
          {allRoles.map((item, index) => (
            <button
              key={index}
              className="gym_names"
              onClick={async () => {
                dispatch(selectARoleName(item.name));
                dispatch(selectARoleId(item.id));
                dispatch(selectARoleCode(item.code));
                dispatch(changeSelectedEmployeesRole());
                dispatch(selectAPriveledge(item.priveledges));
                openCloseDropDown();
                othetFunctions(item);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomDropdownForAddingEmployee({
  isDropDownOpened,
  currentRole,
  openCloseDropDown,
  bloclClick,
  onRoleSelected,
}) {
  return (
    <div className="column">
      <button
        className={
          isDropDownOpened ? "dropdown_header_opened" : "dropdown_header"
        }
        onClick={bloclClick ? () => { } : openCloseDropDown}
      >
        <div className="text-[14px] font-medium">
          {bloclClick ? "Выберите сотрудника" : currentRole}
        </div>
        <div className={isDropDownOpened ? "rotate-icon" : "arrow-icon"}>
          <img src={arrowDownSvg} alt="" />
        </div>
      </button>
      {isDropDownOpened && (
        <div className="dropdownBodyForEmp">
          {allRoles.map((item, index) => (
            <button
              key={index}
              className="gym_names"
              onClick={() => onRoleSelected(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
