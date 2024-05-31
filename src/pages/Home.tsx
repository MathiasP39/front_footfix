import BannerURL from "../assets/footfix_banner_2.png"
import Image1 from "../assets/fond_site.jpeg"
import Image2 from "../assets/fondballoncarnet.jpg"
import Bandeau_Pres_Droite from "../components/bandeau_home_img_gauche"


const Home = () => {
    console.log(import.meta.env.VITE_BACK_URL)
    return (
        <div className="h-[1000px]">
            <div className="w-[98%] mt-[70px] h-[50%] mx-auto">
                <img src={BannerURL} alt="site-banner" className="rounded-3xl w-full h-full"/>
            </div>
            <div className="mt-7">
                <Bandeau_Pres_Droite url={Image1} />
                    <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5 mb-7">
                        <div className="bg-gray-600 col-span-7"> 
                            <h1>Title </h1>
                            <p>Content</p>
                        </div>
                            <div className="bg-black col-span-3"></div> 
                    </div>
                <Bandeau_Pres_Droite url={Image2}/>
                </div>
        </div>) 
    
}

export default Home