import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/designations";
export function fetchDesignationByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchDesignationsService() {
    return getData(`/designations`)    
}

export async function  storeDesignationService(payload) {
    return await postData(`/designations`,payload)
 }

export function updateDesignationService(payload) {
    const { id, ...data } = payload;
  
    return putData(`/designations/${id}`,data)
}
export function deleteDesignationService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/designations/${id}`)
     
}
