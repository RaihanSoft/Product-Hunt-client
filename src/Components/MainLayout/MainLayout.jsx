import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import { useDarkMode } from "../Common/DarkMood/DarkMood";
import Footer from "../Common/Footer/Footer"

const MainLayout = () => {
    const { darkMode } = useDarkMode();
    return (
        <div className={` ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <Navbar />

            {/* <div className="h-[calc(100vh-300px)]"> */}
                <Outlet />
            {/* </div> */}



            <Footer />  

        </div>
    )
}

export default MainLayout
