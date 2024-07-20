import React, { useEffect, useRef } from "react";
import "./index.css";


export function EditableTextfield({
    value,
    onChange,
    fontsize,
    lineheight,
    onButtonClicked,
    hideButton,
    height,
    placeholder,
    showTextfield,
    isNotValidated,
    maxLength,
    textFieldsMinWidth,
    isActive,
    minHeight,
    isBackgroundBlue,
  }) {
    const inputRef = useRef(null);
    // for autofocus calls when component first renders
    useEffect(() => {
      const input = inputRef.current;
      if (input || isActive) {
        setTimeout(() => {
          input.focus();
          // Set the cursor to the end of the text
          const length = input.value.length;
          input.setSelectionRange(length, length);
          const isMoreThanOneLine = input.scrollHeight > input.clientHeight;
          console.log("isMoreThanOneLine");
          input.style.height = "inherit"; // Reset height to recalculate
          input.style.height = `${input.scrollHeight}px`;
        }, 150);
      }
    }, [value, isActive]);
  
      const border = isNotValidated ? "1px solid rgba(255, 136, 136, 1)" : isActive ?  "1px solid #77aaf9" : "1px solid transparent";
      const buttonborder = isActive ? "1px solid #77aaf9" : "1px solid transparent";
      const buttonBg = isActive ? "#77aaf9" : "transparent";
      const textColor = isActive ? "rgba(176, 176, 176, 1)" : "white";
      const padding = isActive ? "12px 16px 12px 16px" : "";
      
    return (
      <div className="flex flex-row gap-[10px] items-start">
        {!showTextfield &&
          <div className="flex flex-col">
            <textarea
              className="text-[13px] font-normal font-inter"
              ref={inputRef}
              value={value}
              disabled={!isActive}
              placeholder={placeholder}
              onChange={onChange}
              readOnly={!isActive}
              style={{
                border: border,
                fontSize: fontsize,
                lineHeight: lineheight,
                transition : "all 0.3s",
                width: "100%",
                padding: padding,
                borderRadius: "8px",
                outline: "none",
                resize: "none",
                backgroundColor: "none",
                height: "auto",
                minHeight: minHeight,
                maxHeight: `${10 * lineheight}px`, // Set max height to 10 lines 
                minWidth: textFieldsMinWidth,
                overflow: /* isActive ?  'auto' : */ 'hidden',
                scrollbarWidth: "none",
              }}
            />
            {isActive &&
              <span
                style={{
                  color: textColor,
                  transition: "all 0.3s",
                }}
                className="text-[12px] font-normal ">{`${value?.length ?? 0}/${maxLength ?? 100}`}
              </span>}
              
            
          </div>
        }
  
        {showTextfield && (
          <input
            type="text"
            className="text-[13px] font-normal font-inter"
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            style={{
              border: isNotValidated ? "1px solid rgba(255, 136, 136, 1)" : "1px solid #77aaf9",
              fontSize: fontsize,
              lineHeight: lineheight,
              height: height,
            }}
          />
        )}
  
        {!hideButton && (
          <div 
            style={{
              border : buttonborder,
              backgroundColor : buttonBg,
              cursor : isActive ? "pointer" : "default",
            }}
            className="button40" onClick={onButtonClicked}>
            <DoneSvg />
          </div>
        )}
      </div>
    );
  }


  const DoneSvg = () => {
    return <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.972412 6.91669L4.63908 10.5834L13.8057 1.41669" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    
  }