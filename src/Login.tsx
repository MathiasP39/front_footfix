import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form"

interface IFormValues {
  Email: string
  Password: string
}

type InputProps = {
  label: Path<IFormValues>
  register: UseFormRegister<IFormValues>
  type:string
  required: boolean
}

const Input = ({ label, register, required, type }: InputProps) => (
  <>
    <label>{label}</label>
    <br />
    <input type ={type} {...register(label, { required })} />
  </>
)

function Login() {

  function handleForgotPassword (e:React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    console.log(e.currentTarget)
    //Do something (redirect to another page)
  }

  const { register, handleSubmit } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" register={register} required type="email"/>
        <br />
        <Input label="Password" register={register} required type="password"/>
        <br></br>
        <button type="submit">Se connecter</button>
        <a href = "" onClick={handleForgotPassword}>Mot de passe oublié</a>
        </form>
      </div>
    </>
  )
}

export default Login
