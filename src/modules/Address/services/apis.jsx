import { deleteData, getData, postData, putData } from "@/lib/dataClient";


export function fetchAddresseByIdService(id) {
    return getData(`/addresses/${id}`)
}

export function fetchAddressService() {
    return getData(`/addresses`)    
}

export async function  storeAddressService(payload) {
    return await postData(`/addresses`,payload)
 }

export function updateAddressService(payload) {
    const { id, ...data } = payload;
    return putData(`/addresses/${id}`,data)
}
export function deleteAddressService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/addresses/${id}`)
     
}
