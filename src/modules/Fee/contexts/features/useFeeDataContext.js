import { use } from "react";
import { FeeDataContext } from "../FeeDataContextProvider";


export const useFeeDataContext = () => {
    return use(FeeDataContext);
};