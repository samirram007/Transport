import { useProfile } from "../hooks/useProfile";
import { useAuth } from "./features/useAuth";

const { createContext, useState } = require("react");



const UserProfileContext = createContext({
    profile: null,
    setprofile: () => { }
})


const UserProfileContextProvider = ({ children }) => {
    const { token, user } = useAuth()
    const [profile, setprofile] = useState({})
    const userProfile = useProfile()
    useEffect(() => {
        if (token) {
            setprofile(token)
        }
        else {
            setprofile(user)
        }


    }, [token])



    return (
        <UserProfileContext value={profile}></UserProfileContext>
    )
}

export default UserProfileContextProvider