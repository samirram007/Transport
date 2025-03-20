import SidebarContextProvider from "@/components/Sidebar/contexts/SidebarContextProvider";
import FiscalYearContextProvider from "@/modules/FiscalYear/context/FiscalYearContextProvider";
import UserFiscalYearContextProvider from "@/modules/FiscalYear/context/UserFiscalYearContextProvider";
import GlobalDataContextProvider from "@/modules/GlobalData/contexts/GlobalDataContextProvider";
import UserInitialValueDataContextProvider from "@/modules/UserInitialValue/context/UserInitialValueDataContextProvider";


export const AppContextProviders = ({ children }) => (
    <UserInitialValueDataContextProvider>
        <GlobalDataContextProvider>
            <UserFiscalYearContextProvider>
                <SidebarContextProvider>
                    <FiscalYearContextProvider>{children}</FiscalYearContextProvider>
                </SidebarContextProvider>
            </UserFiscalYearContextProvider>
        </GlobalDataContextProvider>
    </UserInitialValueDataContextProvider>
);