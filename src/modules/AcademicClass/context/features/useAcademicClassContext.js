import { use } from "react";
import { AcademicClassContext } from "../AcademicClassContextProvider";



export const useAcademicClassContext = () => {
    return use(AcademicClassContext);
};