import { use } from "react";
import { VehicleTypeContext } from "../VehicleTypeContextProvider";




export const useVehicleTypeContext = () => {
    return use(VehicleTypeContext);
};