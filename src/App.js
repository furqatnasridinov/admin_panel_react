import "./index.css";
import Sidebar from "./components/sidebar/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyGymsPage from "./pages/my_gyms_page/my_gyms_page";
import StatisticksPage from "./pages/statisticks_page/statisticks_page";
import SchedulesPage from "./pages/schedules_page/schedules_page";
import Help from "./pages/help/help";
import SettingsPage from "./pages/settings_page/settings_page";
import GymDetails from "./pages/gym_detailes/gym_detailes";
import MyGymsPageLayout from "./pages/my_gyms_page/my_gyms_page_layout";
import AppConstants from "./config/app_constants";

function App() {
  return (
   // console.log(localStorage.getItem(AppConstants.keyToken)),
    /* localStorage.setItem(
      AppConstants.keyToken,
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrNzk5OTIxNzI0OTQiLCJleHAiOjE3MDc4NDUwNDZ9.1U7hhJ3L4xFTFl6vtG1xQw1CjW2WTzb6yzaI4AU2eg-y60x_pIcnoolhStiBVyfNKp1BImWV4EHuea99WqO5oA"
    ), */
    (
      <BrowserRouter>
        <div className="flex flex-1 flex-row bg-bg-color p-[10px] h-full">
          <Sidebar />

          <div className="flex-1 h-full">
            <Routes>
              <Route path="/" element={<StatisticksPage />}>
                {" "}
              </Route>
              <Route path="/myGymsPage" element={<MyGymsPageLayout />}>
                {/* we declare nested navigation because MyGymsPage has two screens */}
                <Route index element={<MyGymsPage />} />
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
          </div>
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
