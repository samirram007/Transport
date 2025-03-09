import { createContext, useState } from "react";



export const GlobalDataContext = createContext({});

export const GlobalDataContextProvider = ({ children }) => {
    // const userInitialValueData=useUserInitialValueDataContext()
    const [schoolsData, setSchoolsData] = useState(null);

    return (<GlobalDataContext value={
        {
            schoolsData, setSchoolsData,

        }
    }>
        {children}
    </GlobalDataContext>
    );
};

export default GlobalDataContextProvider;