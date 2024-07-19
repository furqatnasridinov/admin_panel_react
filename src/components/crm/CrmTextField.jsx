import React, { useState } from 'react';
import './CrmTextField.css';
import ReactInputMask from 'react-input-mask';

export default function CrmTextField({
    label = "Введите текст", // Добавлен параметр label
    width = "200px",
    value = "",
    onChange,
    onFocus: propOnFocus,
    onBlur: propOnBlur,
    hasFocus: propHasFocus = false,
    isError = false,
    showInputMask = false,
    mask = "+7 (999) 999-99-99",
    showLabel = true,
    height = '40px',
    placeHolder,
}) {
    const [hasFocus, setHasFocus] = useState(propHasFocus);

    const onFocus = (e) => {
        setHasFocus(true);
        if (propOnFocus) propOnFocus(e);
    };

    const onBlur = (e) => {
        setHasFocus(false);
        if (propOnBlur) propOnBlur(e);
    };

    const border = isError ? '1px solid rgba(255, 61, 0, 1)' : hasFocus ? '1px solid rgba(58, 185, 109, 1)' : '1px solid rgba(226, 226, 226, 1)';

    return (
        showLabel ? (
            <label className="input-container" style={{ width: width }}>
                <span className={`input-label ${hasFocus || value ? 'focused' : ''}`}>
                    {label}
                </span>
                {!showInputMask ? (
                    <input
                        style={{ border: border, height :  height}}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        className='input'
                        type="text" />
                ) : (
                    <ReactInputMask
                        style={{ border: border }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={value}
                        onChange={onChange}
                        className='input'
                        maskChar={null}
                        mask={mask} />
                )}
            </label>
        ) : (!showInputMask ? (
            <textarea
                style={{ 
                    border: border ,
                    height : height, 
                    width: width,
                    display: "flex",
                    alignItems: "start",
                    scrollbarWidth: "none",
                    overflow: "hidden",
                    resize: "none",
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                className='input'
                placeholder={placeHolder}
                type="text" />
        ) : (
            <ReactInputMask
                style={{ border: border,height :  height }}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                className='input'
                maskChar={null}
                mask={mask} />
        ))
    );
}