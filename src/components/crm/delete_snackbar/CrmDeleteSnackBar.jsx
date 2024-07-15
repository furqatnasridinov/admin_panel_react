import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from "react";
  import "./index.css"
  import { Circle } from "rc-progress";
  
  const CrmDeleteSnackbar = forwardRef((props, ref) => {
    const [snackbars, setSnackbars] = useState([]);
    const [isHideForced, setIsHideForced] = useState(false);
    const timeouts = {};
  
    useImperativeHandle(ref, () => ({
      show(message, onTimeEnded) {
        const id = props.objectId ? props.objectId : Date.now();
        const newSnackbar = { id, message, countdown: 5 };
        setSnackbars((prevSnackbars) => [...prevSnackbars, newSnackbar]);
  
        const handleUnload = async (event) => {
          await onTimeEnded();
          event.preventDefault();
        };
  
        window.addEventListener("beforeunload", handleUnload);
  
        // Store the timeout ID
        timeouts[id] = setTimeout(() => {
          setSnackbars((prevSnackbars) =>
            prevSnackbars.filter((snackbar) => snackbar.id !== id)
          );
          if (onTimeEnded) onTimeEnded();
          window.removeEventListener("beforeunload", handleUnload);
        }, 5000);
  
        // Return a cleanup function that removes the event listener and cancels the timeout
        return () => {
          window.removeEventListener("beforeunload", handleUnload);
          clearTimeout(timeouts[id]);
        };
      },
  
      cancel(id) {
        // Remove the snackbar with the given id
        setSnackbars((prevSnackbars) =>
          prevSnackbars.filter((snackbar) => snackbar.id !== id)
        );
        // Stop the timeout to prevent onTimeEnded to get called
        clearTimeout(timeouts[id]);
      },
  
      hideSnackbars() {
        setIsHideForced(true);
      },
  
      showSnackbars() {
        setIsHideForced(false);
      },
    }));
  
    useEffect(() => {
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
    }, []); // Decrease countdown for each snackbar every second
  
    if (isHideForced) return null;
  
    return (
      <div className="snackbar-container">
        {snackbars.map((snackbar, index) => (
          <div
            key={snackbar.id}
            className="snackbar"
            style={{ bottom: `${69 * (index + 1)}px` }}
          >
            <DeleteSvg />

            <span style={{
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }} className="text-[14px] font-medium">{snackbar.message}</span>

            <div className="flex flex-row gap-[18px] items-center h-full w-fit">
              <div
                className="text-[14px] leading-4 max-h-[32px] font-medium text-crm-link cursor-pointer"
                onClick={() => {
                  // Вызываем функцию undoAction, переданную из родительского компонента
                  if (props.undoAction) props.undoAction();
                  // Удаляем снэкбар
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
                  strokeColor="white"
                  trailColor="rgba(193, 249, 215, 1)"
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <span className="text-[14px] font-medium text-crm-link">
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
  
  export default CrmDeleteSnackbar;
  

  function DeleteSvg(){
      return (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6C0 2.68629 2.68629 0 6 0H22C25.3137 0 28 2.68629 28 6V22C28 25.3137 25.3137 28 22 28H6C2.68629 28 0 25.3137 0 22V6Z" fill="#EFFFF5" />
              <path d="M8 10.25H20M12.5 13.25V17.75M15.5 13.25V17.75M8.75 10.25L9.5 19.25C9.5 19.6478 9.65804 20.0294 9.93934 20.3107C10.2206 20.592 10.6022 20.75 11 20.75H17C17.3978 20.75 17.7794 20.592 18.0607 20.3107C18.342 20.0294 18.5 19.6478 18.5 19.25L19.25 10.25M11.75 10.25V8C11.75 7.80109 11.829 7.61032 11.9697 7.46967C12.1103 7.32902 12.3011 7.25 12.5 7.25H15.5C15.6989 7.25 15.8897 7.32902 16.0303 7.46967C16.171 7.61032 16.25 7.80109 16.25 8V10.25" stroke="#3AB96D" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

      )
  }