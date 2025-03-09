import { Outlet } from "react-router"
import { Footer } from "../modules/Landing"

const GuestLayout = () => {
    return (
        <>
            {/* <Navbar /> */}
            <Outlet />
            <Footer />
        </>

    )
}

export default GuestLayout