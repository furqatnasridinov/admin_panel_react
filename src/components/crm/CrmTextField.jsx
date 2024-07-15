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
        <label  className="input-container" style={{ width: width }}>
        <span className={`input-label ${hasFocus || value ? 'focused' : ''}`}>
            {label}
        </span>
        {!showInputMask && 
            <input
            style={{
                border: border,
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            className='input'
            type="text" />
        }
        {showInputMask && 
            <ReactInputMask
            style={{
                border: border,
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            onChange={onChange}
            className='input'
            maskChar={null}
            mask={mask} />
        }
    </label>
    );
}