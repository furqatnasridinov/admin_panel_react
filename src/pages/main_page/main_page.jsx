import MainBody from "./views/main_body";
import MainHeader from "./views/main_header";

function MainPage() {
    return (
        <div className="flex flex-col flex-1 pl-[10px] gap-[10px] h-[97vh] ">


                <MainHeader />

                <MainBody />


            </div>
    );
}

export default MainPage;
