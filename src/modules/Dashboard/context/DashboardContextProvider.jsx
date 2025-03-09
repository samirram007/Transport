import { createContext, useMemo } from "react";
import { useDashboard } from "../hooks/queries";



export const DashboardContext = createContext({
});

export const DashboardContextProvider = ({ children }) => {
    const fetchedData = useDashboard()
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => ({...mData}), [mData]);


    return (<DashboardContext value={
        { fetchedData, data }
    }>
        {children}
    </DashboardContext>
    );
};

export default DashboardContextProvider;