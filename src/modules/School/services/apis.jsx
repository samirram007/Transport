import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/schools";
export function fetchSchoolByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchSchoolsService() {
    return getData(`/schools`)    
}

export async function  storeSchoolService(payload) {
    return await postData(`/schools`,payload)
 }

export function updateSchoolService(payload) {
    const { id, ...data } = payload;
  
    return putData(`/schools/${id}`,data)
}
export function deleteSchoolService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/schools/${id}`)
     
}
