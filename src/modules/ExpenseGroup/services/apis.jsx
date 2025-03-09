import { deleteData, getData, postData, putData } from "@/lib/dataClient";


export function fetchExpenseGroupByIdService(id) {
    return getData(`/expense_groups/${id}`)
}

export function fetchExpenseGroupsService() {
    return getData(`/expense_groups`)    
}

export async function  storeExpenseGroupService(payload) {
    return await postData(`/expense_groups`,payload)
 }

export function updateExpenseGroupService(payload) {
    const { id, ...data } = payload;
    
    return putData(`/expense_groups/${id}`,data)
}
export function deleteExpenseGroupService(payload) {
    const { id, ...data } = payload;
    return deleteData(`/expense_groups/${id}`)
     
}
