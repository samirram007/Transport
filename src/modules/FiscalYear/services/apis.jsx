import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/fiscal_years";
export function fetchFiscalYearByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchFiscalYearsService() {
    return getData(`${modulePath}`)
}

export async function storeFiscalYearService(payload) {
    return await postData(`${modulePath}`, payload)
}

export function updateFiscalYearService(payload) {
    const { id, ...data } = payload;
    return putData(`${modulePath}/${id}`, data)
}
export function deleteFiscalYearService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${modulePath}/${id}`)

}
export function switchFiscalYearService(payload) {
    // const { id, ...data } = payload;
    return postData(`${modulePath}`, payload)

}
