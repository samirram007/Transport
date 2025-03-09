import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/departments";
export function fetchDepartmentByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchDepartmentsService() {
    return getData(`/departments`)    
}

export async function  storeDepartmentService(payload) {
    return await postData(`/departments`,payload)
 }

export function updateDepartmentService(payload) {
    const { id, ...data } = payload;
  
    return putData(`/departments/${id}`,data)
}
export function deleteDepartmentService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/departments/${id}`)
     
}
