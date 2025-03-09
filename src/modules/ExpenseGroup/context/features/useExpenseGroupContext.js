import { use } from "react";
import { ExpenseGroupContext } from "../ExpenseGroupContextProvider";
 



export const useExpenseGroupContext = () => {
    return use(ExpenseGroupContext);
};