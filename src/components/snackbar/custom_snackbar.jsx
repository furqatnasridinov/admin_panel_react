import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./custom_snackbar.css";
import { Circle } from "rc-progress";

const CustomSnackbar = forwardRef((props, ref) => {
  const [snackbars, setSnackbars] = useState([]);

  useImperativeHandle(ref, () => ({
    show(message) {
      const newSnackbar = { id: Date.now(), message, countdown: 9 };

      setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);

      setTimeout(() => {
        setSnackbars((prevSnackbars) =>
          prevSnackbars.filter((snackbar) => snackbar.id !== newSnackbar.id)
        );
      }, 9000);
    },
    cancel: (id) => {
      // Remove the snackbar with the given id
      setSnackbars((prevSnackbars) =>
        prevSnackbars.filter((snackbar) => snackbar.id !== id)
      );
    },
  }));

  useEffect(() => {
    // Decrease countdown for each snackbar every second
    const intervalId = setInterval(() => {
      setSnackbars((prevSnackbars) =>
        prevSnackbars.map((snackbar) => ({
          ...snackbar,
          countdown: snackbar.countdown - 1,
        }))
      );
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="snackbar-container">
      {snackbars.map((snackbar) => (
        <div key={snackbar.id} className="snackbar">
          <div className="text-[14px] font-medium">{snackbar.message}</div>
          <div className="flex flex-row gap-[18px] items-center h-full w-fit">
            <div
              className="text-[14px] font-medium text-blue-text cursor-pointer"
              onClick={() => {
                // Add your undo functionality here
                // Call cancel function on ref to remove the snackbar
                ref.current && ref.current.cancel(snackbar.id);
              }}
            >
              Отменить
            </div>
            <div className="relative w-[30px] h-[30px]">
              <Circle
                percent={(snackbar.countdown / 9) * 100}
                strokeWidth="7"
                trailWidth="7"
                strokeColor="#77AAF9"
                trailColor="#D4E5FF"
              />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <span className="text-[14px] font-medium text-button-color">
                  {snackbar.countdown}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default CustomSnackbar;
