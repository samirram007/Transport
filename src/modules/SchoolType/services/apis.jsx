import { deleteData, getData, postData, putData } from "@/lib/dataClient";


export function fetchSchoolTypeByIdService(id) {
    return getData(`/school_types/${id}`)
}

export function fetchSchoolTypesService() {
    return getData(`/school_types`)    
}

export async function  storeSchoolTypeService(payload) {
    return await postData(`/school_types`,payload)
 }

export function updateSchoolTypeService(payload) {
    const { id, ...data } = payload;
    
    return putData(`/school_types/${id}`,data)
}
export function deleteSchoolTypeService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/school_types/${id}`)
     
}
