import { use } from "react";
import { SidebarContext } from "../SidebarContextProvider";

export const useSidebar = () => use(SidebarContext);