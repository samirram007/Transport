import { use } from "react";
import { SchoolTypeContext } from "../SchoolTypeContextProvider";
 



export const useSchoolTypeContext = () => {
    return use(SchoolTypeContext);
};