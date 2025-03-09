import { use } from "react";
import { UserAcademicClassContext } from "../UserAcademicClassContextProvider";



export const useUserAcademicClassContext = () => {
    return use(UserAcademicClassContext);
};