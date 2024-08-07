import React from 'react'
import "../sidebar/sidebar.css";
import { setAppType } from "../../features/app";
import { useDispatch, useSelector } from "react-redux";
import AppConstants from '../../config/app_constants';

export default function TabbarSection() {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const myFitClientsSlice = useSelector((state) => state.clients);

    function setMyfit() {
        dispatch(setAppType("MYFIT"));
        sessionStorage.setItem(AppConstants.keyAppState, "MYFIT")
    };

    function setCRM() {
        dispatch(setAppType("CRM"));
        sessionStorage.setItem(AppConstants.keyAppState, "CRM")
    };

    const myfitClassname = appState.appType === "MYFIT" ? "selected_tabbar_item_myfit" : "tabbar_item";
    const crmClassname = appState.appType === "CRM" ? "selected_tabbar_item_crm" : "tabbar_item";
    const borderTab = appState.appType === "MYFIT" ? "1px solid rgba(119, 170, 249, 1)" : "1px solid rgba(193, 249, 215, 1)";
    const showBagde = myFitClientsSlice.waitingForAccept?.length > 0 && appState.appType === "CRM";

  return (
      <div
          className="tabbar"
          style={{
              border: borderTab,
          }}
      >
          <div className={`${myfitClassname}`} onClick={setMyfit}>
              <span>Myfit</span>
              {showBagde && <div className="badgeInTab">{myFitClientsSlice.waitingForAccept?.length}</div>}
          </div>

          <div className={`${crmClassname}`} onClick={setCRM}>
              <span className="text-[14px] font-normal">CRM</span>
          </div>
      </div>
  )
}
