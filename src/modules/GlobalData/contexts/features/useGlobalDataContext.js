import { use } from "react";
import { GlobalDataContext } from "../GlobalDataContextProvider";



export const useGlobalDataContext = () => {
    return use(GlobalDataContext);
};