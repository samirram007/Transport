import { use } from "react";
import { DesignationContext } from "../DesignationContextProvider";



export const useDesignationContext = () => {
    return use(DesignationContext);
};