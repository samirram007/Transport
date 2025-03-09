import { deleteData, getData, postData, putData } from "@/lib/dataClient";


const modulePath = '/vehicle_types'
export function fetchVehicleTypeByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchVehicleTypesService() {
    return getData(`${modulePath}`)
}

export async function storeVehicleTypeService(payload) {
    return await postData(`${modulePath}`, payload)
}

export function updateVehicleTypeService(payload) {
    const { id, ...data } = payload;

    return putData(`${modulePath}/${id}`, data)
}
export function deleteVehicleTypeService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${modulePath}/${id}`)

}
