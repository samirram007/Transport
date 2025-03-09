import { useQuery } from "@tanstack/react-query";
import { fetchDashboardService } from "../services/apis";
const moduleQueryKey = 'dashboard'
export function useDashboard() {
  
  const queryData = useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchDashboardService,
    refetchOnMount: true,
    enabled: true,
    staleTime: Infinity // keep data fresh for this period (1 min.)
  })

  return queryData;
} 
