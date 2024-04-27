
function Login() {

  return (
    <>
      <div>
        <form>
        <p>Login </p>
        <input name="email" maxLength={100} pattern="email" placeholder="email"></input>
        <p>Password</p>
        <input name ="password" type="password" maxLength={50} placeholder="password"></input>
        <br></br>
        <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  )
}

export default Login
