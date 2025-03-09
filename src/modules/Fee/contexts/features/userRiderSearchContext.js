import { use } from "react";
import { RiderSearchContext } from "../RiderSearchContextProvider";



export const useRiderSearchContext = () => {
    return use(RiderSearchContext);
};