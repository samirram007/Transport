import { useQuery } from "@tanstack/react-query"
import { fetchGenerateRollNo, fetchStudentSessionsByStudentId, fetchStudentSessionsFeesByStudentSessionId } from "../services/apis"


 export function useStudentSessions(payload) {
    return useQuery({
      queryKey: ['studentSessions',payload],
      queryFn: ()=>fetchStudentSessionsByStudentId(payload),
      staleTime:Infinity
    })
  }
  
 export function useStudentSessionFees(payload) {

    return useQuery({
      queryKey: ['studentSessionFees',payload],
      queryFn: ()=>fetchStudentSessionsFeesByStudentSessionId(payload),
      staleTime:1000*60*4,
      refetchOnWindowFocus: false,
      enabled:!!payload
    })
  }

  export async function useGenerateRollNo(payload) {

    const data=await fetchGenerateRollNo(payload)
    //console.log(data);
    if(!data){throw new Error('Error in generating roll no')}
    return data
  }

