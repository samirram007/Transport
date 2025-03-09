

import axiosClient from "@/lib/axios-client"
import { deleteData, getData, postData, putData } from "@/lib/dataClient"
import { removeEmptyStrings } from "@/lib/removeEmptyStrings"

const moduleApiPath = '/riders'
export function fetchRiders(payload) {

    payload = removeEmptyStrings(payload)
    let filterString = `?`
    if (payload.filterOption) {
        filterString += `&filterOption=${payload.filterOption}`
    }
    return getData(`${moduleApiPath}${filterString}`);

}
export async function fetchRiderById(id) {
    return getData(`${moduleApiPath}/${id}`);
}
export function storeRiderService(payload) {
    return postData(`${moduleApiPath}`, payload);

}
export function updateRiderService(payload) {
    const { id, ...data } = payload;
    return putData(`${moduleApiPath}/${id}`, data);

}
export function deleteRiderService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${moduleApiPath}/${id}` );

}
export function storeRiderFee(payload) {
    // console.log('payload',removeEmptyStrings(payload));
    //return
    return axiosClient.post("/fees", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {

            throw err;
        });

}
export function updateRiderFee(payload) {
    const { id, ...data } = payload;
    //  console.log(removeEmptyStrings(payload));
    return axiosClient.put(`/fees/${id}`, removeEmptyStrings(data))
        .then(response => {

            return response.data;
        })
        .catch(err => {

            throw err;
        });

}

export function storeGuardian(payload) {
    // console.log("Guardian payload", removeEmptyStrings(payload));
    return axiosClient.post("/guardians", removeEmptyStrings(payload))
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
}
export function updateGuardian(payload) {
    const { id, ...data } = payload;

    // console.log("Guardian payload", id, removeEmptyStrings(data));
    return axiosClient.put(`/guardians/${id}`, removeEmptyStrings(data))
        .then(response => {
            // console.log('success update');

            return response.data;
        })
        .catch(err => {
            throw err;
        });
}