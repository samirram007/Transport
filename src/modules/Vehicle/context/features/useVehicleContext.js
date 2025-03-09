import { use } from "react";
import { VehicleContext } from "../VehicleContextProvider";



export const useVehicleContext = () => {
    return use(VehicleContext);
};