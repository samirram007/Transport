import { use } from "react";
import { RiderContext } from "../RiderContextProvider";



export const useRiderContext = () => {
    return use(RiderContext);
};