import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const moduleApiPath = '/expense_heads'
export function fetchExpenseHeadsService() {
    console.log('hello');

    return getData(`${moduleApiPath}`)
}
export function fetchExpenseHeadByIdService(id) {
    return getData(`${moduleApiPath}/${id}`)
}

export async function storeExpenseHeadService(payload) {
    return await postData(`${moduleApiPath}`, payload)
}

export function updateExpenseHeadService(payload) {
    const { id, ...data } = payload;

    return putData(`${moduleApiPath}/${id}`, data)
}
export function deleteExpenseHeadService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${moduleApiPath}/${id}`)

}
