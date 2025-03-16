import { use } from "react";
import { ExpenseDataContext } from "../ExpenseDataContextProvider";


export const useExpenseDataContext = () => {
    return use(ExpenseDataContext);
};