

import { useUserprofile } from "@/modules/User/hooks/useUserProfile";
import AdminRouter from "./AdminRouter";
import ManagerRouter from "./ManagerRouter";


const PrivateRouter = () => {
    const userProfile = useUserprofile()

    if (userProfile.isError) {
        console.log("Error From Profile.jsx", userProfile.error);
    }



    const roleComponents = {
        admin: <AdminRouter />,
        manager: <ManagerRouter />,
    };

    return roleComponents[userProfile.data?.data?.role];
    // return roleComponents[userProfile.data?.data?.role] || <GuestRouter />;


}

export default PrivateRouter