import { useRiderSessions } from "@/modules/RiderSession/hooks/queries";
import { createContext, useMemo } from "react";
import { useRiderContext } from "./features/useRiderContext";



export const RiderSessionContext = createContext({
    data: [],
    fetchedData: {},
});

export const RiderSessionContextProvider = ({ children }) => {
    const { selectedRider } = useRiderContext()
    const fetchedData = useRiderSessions(selectedRider?.id);
    const mData = fetchedData.data?.data ?? [];

    const data = useMemo(() => [...mData], [mData]);
    return (<RiderSessionContext value={
        {
            data: riderSessionData, fetchedData
        }
    }>
        {children}
    </RiderSessionContext>
    );
};

export default RiderSessionContextProvider;