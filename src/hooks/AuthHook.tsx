import { createContext, useState, ReactNode, useEffect } from "react";
import { LoginRequest, LogoutRequest, checkLogin } from "../api/auth";
import { LoginInput } from "../types/LoginInput";
import { useMutation, useQuery } from "@tanstack/react-query";

type AuthStatus = {
    isLogin: boolean
}
 
type AuthContextType = {
    user_status: AuthStatus
    setStatus: React.Dispatch<React.SetStateAction<AuthStatus>>;
    login : (credential:LoginInput) => Promise<void>
    logout : () => Promise<void>
}
 
export const AuthContext = createContext({} as AuthContextType);


export const AuthContextProvider = ({children}: {children: ReactNode}) => {

    const LogoutAction = useMutation({
        mutationFn: LogoutRequest
      })

    const [user_status, setStatus] = useState<AuthStatus>({isLogin: false});
      // Fonction pour connecter l'utilisateur (vous pouvez l'adapter à votre logique d'authentification)
    
    const login = async (credentials : LoginInput) => {
    const res = await LoginRequest(credentials)
    setStatus({isLogin:res == 200})
  };

  const logout = async () => {
    await LogoutAction.mutate()
    setStatus({isLogin:false})
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
        <AuthContext.Provider value={{ user_status, setStatus , login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

