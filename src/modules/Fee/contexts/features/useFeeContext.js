import { use } from "react";
import { FeeContext } from "../FeeContextProvider";



export const useFeeContext = () => {
    return use(FeeContext);
};