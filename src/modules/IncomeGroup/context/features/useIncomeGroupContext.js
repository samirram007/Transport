import { use } from "react";
import { IncomeGroupContext } from "../IncomeGroupContextProvider";
 



export const useIncomeGroupContext = () => {
    return use(IncomeGroupContext);
};