import { use } from "react";
import { FiscalYearContext } from "../FiscalYearContextProvider";



export const useFiscalYearContext = () => {
    return use(FiscalYearContext);
};