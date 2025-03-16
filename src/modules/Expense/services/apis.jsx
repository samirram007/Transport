
import { deleteData, getData, postData, putData } from '@/lib/dataClient';

const moduleApiPath = '/expenses'
export function fetchExpenseService(id) {

    return getData(`${moduleApiPath}/${id}`)
}
export function fetchExpensesService(payload) {
    const filterString = `fiscalYearId=${payload.fiscalYearId}&from=${payload.from}&to=${payload.to}`

    return getData(`${moduleApiPath}?${filterString}`)

}
export function fetchSearchRiderForExpensesService(payload) {
    const filterString = `text=${payload.text}`

    return getData(`/search_riders_for_expenses?${filterString}`)

}


export function storeExpenseService(payload) {
    return postData(`${moduleApiPath}`, payload)

}
export function updateExpenseService(payload) {
    const { id, ...data } = payload;
    return putData(`${moduleApiPath}/${id}`, data)

}
export function deleteExpenseService(payload) {


    const { id } = payload;

    return deleteData(`${moduleApiPath}/${id}`)

}
