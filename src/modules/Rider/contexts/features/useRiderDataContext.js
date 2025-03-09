import { use } from "react";
import { RiderDataContext } from "../RiderDataContextProvider";


export const useRiderDataContext = () => {
    return use(RiderDataContext);
};