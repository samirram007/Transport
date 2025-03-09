import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/academic_classes";
 
export function fetchAcademicClassService(id) {
    return getData(`${modulePath}/${id}`)
}
export function fetchAcademicClassServices() {
    return getData(`${modulePath}`)
}
export function fetchAcademicClassByCampusIdService(campusId) {

    return getData(`${modulePath}?campusId=${campusId}`) 

}
export function storeAcademicClassService(payload) {
    return postData(`${modulePath}`, payload)
}
export function updateAcademicClassService(payload) {

    const { id, ...data } = payload
    return putData(`${modulePath}/${id}`, data)
}
export function deleteAcademicClassService(payload) {

    const { id} = payload
    return deleteData(`${modulePath}/${id}` ) 

}

