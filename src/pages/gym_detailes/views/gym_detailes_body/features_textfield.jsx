import React, { useEffect, useRef } from "react";

export function FeaturesTextField({
  onChanged,
  peculiarities,
  onButtonClicked,
  isActive,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      const length = input.value?.length;
      input.setSelectionRange(length, length);
      input.style.height = "inherit";
      input.style.height = `${input.scrollHeight}px`;
    }
  }, [onChanged]);

  useEffect(() => {
    if (peculiarities === "" || peculiarities === null) {
      // Создаём синтетическое событие с value "1. "
      const event = {
        target: { value: "1. " },
      };
      onChanged(event);
    }
  }, [peculiarities, onChanged]);

  // Обработчик изменений для textarea
  const onChangedHandler = (e) => {
    onChanged(e);
  };

  // Использование обработчика в компоненте textarea
  <textarea
    // ...
    onChange={onChangedHandler}
    // ...
  />;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Предотвратить создание новой строки по умолчанию

      // Разделяем текст на строки и находим последнюю строку с номером.
      const lines = peculiarities.split("\n");
      const lastNumberedLine = lines
        .reverse()
        .find((line) => line.match(/^\d+\./));

      // Находим номер последнего элемента списка, инкрементируем его для следующего элемента.
      let lastNumber = lastNumberedLine
        ? parseInt(lastNumberedLine.match(/^(\d+)\./)[1], 10)
        : 0;
      lastNumber++;

      // Создаем синтетическое событие для передачи его в onChanged
      const syntheticEvent = {
        target: { value: `${peculiarities}\n${lastNumber}. ` },
      };

      onChanged(syntheticEvent);
    }
  };

    const border = isActive ? "1px solid #77aaf9" : "1px solid transparent";
    const buttonborder = isActive ? "1px solid #77aaf9" : "1px solid transparent";
    const buttonBg = isActive ? "#77aaf9" : "transparent";
    const padding = isActive ? "10px 16px 10px 16px" : "";
    const lineHeight = 14;

  return (
    <div className="flex flex-row justify-between gap-[10px] items-start">
      <textarea
        ref={inputRef}
        value={peculiarities}
        onChange={onChangedHandler}
        onKeyDown={handleKeyDown}
        autoFocus={false}
        readOnly={!isActive}
        disabled={!isActive}
        style={{
          //width: "100%",
          padding: padding,
          border: border,
          borderRadius: "8px",
          outline: "none",
          maxHeight: "200px",
          resize: "none",
          fontSize: "13px",
          lineHeight: `${lineHeight}px`,
          width: "300px",
          fontFamily: "Inter, sans-serif",
          backgroundColor: "transparent",
          overflow: isActive ?  'auto' : 'hidden',
          scrollbarWidth: "none",
          transition: "all 0.3s",
          minHeight: "40px",
          maxHeight: `${10 * lineHeight}px`, // Set max height to 10 lines 
        }}
      />
      <div
        style={{
          border: buttonborder,
          backgroundColor: buttonBg,
          cursor: isActive ? "pointer" : "default",
        }}
        className="button40" onClick={onButtonClicked}>
        <DoneSvg />
      </div>
    </div>
  );
}

const DoneSvg = () => {
  return <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.972412 6.91669L4.63908 10.5834L13.8057 1.41669" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  
}
