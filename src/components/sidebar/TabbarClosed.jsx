import React from 'react'
import "../sidebar/sidebar.css";
import { useSelector } from "react-redux";

export default function TabbarSectionClosed() {
    const appState = useSelector((state) => state.app);

    const myfitClassname = "selected_tabbar_item_myfit";
    const crmClassname =  "selected_tabbar_item_crm";
    const borderTab = appState.appType === "MYFIT" ? "1px solid rgba(119, 170, 249, 1)" : "1px solid rgba(193, 249, 215, 1)";
    const isMyfit = appState.appType === "MYFIT";

  return (
      <div
          className="tabbar"
          style={{
              border: borderTab,
              justifyContent: isMyfit ? "start" : "end",
          }}
      >
          {isMyfit && <div className={`${myfitClassname} max-w-[80px]`}>
              <span>Myfit</span>
          </div>}
          
          {!isMyfit && <div className={`${crmClassname} max-w-[80px]`}>
              <span className="text-[14px] font-normal">CRM</span>
          </div>}
          
      </div>
  )
}
