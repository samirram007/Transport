import { use } from "react";
import { RiderSessionContext } from "../RiderSessionContextProvider";


export const useRiderSessionContext = () => {
    return use(RiderSessionContext);
};