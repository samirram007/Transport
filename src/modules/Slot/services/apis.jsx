import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/slots";
export function fetchSlotByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchSlotsService() {
    return getData(`${modulePath}`)    
}

export async function  storeSlotService(payload) {
    return await postData(`${modulePath}`,payload)
 }

export function updateSlotService(payload) {
    const { id, ...data } = payload;
  
    return putData(`${modulePath}/${id}`,data)
}
export function deleteSlotService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${modulePath}/${id}`)
     
}
