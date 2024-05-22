import Logo from './Clickable_Site_Icon'
import NavLink from './NavLink.tsx'
import Home from './HomeNavLink.tsx'
import Derou from './Deroulement_menu.tsx'
import { AuthContext } from "../services/Auth.tsx"
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/auth.ts'

interface UserInfo {
  fullname:string
}

const Navbar = () => {

  const authContext = useContext(AuthContext)

  const {data} = useQuery<UserInfo>({
    queryFn: async () => await getUserInfo(),
    queryKey: ["userInfo"],
    })

  return (<>
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo/>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!(authContext.user_status.isLogin) && <a href='/login'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connexion</button> 
          </a>}
          {(authContext.user_status.isLogin) && (<div className="flex items-center space-x-4">{data && <a href='/profil'>{data.fullname}</a>}<button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={authContext.logout}>Se Deconnecter</button></div>)}
        </div>
        <Derou/>

    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
      <ul id="Liste_lien" className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <Home/>
        <NavLink to = "/article" text = "Actualités"/>
        <NavLink to='/composition' text="Composition"/>
        <NavLink to = "#" text = "Draft"/>
        <NavLink to = "#" text = "Contact"/>
      </ul>
    </div>
    </div>
  </nav>
</>
  )
}

export default Navbar