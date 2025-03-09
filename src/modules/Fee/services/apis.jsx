
import { deleteData, getData, postData, putData } from '@/lib/dataClient';

const moduleApiPath = '/fees'
export function fetchFeeService(id) {

    return axiosClient.get(`${moduleApiPath}/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchFeesService(payload) {
    const filterString = `fiscalYearId=${payload.fiscalYearId}&from=${payload.from}&to=${payload.to}`

    return getData(`${moduleApiPath}?${filterString}`)

}
export function fetchSearchRiderForFeesService(payload) {
    const filterString = `text=${payload.text}`

    return getData(`/search_riders_for_fees?${filterString}`)

}


export function storeFeeService(payload) {
    return postData(`${moduleApiPath}`, payload)

}
export function updateFeeService(payload) {
    const { id, ...data } = payload;
    return putData(`${moduleApiPath}/${id}`, data)

}
export function deleteFeeService(payload) {


    const { id } = payload;

    return deleteData(`${moduleApiPath}/${id}`)

}
