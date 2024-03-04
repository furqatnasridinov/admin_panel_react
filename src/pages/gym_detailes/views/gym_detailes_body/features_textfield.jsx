import React, { useEffect, useRef } from "react";
import doneSvg from "../../../../assets/svg/done.svg";

export function FeaturesTextField({
  onChanged,
  peculiarities,
  onButtonClicked,
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

  return (
    <div className="flex flex-row justify-between gap-[10px] items-start">
      <textarea
        ref={inputRef}
        value={peculiarities}
        onChange={onChangedHandler}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "10px 16px 10px 8px",
          border: "1px solid #77AAF9",
          borderRadius: "8px",
          outline: "none",
          maxHeight: "200px",
          resize: "none",
          fontSize: "13px",
          lineHeight: "14px",
          fontFamily: "Inter, sans-serif",
        }}
      />
      <button onClick={onButtonClicked}>
        <img src={doneSvg} alt="" />
      </button>
    </div>
  );
}
