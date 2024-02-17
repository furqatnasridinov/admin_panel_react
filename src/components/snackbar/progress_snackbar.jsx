import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./progress_snackbar.css";
import { Circle } from "rc-progress";
import doneSvg from "../../assets/svg/done_circle.svg";

const ProgressSnackbar = forwardRef(({ isLoading }, ref) => {
  const [message, setMessage] = useState("");
  const [percent, setPercent] = useState(0);
  const [shown, setShown] = useState(false);

  useImperativeHandle(ref, () => ({
    show(newMessage) {
      setMessage(newMessage);
    },
  }));

  useEffect(() => {
    if (isLoading) {
      setShown(true);
      // setPercent 20% every 1 second then if percent === 80 continue with 3% every 1 second
      let interval = setInterval(() => {
        setPercent((prevPercent) => {
          if (prevPercent < 80) return prevPercent + 20;
          clearInterval(interval);
          interval = setInterval(() => {
            setPercent((prevPercent) => {
              if (prevPercent >= 98) {
                clearInterval(interval);
                return 98;
              }
              return prevPercent + 3;
            });
          }, 1000);
          return 80;
        });
      }, 1000);
    }
    if (!isLoading) {
      setTimeout(() => {
        setShown(false);
        // visually show done
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setPercent(0);
    }
  }, [isLoading]);

  if (!shown) return null;

  return (
    <div className="snackbar-container">
      <div className="snackbarProgress">
        <div className="text-[14px] font-medium">
          {/* {isLoading ? message : "Фото загружено"} */}
          {message}
        </div>
        <div className="flex flex-row gap-[18px] items-center h-full w-fit">
          <div className="relative w-[40px] h-[40px]">
            {isLoading && (
              <>
                <Circle
                  percent={percent}
                  strokeWidth="7"
                  trailWidth="7"
                  strokeColor="#77AAF9"
                  trailColor="#D4E5FF"
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="text-[14px] font-medium text-button-color">
                    {percent}%
                  </span>
                </div>
              </>
            )}
            {!isLoading && <img src={doneSvg} alt="done" />}
            {!isLoading && percent !== 0 && setPercent(0)}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProgressSnackbar;
