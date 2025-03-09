import { use } from "react";
import { FeeHeadContext } from "../FeeHeadContextProvider";




export const useFeeHeadContext = () => {
    return use(FeeHeadContext);
};