import { createContext, useState, ReactNode, useEffect } from "react";
import { LoginRequest, LogoutRequest, RegisterRequest, checkLogin } from "../api/auth";
import { LoginInput } from "../types/LoginInput";
import { useQuery } from "@tanstack/react-query";


type AuthStatus = {
    isLogin: boolean
}
 
type AuthContextType = {
    user_status: AuthStatus
    setStatus: React.Dispatch<React.SetStateAction<AuthStatus>>;
    login : (credential:LoginInput) => Promise<void>
    logout : () => Promise<void>
    register: (data: LoginInput) => Promise<void>
}
 
export const AuthContext = createContext({} as AuthContextType);


export const AuthContextProvider = ({children}: {children: ReactNode}) => {

  const [user_status, setStatus] = useState<AuthStatus>({isLogin: false});
    // Fonction pour connecter l'utilisateur (vous pouvez l'adapter à votre logique d'authentification)
    
  const login = async (credentials : LoginInput) => {
    const res = await LoginRequest(credentials)
    setStatus({isLogin:res == 200})
  };

  const logout = async () => {
    await LogoutRequest()
    setStatus({isLogin:false})
  }

  const register = async (data : LoginInput) => {
    const res = await RegisterRequest(data)
    setStatus({isLogin:res == 201})
  }

  const {data} = useQuery ({
    queryFn: async () => await checkLogin(),
    queryKey: ["LoginStatus"],
    })

    useEffect (() => {
        if (data) {
            setStatus({isLogin:data} )
        }
    },[data])

    return (
        <AuthContext.Provider value={{ user_status, setStatus , login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
}

