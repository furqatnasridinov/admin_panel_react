import "./index.css";
import Sidebar from "./components/sidebar/sidebar";
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import MyGymsPage from "./pages/my_gyms_page/my_gyms_page";
import StatisticksPage from "./pages/statisticks_page/index";
import SchedulesPage from "./pages/schedules_page";
import Help from "./pages/help";
import SettingsPage from "./pages/settings_page";
import GymDetails from "./pages/gym_detailes/gym_detailes";
import MyGymsPageLayout from "./pages/my_gyms_page/my_gyms_page_layout";
import BookingPage from "./pages/booking_page/injex";
import ClientsPage from "./pages/clients";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import NewClientsWebSocket from "./features/web_sockets";
import { useDispatch, useSelector } from "react-redux";
import CreateGymPage from "./pages/create_gym_page";
import Register1 from "./pages/register/register1";
import Splash from "./pages/splash";
import WelcomePage from "./pages/register/welcome";
import PushNotification from "./firebase/push_notification";


function Content() {
  const location = useLocation();

  return (
    <div className= {location.pathname !== '/registerPage' ?"flex flex-1 flex-row bg-bg-color p-[10px] h-full" : "" } >
      {(location.pathname !== '/registerPage' && location.pathname !== '/welcomePage') && <Sidebar />}

      <div className="flex-1 h-full">
      <Routes>
            <Route path="/" element = {<Splash />}></Route>
            <Route path="/registerPage" element = {<Register1 />}></Route>
            <Route path="/welcomePage" element = {<WelcomePage />}></Route>
            <Route path="/bookingPage" element={<BookingPage />}></Route>
            
            <Route path="/waitingClientsPage" element={<ClientsPage />}></Route>
            <Route path="/statisticksPage" element={<StatisticksPage />}></Route>
            <Route path="/myGymsPage" element={<MyGymsPageLayout />}>
              {/* we declare nested navigation because MyGymsPage has two screens */}
              <Route index element={<MyGymsPage />} />
              <Route path="createGym" element={<CreateGymPage />} />
              <Route path="gymDetails/:gymId" element={<GymDetails />} />
            </Route>
            <Route path="/schedulePage" element={<SchedulesPage />}>
              {" "}
            </Route>
            <Route path="/help" element={<Help />}>
              {" "}
            </Route>
            <Route path="/settingsPage" element={<SettingsPage />}>
              {" "}
            </Route>
          </Routes>
        <ToastContainer autoClose={2500} hideProgressBar />
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const clientsState = useSelector((state) => state.clients);
  const currentGymState = useSelector((state) => state.currentGym);

  useEffect(() => {
    if (currentGymState.currentGym !== null) {
      // подключение к веб-сокету    
    const params = {
      dispatch : dispatch,
      waitingForAccept : clientsState.waitingForAccept,
      gymId : currentGymState.currentGym?.id,
    }
    const ws = NewClientsWebSocket(params);    
    return () => {
      ws.close();
    };
    }
  }, [currentGymState.currentGym?.id]); 

  return (
    <BrowserRouter>
      <PushNotification />
      <Content />
    </BrowserRouter>
  );
}

export default App;
