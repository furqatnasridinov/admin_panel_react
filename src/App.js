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
import CrmClients from "./pages/crm/clients";
import TodayEventsCrm from "./pages/crm/today_events";
import StatisticksPageCrm from "./pages/crm/statisticks";
import MyGymsPageCrm from "./pages/crm/my_gyms";
import SchedulesPageCrm from "./pages/crm/schedule_page";
import SettingsPageCrm from "./pages/crm/settings";
import AddClientCrm from "./pages/crm/add_client";
import ClientPageLayoutCrm from "./pages/crm/clients_layout";

function Content() {
  const location = useLocation();

  return (
    <div className= {location.pathname !== '/registerPage' ?"flex flex-1 flex-row bg-bg-color p-[10px] h-full" : "" } >
      {(location.pathname !== '/registerPage' && location.pathname !== '/welcomePage') && <Sidebar />}

      <div className="flex-1 h-full">
        <Routes>
            <Route path="/" element = {<Splash />} />
            <Route path="/registerPage" element = {<Register1 />} />
            <Route path="/welcomePage" element = {<WelcomePage />} />
            
            {/* MYFIT */}
            <Route path="/clientsPageMyfit" element={<BookingPage />} />
            <Route path="/todayEventsPageMyfit" element={<ClientsPage />} />
            <Route path="/statisticksPageMyfit" element={<StatisticksPage />} />
            <Route path="/myGymsPageMyfit" element={<MyGymsPageLayout />}>
              {/* we declare nested navigation because MyGymsPage has two screens */}
              <Route index element={<MyGymsPage />} />
              <Route path="createGym" element={<CreateGymPage />} />
              <Route path="gymDetails/:gymIdParam" element={<GymDetails />} />
            </Route>
            <Route path="/schedulePageMyfit" element={<SchedulesPage />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settingsPageMyfit" element={<SettingsPage />} />

            {/* CRM */}
            <Route path="/clientsPageCrm" element={<ClientPageLayoutCrm />} >
              <Route index element={<CrmClients />} />
              <Route path="clientCard/:clientIdParam" element={<AddClientCrm />} />
            </Route>
            <Route path="/todayEventsPageCrm" element={<TodayEventsCrm />} />
            <Route path="/statisticksPageCrm" element={<StatisticksPageCrm />} />
            <Route path="/myGymsPageCrm" element={<MyGymsPageCrm />} />
            <Route path="/schedulePageCrm" element={<SchedulesPageCrm />} />
            <Route path="/settingsPageCrm" element={<SettingsPageCrm />} />
            
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
