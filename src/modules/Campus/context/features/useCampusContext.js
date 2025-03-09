import { use } from "react";
import { CampusContext } from "../CampusContextProvider";



export const useCampusContext = () => {
    return use(CampusContext);
};