import { useQuery } from "@tanstack/react-query";
import { fetchAddressByIdService, fetchAddressService } from "../services/apis";

 export function useAddress(id) {
    return useQuery({
      queryKey: ['addresses',{id}],
      queryFn: ()=>fetchAddressByIdService(id),
      enabled: !!id,
      staleTime:Infinity
    })
  }
export function useAddresses() {
    const queryData= useQuery({
      queryKey: ['addresses'],
      queryFn: fetchAddressService,
      // enabled: false,
      staleTime: Infinity // keep data fresh for this period (1 min.)
    })
   
    return queryData;
  }
