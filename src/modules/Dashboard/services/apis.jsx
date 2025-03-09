import { getData } from "@/lib/dataClient";

const modulePath = "/dashboard";


export function fetchDashboardService() {

    return getData(`${modulePath}`)
}
