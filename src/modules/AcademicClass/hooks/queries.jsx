import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchAcademicClassByCampusIdService, fetchAcademicClassService, fetchAcademicClassServices } from "../services/apis";

const moduleQueryKey = 'academicClasses'
export function useAcademicClasses(payload) {
 
  if (payload) {
    const filterCallbackFn = useCallback((data) => {
      return { data: data.data.filter(x => x.campusId === parseInt(payload.campusId)) }
    }, [payload.campusId]);

    return useQuery({
      queryKey: [moduleQueryKey, { payload }],
      queryFn: () => fetchAcademicClassServices,
      staleTime: Infinity,
      enabled: true,
      select: filterCallbackFn,
    })
  }
  return useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchAcademicClassServices,
    staleTime: Infinity,
    enabled: true,
  })

}
export function useCampusAcademicClasses() {

  const filterCallbackFn = useCallback((data) => {
    // console.log('Data before filtering:', data);

    return { data: data.data }
  }, []);

  return useQuery({
    queryKey: [moduleQueryKey],
    queryFn: fetchAcademicClassServices,
    staleTime: Infinity,
    select: filterCallbackFn,
    onSuccess: (data) => {
      console.log('Query success:', data);
    },
    onError: (error) => {
      console.log('Query error:', error);
    }
  })
  // console.log('fetchedData', fetchedData.data);

  // return fetchedData
}
export function useAcademicClass(id) {
  return useQuery({
    queryKey: [moduleQueryKey, id],
    queryFn: () => fetchAcademicClassService(id),
  })
}

export function useAcademicClassesByCampusId(campusId) {
  return useQuery({
    queryKey: [moduleQueryKey, 'campus', campusId],
    queryFn: () => fetchAcademicClassByCampusIdService(campusId),
  })
}