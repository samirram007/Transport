/* eslint-disable no-unreachable */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState } from "react";
// import { useRefreshToken } from "../hooks/useRefreshToken";


export const AuthContext = createContext({
    user: null,
    token: null,
    refresh: null,
    role: null,
    setRole: () => { },
    setUser: () => { },
    setToken: () => { },
    setRefreshToken: () => { },
    loading: false,
    isLoading: () => { },
    isGuest: true,
    setIsGuest: () => { },
    AuthCheck: () => { },

});

const AuthContextProvider = ({ children }) => {
    // const mutateRefreshToken = useRefreshToken()
    const [user, _setUser] = useState({});
    const [role, setRole] = useState('');
    const [isGuest, setIsGuest] = useState(true);


    // const [token, _setToken] = useState(null);
    // const [refreshToken, setRefreshToken] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN") ?? null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("REFRESH_TOKEN") ?? null);


    const [loading, setLoading] = useState(true)


    const setUser = (_user) => {
        _setUser(_user);
        if (_user) {
            setIsGuest(false)
        }
    }
    const setToken = (_token, refreshToken) => {

        _setToken(_token);
        setRefreshToken(refreshToken)
        if (_token) {
            localStorage.setItem("ACCESS_TOKEN", _token);
            localStorage.setItem("REFRESH_TOKEN", refreshToken);
            setIsGuest(false)
        } else {

            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            setIsGuest(true)
        }

    };

    const AuthCheck = () => {

        if (token) {
            setIsGuest(false)
        } else {
            setIsGuest(true)
        }
    }


    return (
        <AuthContext
            value={{
                user, token, setToken, role,
                refreshToken, setUser, setRole,
                setRefreshToken,
                isGuest, setIsGuest, AuthCheck,
                loading, setLoading

            }}>
            {children}
        </AuthContext>
    );
};
export default AuthContextProvider

