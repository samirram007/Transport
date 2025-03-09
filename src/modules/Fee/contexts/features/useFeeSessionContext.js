import { use } from "react";
import { FeeSessionContext } from "../FeeSessionContextProvider";


export const useFeeSessionContext = () => {
    return use(FeeSessionContext);
};