import { Suspense, useEffect, useState } from "react";

import { useLocation } from "react-router";
import SidebarContextProvider from "./components/Sidebar/contexts/SidebarContextProvider";
import { useAuth } from "./modules/Auth/contexts/features/useAuth";
import GlobalDataContextProvider from "./modules/GlobalData/contexts/GlobalDataContextProvider";

import { Progress } from "./components/ui/progress";
import FiscalYearContextProvider from "./modules/FiscalYear/context/FiscalYearContextProvider";
import UserFiscalYearContextProvider from "./modules/FiscalYear/context/UserFiscalYearContextProvider";
import UserInitialValueDataContextProvider from "./modules/UserInitialValue/context/UserInitialValueDataContextProvider";
import GuestRouter from "./router/GuestRouter";
import PrivateRouter from "./router/PrivateRouter";

const PlayGround = () => {


  const { isValidToken, AuthCheck, isGuest, loading, setLoading } = useAuth()
  const { pathname } = useLocation();


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    AuthCheck()
  }, [pathname])
  return (
    <>
      {loading ?
        <PageLoader />
        :
        <>

          {isGuest ?
            <Suspense fallback={<PageLoader />}>
              <GuestRouter />
            </Suspense>
            :
            <Suspense fallback={<PageLoader />}>
              <UserInitialValueDataContextProvider>
                <GlobalDataContextProvider>
                  <UserFiscalYearContextProvider>

                    <SidebarContextProvider>
                      <FiscalYearContextProvider>

                        <PrivateRouter />
                      </FiscalYearContextProvider>
                    </SidebarContextProvider>
                  </UserFiscalYearContextProvider>
                </GlobalDataContextProvider>
              </UserInitialValueDataContextProvider>
            </Suspense>
          }
        </>
      }

    </>
  )

}

export default PlayGround

const PageLoader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="h-dvh flex justify-center items-start">
      <Progress value={progress} className="w-dvw bg-blue-600-400  h-1" />

      {/* <span className="animate-ping ">
        <span className="animate-pulse">
          <Loader2 className="animate-spin text-4xl" />
        </span>
      </span> */}
    </div>
  )
}