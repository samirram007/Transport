import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/campuses";
export function fetchCampusByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchCampusesService() {
    return getData(`/campuses`)    
}

export async function  storeCampuseservice(payload) {
    return await postData(`/campuses`,payload)
 }

export function updateCampuseservice(payload) {
    const { id, ...data } = payload;
  
    return putData(`/campuses/${id}`,data)
}
export function deleteCampuseservice(payload) {
    const { id, ...data } = payload;
    return deleteData(`/campuses/${id}`)
     
}
