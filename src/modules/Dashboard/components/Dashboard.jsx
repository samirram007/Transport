import FiscalYearContextProvider from "@/modules/FiscalYear/context/FiscalYearContextProvider"
import DashboardContextProvider from "../context/DashboardContextProvider"
import AdminDashboard from "./AdminDashboard"



const Dashboard = () => {

    return (

        <DashboardContextProvider>
            <AdminDashboard />
        </DashboardContextProvider>
    )
}

export default Dashboard