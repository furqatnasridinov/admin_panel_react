import React from 'react'
import "./index.css"
import VerticalSpace from '../../../components/VerticalSpace'
import CrmTextField from '../../../components/crm/CrmTextField'
import { useState, useRef, useCallback, useEffect } from 'react'
import crmAddDocs from "../../../assets/svg/crmAddDocs.svg"
import GreenButton from '../../../components/crm/GreenButton'
import CrmWhiteButton from '../../../components/crm/white_button/CrmWhiteButton'
import CrmDeleteSnackbar from '../../../components/crm/delete_snackbar/CrmDeleteSnackBar'
import { useDispatch, useSelector } from 'react-redux'
import {setAddress,
    setSerie,
    setNumber,
    setDate,
    setCode,
    checkMissingFieldsPassportData, 
    resertPassportInfos,
    updateClient,
    pushDoc,
    removeDocTmp,
    cancelRemoveDoc,
    setDocs
} 
from '../../../features/crm/CrmClients'
import { getBirthdayFormatted, getDocName } from '../../../config/apphelpers'
import { toast } from 'react-toastify'
import axiosClient from '../../../config/axios_client'
import AppConstants from '../../../config/app_constants'


export default function PassportDatas({
    id,
    isCreating = false,
}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.crmClients);
    const canEdit = useSelector((state) => state.login.canEdit); 
    const [currentFocus, setCurrentFocus] = useState("");
    const [isSeriesError, setIsSeriesError] = useState(false);
    const [isNumberError, setIsNumberError] = useState(false);
    const [isDateError, setIsDateError] = useState(false);
    const [isCodeError, setIsCodeError] = useState(false);
    const [isAddressError, setIsAddressError] = useState(false);
    const showButtons = state.changesOccuredPassportData;
    const showError = state.missingFieldsPassportData?.length > 0;
    const [file, setFile] = useState(null);
    const [fileCopy, setFileCopy] = useState(null);
    const [cancelDeleteTimeoutFile, setCancelDeleteTimeoutFile] = useState(null);
    const [showFileTooltip, setShowFileTooltip] = useState(-1);
    const fileInputRef = useRef(null);
    const deleteFileRef = useRef(null);
    const dateInputBorder = isDateError ? "1px solid rgba(255, 61, 0, 1)" : currentFocus === 'date' ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';
    
    function handleMouseEnter(index) {
        if (showFileTooltip !== index) {
            setShowFileTooltip(index);
        }
    }

    function handleMouseLeave() {
        setShowFileTooltip(-1);
    }

    function handleFileUpload(e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                try {
                    const file = files[i];
                    var formData = new FormData();
                    formData.append("file", file);
                    axiosClient.post(`api/crm/client/${id}/addDoc`, formData,{
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                        .then((res) => {
                            if (res.status === 200) {
                                toast.success("Файл успешно загружен на сервер");
                                getUpdatedDocsFromServer();
                                //dispatch(pushDoc(file));
                            }
                        })
                        .catch((error) => {
                            toast.error("Ошибка при загрузке файла" + error);
                        });
                } catch (error) {
                    toast.error("Ошибка при загрузке файла" + error);
                }
                /* const file = files[i];
                dispatch(pushDoc(file)); */
            }
        }
    } 

    function handleDelete() {
        setFile(null); 
    }

    function tmpDeleteFile(doc) {
        dispatch(removeDocTmp(doc));
        setShowFileTooltip(-1);
        deleteFileRef.current.showSnackbars();
        const cancelTimeout = deleteFileRef.current.show(
            `Вы удалили документ : ${getDocName(doc)}`,
            () => {
                // function when onTime Ended
                /* const { gymId } = { gymId: currentGym.id };
                dispatch(removeGymMainPic({ gymId }));
                dispatch(removePhotoCopy()); */
            });
        setCancelDeleteTimeoutFile(() => cancelTimeout)
    }

    function handleDownloadFile(doc) {
        try {
            const fileName = getDocName(doc);
            const link = document.createElement('a');
            link.href = `${AppConstants.baseUrl}/image/${doc}`;
            link.setAttribute('download', fileName);
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            toast(`handleDownload ${error}`);
        }
    }

    function handleViewDocument(doc) {
        window.open(`https://docs.google.com/viewerng/viewer?url=${AppConstants.baseUrl}/image/${doc}`, '_blank');
    }

    function handleSeriesChange(e) {
        const numbers = e.target.value.replace(/\D/g, '');
        dispatch(setSerie(numbers));
        dispatch(checkMissingFieldsPassportData());
    
    }

    function handleNumberChange(e) {
        dispatch(setNumber(e.target.value));
        dispatch(checkMissingFieldsPassportData());
    
    }

    function handleDateChange(e) {
        dispatch(setDate(e.target.value));
        dispatch(checkMissingFieldsPassportData());
    }

    function handleCodeChange(e) {
        const numbers = e.target.value.replace(/\D/g, '');
        dispatch(setCode(numbers));
        dispatch(checkMissingFieldsPassportData()); 
    }

    function handleAddressChange(e) {
        dispatch(setAddress(e.target.value));
        dispatch(checkMissingFieldsPassportData());
    }

    function getUpdatedDocsFromServer(){
        // отправляем запрос на гет юзер, и берем только документы
        axiosClient.get(`api/crm/client/${id}`)
        .then((res) => {
            if (res.status === 200) {
                const docs = res.data["object"]["docs"];
                dispatch(setDocs(docs));
            }
        })
        .catch((error) => {
            console.log("getUpdatedDocsFromServer " + error);
        });
    }


    const undoDeleteFile = useCallback(() => {
        dispatch(cancelRemoveDoc());
        if (cancelDeleteTimeoutFile) {
            cancelDeleteTimeoutFile();
        }
        if (showFileTooltip) {
            setShowFileTooltip(false);
        }
      }, [cancelDeleteTimeoutFile]);

    useEffect(() => {
        const arr = state.missingFieldsPassportData;
        setIsSeriesError(arr.includes("serie"));
        setIsNumberError(arr.includes("number"));
        setIsDateError(arr.includes("date"));
        setIsCodeError(arr.includes("code"));
        setIsAddressError(arr.includes("address"));
    }, [state.missingFieldsPassportData]);

    async function updateClientFunc() {
        const canSend = state.missingFieldsPassportData?.length === 0;
        if (canSend) {
            const formattedDate = getBirthdayFormatted(state.date);
            const body = {
                "id": id,
                "series": state.serie,
                "number": state.number,
                "dateOfIssue": formattedDate,
                "departmentCode": state.code,
                "issuedBy": state.address,
            }
            await dispatch(updateClient(body));
            dispatch(resertPassportInfos());
            console.log(`Отправлено: ${JSON.stringify(body)}`);
        }else{
            toast.error("Заполните все обязательные поля")
        }
    }

  return (
    <div className='customCard'>
        <div className="columnWithNoGap">
            <span className='headerH2'>Документы</span>
            <span className='label2'>Тут находятся данные о документах клиента, а так же копия договора</span>
        </div>

        <VerticalSpace height='32px' />

            {canEdit &&
              <div className="colGap10">
                  <span className='label2bPlus'>Данные паспорта</span>
                  <div className="rowGap10">
                      <CrmTextField
                          label='Серия'
                          onChange={handleSeriesChange}
                          value={state.serie}
                          onFocus={() => setCurrentFocus("serie")}
                          onBlur={() => setCurrentFocus("")}
                          hasFocus={currentFocus === "serie"}
                          isError={isSeriesError}
                          width='75px'
                          mask='99 99'
                          showMaxLength={false}
                          showInputMask={true}
                      />
                      <CrmTextField
                          label='Номер'
                          onChange={handleNumberChange}
                          value={state.number}
                          onFocus={() => setCurrentFocus("number")}
                          onBlur={() => setCurrentFocus("")}
                          hasFocus={currentFocus === "number"}
                          isError={isNumberError}
                          width='90px'
                          showInputMask={true}
                          showMaxLength={false}
                          mask='999999'
                      />
                      <CrmTextField
                          label='Дата выдачи'
                          onChange={handleDateChange}
                          value={state.date}
                          onFocus={() => setCurrentFocus("date")}
                          onBlur={() => setCurrentFocus("")}
                          hasFocus={currentFocus === "date"}
                          isError={isDateError}
                          width='130px'
                          showInputMask={true}
                          showMaxLength={false}
                          mask='99.99.9999'
                      />
                      <CrmTextField
                          label='Код подразделения'
                          onChange={handleCodeChange}
                          value={state.code}
                          onFocus={() => setCurrentFocus("code")}
                          onBlur={() => setCurrentFocus("")}
                          hasFocus={currentFocus === "code"}
                          isError={isCodeError}
                          showMaxLength={false}
                          width='170px'
                          mask='999-999'
                          showInputMask={true}
                      />
                      <CrmTextField
                          label='Кем выдан'
                          onChange={handleAddressChange}
                          value={state.address}
                          onFocus={() => setCurrentFocus("address")}
                          onBlur={() => setCurrentFocus("")}
                          hasFocus={currentFocus === "address"}
                          isError={isAddressError}
                          width='350px'
                          maxLength={100}
                      />
                  </div>
              </div>
            }

            {!canEdit && 
                <div className="columnWithNoGap">
                    <span className='label2bPlus'>Паспортные данные</span>
                    <div className="rowGap10">
                        <OnlySeeDatas firstText='Серия' seconText={state.serie} />
                        <OnlySeeDatas firstText='Номер' seconText={state.number} />
                        <OnlySeeDatas firstText='Дата выдачи' seconText={state.date} />
                        <OnlySeeDatas firstText='Код подразделения' seconText={state.code} />
                        <OnlySeeDatas firstText='Кем выдан' seconText={state.address} />
                    </div>
                </div>
            }

        <VerticalSpace height='32px' />

        <div className="colGap10">
            <span className='label2bPlus'>Копия договора и другие документы</span>
              <div className="rowGap14">
                  {state.docs && state.docs
                  .filter((doc) => !state.removedDocs.includes(doc))
                  .map((doc, index) => {
                    const name = typeof doc === 'string' ? getDocName(doc) : doc?.name;
                      return (
                          <div key={index} className="relative" onMouseLeave={handleMouseLeave}>
                              <div
                                  className="fileCard"
                                  onMouseEnter={()=>handleMouseEnter(index)}>
                                  <div className="rowGap10">
                                      <DocSvg />
                                      <div className='twoLineTextWithEllipsis'>
                                          {name|| "Неизвестное название файла"}
                                      </div>
                                  </div>
                              </div>
                              {showFileTooltip === index &&
                                  <DocsToolTip
                                      onDelete={()=>tmpDeleteFile(doc)}
                                      onDownload={()=>handleDownloadFile(doc)}
                                      onView={()=>handleViewDocument(doc)}
                                      canDelete={canEdit}
                                  />
                              }
                          </div>
                      );
                  })}
                      
                  <>
                      <img
                          className='cursor-pointer'
                          src={crmAddDocs}
                          onClick={() => fileInputRef.current.click()}
                          alt="crmAddDocsSvg" />
                      <input
                          type="file"
                          ref={fileInputRef}
                          multiple={true}
                          accept='.doc, .docx, .pdf'
                          style={{ display: "none" }}
                          onChange={handleFileUpload}
                      />
                  </>
              </div>
        </div>

            {showButtons &&
              <>
                  <VerticalSpace height={32} />
                  <div className="rowGap12">
                      <CrmWhiteButton onClick={() => {dispatch(resertPassportInfos())}} />
                      <GreenButton
                          text='Сохранить'
                          onClick={() => {
                              dispatch(checkMissingFieldsPassportData());
                              updateClientFunc();
                          }} />
                  </div>
                  {showError &&
                      <>
                          <VerticalSpace height={32} />
                          <span className='errorText'>Чтобы продолжить - необходимо заполнить все обязательные поля, выделенные красным</span>
                      </>
                  }

              </>
            }

        <CrmDeleteSnackbar ref={deleteFileRef} undoAction={undoDeleteFile}  />
    </div>
  )
}


// components

function DocsToolTip({
    onDelete,
    onView,
    onDownload,
    canDelete,
}){
    return (
        <div className="fileToolTip">
            {canDelete &&
                <div className="garbageContainer" onClick={onDelete}>
                    <GarbageSvg />
                </div>
            }
            <div className="rowGap4" onClick={onView}>
                <div className="greenMiniCard">
                    <EyeSvg />
                </div>
                <div className="greenMiniCard" onClick={onDownload}>
                    <DownLoadSvg />
                </div>
            </div>
        </div>
    )
}

function OnlySeeDatas({
    firstText,
    seconText,
}) {
    return <div className="columnWithNoGap">
        <span className='text-[10px] font-medium leading-[11px] text-text-faded-dark'>{firstText}</span>
        <span className='label2'>{seconText}</span>
    </div>
}

// svgs
function GarbageSvg() {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5.25H15M7.5 8.25V12.75M10.5 8.25V12.75M3.75 5.25L4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25L14.25 5.25M6.75 5.25V3C6.75 2.80109 6.82902 2.61032 6.96967 2.46967C7.11032 2.32902 7.30109 2.25 7.5 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V5.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}

function DocSvg() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.71484 17.3432V6.65698C2.71484 4.44784 4.5057 2.65698 6.71484 2.65698H17.2837C19.4929 2.65698 21.2837 4.44784 21.2837 6.65698V17.3432C21.2837 19.5524 19.4929 21.3432 17.2837 21.3432H6.71484C4.5057 21.3432 2.71484 19.5524 2.71484 17.3432Z" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.10156 16.6716L17.7805 16.6716" stroke="#3AB96D" stroke-linecap="round" />
            <path d="M6.10156 12L16.6126 12" stroke="#3AB96D" stroke-linecap="round" />
            <path d="M6.16016 7.32837H10.8317" stroke="#3AB96D" stroke-linecap="round" />
            <path d="M16.6133 2.65698V6.32854C16.6133 6.88083 17.061 7.32854 17.6133 7.32854H21.2848" stroke="#3AB96D" />
        </svg>
    )
}

function EyeSvg(){
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 10.5C9.82845 10.5 10.5 9.82845 10.5 9C10.5 8.17155 9.82845 7.5 9 7.5C8.17155 7.5 7.5 8.17155 7.5 9C7.5 9.82845 8.17155 10.5 9 10.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.75 9C14.3336 11.2432 11.7887 13.5 9 13.5C6.21127 13.5 3.66642 11.2432 2.25 9C3.97391 6.86869 5.99372 4.5 9 4.5C12.0063 4.5 14.0261 6.86865 15.75 9Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

function DownLoadSvg(){
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.25 7.5L9 11.25L12.75 7.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 11.25V2.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}