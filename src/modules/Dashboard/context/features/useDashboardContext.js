import { use } from "react";
import { DashboardContext } from "../DashboardContextProvider";



export const useDashboardContext = () => {
    return use(DashboardContext);
};