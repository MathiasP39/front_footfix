import LogoImage from "../assets/footfix_site_icon.svg"

const Logo = () => {

    return (
        <a href='/' className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={LogoImage} className="h-10" alt="Footfix Logo"/>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Footfix</span>
        </a>
    )

}

export default Logo