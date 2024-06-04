import AppConstants from "../../config/app_constants";
import MyGymsBody from "./views/my_gyms_body";
import MyGymsHeader from "./views/my_gyms_header";
import MessageLikeTopContainer from "../booking_page/message_like_top_container";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getListOfGyms } from "../../features/current_gym_slice";
import { RequestForToken } from "../../firebase/firebase";

export default function MyGymsPage() {
  const clientsSlice = useSelector((state) => state.clients);
  const dispatch = useDispatch();

/*   useEffect(()=>{
    // request for fcm
    dispatch(getListOfGyms());
      //RequestForToken();
  },[]) */

  return (
    console.log(`jwt token ${localStorage.getItem(AppConstants.keyToken)}`),
    console.log(`fcm token ${localStorage.getItem(AppConstants.keyFcmToken)}`),
    console.log(`role id ${localStorage.getItem(AppConstants.keyRoleId)}`),
    <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] overflow-y-auto">
      {clientsSlice.waitingForAccept?.length > 0 && (
        <MessageLikeTopContainer hideOpenSchedule={true} />
      )}
      <MyGymsHeader />
      <MyGymsBody />
    </div>
  );
}
