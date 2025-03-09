import { use } from "react";
import { DepartmentContext } from "../DepartmentContextProvider";



export const useDepartmentContext = () => {
    return use(DepartmentContext);
};