import { use } from "react";
import { SchoolContext } from "../SchoolContextProvider";



export const useSchoolContext = () => {
    return use(SchoolContext);
};