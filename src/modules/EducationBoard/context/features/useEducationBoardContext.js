import { use } from "react";
import { EducationBoardContext } from "../EducationBoardContextProvider";
 



export const useEducationBoardContext = () => {
    return use(EducationBoardContext);
};