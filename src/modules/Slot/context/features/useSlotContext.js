import { use } from "react";
import { SlotContext } from "../SlotContextProvider";



export const useSlotContext = () => {
    return use(SlotContext);
};