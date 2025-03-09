import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const moduleApiPath = '/fee_heads'
export function fetchFeeHeadsService() {
    console.log('hello');

    return getData(`${moduleApiPath}`)
}
export function fetchFeeHeadByIdService(id) {
    return getData(`${moduleApiPath}/${id}`)
}

export async function storeFeeHeadService(payload) {
    return await postData(`${moduleApiPath}`, payload)
}

export function updateFeeHeadService(payload) {
    const { id, ...data } = payload;

    return putData(`${moduleApiPath}/${id}`, data)
}
export function deleteFeeHeadService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${moduleApiPath}/${id}`)

}
