import { use } from "react";
import { AddressContext } from "../AddressContextProvider";



export const useAddressContext = () => {
    return use(AddressContext);
};