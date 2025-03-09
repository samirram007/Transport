import { getData, postData } from "@/lib/dataClient";







export async function fetchUserProfileService() {
    // console.log('loginService called', payload);

    return  await getData("/auth/profile") 
}
export async function loginService(payload) {
    // console.log('loginService called', payload);
    const data=  await postData("/auth/login",payload)
    console.log(data);
    return data;
    
    // return (await axiosClient.post("/auth/login", payload)).data
}
export async function logoutService() {
    // console.log('logoutService called');

    return true;
    //return  (await axiosClient.post("/logout", []))
}

export async function refreshTokenService(payload) {
    console.log('refreshTokenService called');

    const response = await axios.post("/auth/refresh", {
        'Authorization': `Bearer ${payload.refreshToken}`
    }).data;
    // console.log(response);

    return response;
}




