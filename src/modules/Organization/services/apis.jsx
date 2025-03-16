import { deleteData, getData, postData, putData } from "@/lib/dataClient";

const modulePath = "/organizations";
export function fetchOrganizationByIdService(id) {
    return getData(`${modulePath}/${id}`)
}

export function fetchOrganizationsService() {
    return getData(`/organizations`)
}

export async function storeOrganizationService(payload) {
    return await postData(`/organizations`, payload)
}

export function updateOrganizationService(payload) {
    const { id, ...data } = payload;

    return putData(`/organizations/${id}`, data)
}
export function deleteOrganizationService(payload) {
    const { id } = payload;
    return deleteData(`/organizations/${id}`)

}
