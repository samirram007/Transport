import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const apiPath='education_boards'

export function fetchEducationBoardByIdService(id) {
    return getData(`/${apiPath}/${id}`)
}

export function fetchEducationBoardsService() {
    return getData(`/${apiPath}`)    
}

export async function  storeEducationBoardService(payload) {
    return await postData(`/${apiPath}`,payload)
 }

export function updateEducationBoardService(payload) {
    const { id, ...data } = payload;
    
    return putData(`/${apiPath}/${id}`,data)
}
export function deleteEducationBoardService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/${apiPath}/${id}`)
     
}
