import { useForm, UseFormRegister, SubmitHandler, Path } from "react-hook-form"
import FormExtra from '../components/FormExtra.tsx'
import LoginHeader from '../components/LoginHeader.tsx'
import "../index.css"
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query"
import { LoginRequest } from "../api/auth.ts"
import { LoginInput } from "../types/LoginInput.ts"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../hooks/AuthHook.tsx"
import { useContext } from "react"

const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"



type InputProps = {
  label: Path<LoginInput>
  register: UseFormRegister<LoginInput>
  type:string
  required: boolean
}

const Input = ({ label, register, required, type }: InputProps) => (
  <>
    <label className="">{label}</label>
    <input type ={type} {...register((label.toLowerCase() as keyof LoginInput), { required })} className={fixedInputClass}/>
  </>
)


function Login() {
  const authContext = useContext(AuthContext)

  const { register, handleSubmit } = useForm<LoginInput>()

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    LoginMutation.mutate(data)
  }

  const LoginMutation = useMutation ({
    mutationFn: authContext.login,
  })

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-15 px-4 sm:px-6 lg:px-8 bg-[url('src/assets/3152174.jpg')] bg-cover">
      <div className="w-1/3 h-2/3 flex flex-col justify-center items-center border-4 border-[#4F7A43] rounded-lg bg-[#4F7A43]">
        <LoginHeader heading="Login to your account" paragraph="Don't have an account yet ?"/>
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 mt-8 space-y-6 mb-[10px]">
        <Input label="Email" register={register} required type="email" />
        <br />
        <Input label="Password" register={register} required type="password"/>
        <FormExtra/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">Se connecter</button>
        </form>
      </div>
      {authContext.user_status.isLogin && <Navigate to="/" replace={true}/>}
    </div>

  )
}

export default Login

