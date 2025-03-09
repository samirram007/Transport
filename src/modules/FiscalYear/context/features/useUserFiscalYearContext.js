import { use } from "react";
import { UserFiscalYearContext } from "../UserFiscalYearContextProvider";



export const useUserFiscalYearContext = () => {
    return use(UserFiscalYearContext);
};