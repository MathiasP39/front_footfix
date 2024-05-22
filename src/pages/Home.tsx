import Bandeau_Home_Droite from "../components/bandeau_home_img_gauche"


const Home = () => {
    console.log(import.meta.env.VITE_BACK_URL)
    return (
        <div className="h-[1000px]">
            <div className="w-[98%] mt-[70px] h-[50%] mx-auto">
                <img src="src/assets/footfix_banner_2.png" alt="site-banner" className="rounded-3xl w-full h-full"/>
            </div>
            <div className="mt-7">
            <Bandeau_Home_Droite/>
                <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5 mb-7">
                    <div className="bg-gray-600 col-span-7"> 
                        <h1>Title </h1>
                        <p>Content</p>
                    </div>
                    <div className="bg-black col-span-3">
                    </div> 
                </div>
                <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5">
                    <img src="src/assets/fondballoncarnet.jpg"className="col-span-3"></img> 
                    <div className="col-span-7 grid grid-rows-10"> 
                        <div className="row-span-3 grid grid-rows-4">
                            <p className="row-start-3 row-span-1 text-right">Decouvrez les dessous d'un des sports les plus joué au monde </p>
                        </div>
                        <div>
                            <p className="text-right">Ratio </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}

export default Home