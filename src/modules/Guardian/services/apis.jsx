import { deleteData, getData, postData, putData } from "@/lib/dataClient";


const moduleApiPath='/guaridans'
export function fetchGuardianByIdService(id) {
    return getData(`${moduleApiPath}/${id}`)
}

export function fetchGuardiansService() {
    return getData(`${moduleApiPath}`)    
}

export async function  storeGuardianService(payload) {
    return await postData(`${moduleApiPath}`,payload)
 }

export function updateGuardianService(payload) {
    const { id, ...data } = payload;
    
    return putData(`${moduleApiPath}/${id}`,data)
}
export function deleteGuardianService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${moduleApiPath}/${id}`)
     
}
