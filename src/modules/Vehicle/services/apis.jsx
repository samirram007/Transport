import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/vehicles";
export function fetchVehicleByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchVehiclesService() {
    return getData(`${modulePath}`)
}

export async function storeVehicleService(payload) {
    return await postData(`${modulePath}`, payload)
}

export function updateVehicleService(payload) {
    const { id, ...data } = payload;

    return putData(`${modulePath}/${id}`, data)
}
export function deleteVehicleService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${modulePath}/${id}`)

}
