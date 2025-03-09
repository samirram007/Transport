import { use } from "react";
import { AuthContext } from "../AuthContextProvider";

export const useAuth = () => use(AuthContext);