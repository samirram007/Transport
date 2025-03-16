import { use } from "react";
import { OrganizationContext } from "../OrganizationContextProvider";



export const useOrganizationContext = () => {
    return use(OrganizationContext);
};