import AppConstants from "../../config/app_constants";
import MyGymsBody from "./views/my_gyms_body";
import MyGymsHeader from "./views/my_gyms_header";

export default function MyGymsPage() {
  return (
    console.log(localStorage.getItem(AppConstants.keyToken)),
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh]">
      <MyGymsHeader />
      <MyGymsBody />
    </div>
  );
}
