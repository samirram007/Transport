import { use } from "react";
import { ExpenseHeadContext } from "../ExpenseHeadContextProvider";




export const useExpenseHeadContext = () => {
    return use(ExpenseHeadContext);
};