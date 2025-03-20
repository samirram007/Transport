/* eslint-disable no-unreachable */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useCallback, useEffect, useState } from "react";
// import { useRefreshToken } from "../hooks/useRefreshToken";


export const AuthContext = createContext({
    user: null,
    token: null,
    refreshToken: null,
    role: null,
    setRole: () => { },
    setUser: () => { },
    setToken: () => { },
    setRefreshToken: () => { },
    loading: false,
    setLoading: () => { },
    isGuest: true,
    AuthCheck: () => { },

});

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");
    const [token, setTokenState] = useState(localStorage.getItem("ACCESS_TOKEN") || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("REFRESH_TOKEN") || null);
    const [loading, setLoading] = useState(true);

    // Derived state: No need to manually update `isGuest`
    const isGuest = !token;


    const setToken = (_token, _refreshToken) => {
        if (_token) {
            localStorage.setItem("ACCESS_TOKEN", _token);
            localStorage.setItem("REFRESH_TOKEN", _refreshToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
        }
        setTokenState(_token);
        setRefreshToken(_refreshToken);
    };

    const AuthCheck = useCallback(() => {
        setLoading(true);
        if (token) {
            setUser({ name: "John Doe" }); // Replace with actual user data fetching logic
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        AuthCheck();
    }, [AuthCheck]);
    return (
        <AuthContext
            value={{
                user,
                token,
                refreshToken,
                role,
                setRole,
                setUser,
                setToken,
                setRefreshToken,
                isGuest,
                AuthCheck,
                loading,
                setLoading,

            }}>
            {children}
        </AuthContext>
    );
};
export default AuthContextProvider

