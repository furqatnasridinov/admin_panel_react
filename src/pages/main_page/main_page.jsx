import Sidebar from "../../components/sidebar/sidebar.jsx"
import MainBody from "./views/main_body";
import MainHeader from "./views/main_header";

function MainPage() {
    return (
        <div className="flex flex-row bg-bg-color p-[10px]">

            <Sidebar />

            <div className="flex flex-col flex-1 pl-[10px] gap-[10px]">


                <MainHeader />

                <MainBody />


            </div>

        </div>
    );
}

export default MainPage;
