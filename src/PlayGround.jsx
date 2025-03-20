import { Suspense, useEffect, useState } from "react";

import { useLocation } from "react-router";

import { useAuth } from "./modules/Auth/contexts/features/useAuth";


import { Progress } from "./components/ui/progress";

import { AppContextProviders } from "./contexts/AppContextProvider";
import GuestRouter from "./router/GuestRouter";
import PrivateRouter from "./router/PrivateRouter";

const PlayGround = () => {
  const { AuthCheck, isGuest, loading } = useAuth();
  const { pathname } = useLocation();

  // Run authentication check when pathname changes
  useEffect(() => {
    AuthCheck();
  }, [pathname]);

  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      {isGuest ? <GuestRouter /> : <AppContextProviders><PrivateRouter /></AppContextProviders>}
    </Suspense>
  );
};

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