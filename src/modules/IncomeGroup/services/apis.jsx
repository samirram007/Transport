import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const moduleApiPath = '/income_groups'
export function fetchIncomeGroupsService() {
    return getData(`${moduleApiPath}`)
}
export function fetchIncomeGroupByIdService(id) {
    return getData(`${moduleApiPath}/${id}`)
}

export async function storeIncomeGroupService(payload) {
    return await postData(`${moduleApiPath}`, payload)
}

export function updateIncomeGroupService(payload) {
    const { id, ...data } = payload;

    return putData(`${moduleApiPath}/${id}`, data)
}
export function deleteIncomeGroupService(payload) {
    const { id, ...data } = payload;
    return deleteData(`${moduleApiPath}/${id}`)

}
