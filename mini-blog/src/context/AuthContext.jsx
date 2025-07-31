import { useContext, createContext } from "react";

const AuthContex = createContext()

export function AuthProvider({children, value}){
    return <AuthContex.Provider value={value}>
        {children}
    </AuthContex.Provider>
}

export function useAuthValue(){
    return useContext(AuthContex);
}