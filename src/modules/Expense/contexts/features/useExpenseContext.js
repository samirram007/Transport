import { use } from "react";
import { ExpenseContext } from "../ExpenseContextProvider";



export const useExpenseContext = () => {
    return use(ExpenseContext);
};