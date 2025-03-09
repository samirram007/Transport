import { getData } from "@/lib/dataClient";

export async function fetchSettingsService() {

    return (await getData("/settings"))
}