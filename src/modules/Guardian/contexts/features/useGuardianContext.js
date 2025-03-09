import { use } from "react";
import { GuardianContext } from "../GuardianContextProvider";
 



export const useGuardianContext = () => {
    return use(GuardianContext);
};