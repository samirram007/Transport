import { getData } from "@/lib/dataClient";

export async function fetchUserProfileService() {
const data= await getData("/profile")

    return data
}