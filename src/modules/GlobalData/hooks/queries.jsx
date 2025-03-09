import { getData } from "@/lib/dataClient";
import { useQuery } from "@tanstack/react-query";
import { fetchMonthService } from "../services/apis";

export function useMonths() {

    return useQuery({
        queryKey: ['months'],
        queryFn: fetchMonthService,
        staleTime: Infinity,
    })
} 


export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: ()=>getData('users'),
  })
}
export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: ()=>getData('user'),
  })
}

export function useGender() {
    return useQuery({
      queryKey: ['gender'],
      queryFn: ()=>getData('gender'),
      staleTime:Infinity
    })
}
export function useSchoolType() {
    return useQuery({
      queryKey: ['school_type'],
      queryFn: ()=>getData('school_type'),
      staleTime:Infinity
    })
}
export function useNationality() {
    return useQuery({
      queryKey: ['nationality'],
      queryFn: ()=>getData('nationality'),
      staleTime:Infinity
    })
}
export function useLanguage() {
    return useQuery({
      queryKey: ['language'],
      queryFn: ()=>getData('language'),
      staleTime:Infinity
    })
}
export function useGuardianType() {
    return useQuery({
      queryKey: ['guardian_type'],
      queryFn: ()=>getData('guardian_type'),
      staleTime:Infinity
    })
}
export function useSubjectType() {
    return useQuery({
      queryKey: ['subject_type'],
      queryFn: ()=>getData('subject_type'),
      staleTime:Infinity
    })
}
export function useRoomType() {
    return useQuery({
      queryKey: ['room_type'],
      queryFn: ()=>getData('room_type'),
      staleTime:Infinity
    })
}
export function useAddressType() {
    return useQuery({
      queryKey: ['address_type'],
      queryFn: ()=>getData('address_type'),
      staleTime:Infinity
    })
}
export function useReligion() {
    return useQuery({
      queryKey: ['religion'],
      queryFn: ()=>getData('religion'),
      staleTime:Infinity
    })
}
export function useCaste() {
    return useQuery({
      queryKey: ['caste'],
      queryFn: ()=>getData('caste'),
      staleTime:Infinity
    })
}
export function useSlotType() {
    return useQuery({
      queryKey: ['slotType'],
      queryFn: ()=>getData('slot_type'),
      staleTime:Infinity
    })
}
export function useRiderType() {
    return useQuery({
      queryKey: ['riderType'],
      queryFn: ()=>getData('rider_type'),
      staleTime:Infinity
    })
}
export function useStandard() {
    return useQuery({
      queryKey: ['standard'],
      queryFn: ()=>getData('standard'),
      staleTime:Infinity
    })
}
export function useSchoolTime() {
    return useQuery({
      queryKey: ['schoolTime'],
      queryFn: ()=>getData('school_time'),
      staleTime:Infinity
    })
}
export function useSection() {
    return useQuery({
      queryKey: ['section'],
      queryFn: ()=>getData('section'),
      staleTime:Infinity
    })
}

