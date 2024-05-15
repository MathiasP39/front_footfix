const Home = () => {
    /*
    const {isPending, isError,data:articlesResponse} = useQuery({
        queryFn: async () => await getAllArticles(),
        queryKey: ["articles"],
        })
    */
    return (
        <div className="h-[1000px]">
            <div className="w-[98%] mt-[70px] h-[50%] mx-auto">
                <img src="src/assets/footfix_banner_2.png" alt="site-banner" className="rounded-3xl w-full h-full"/>
            </div>
            <div className="mt-7">
                <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5">
                    <img src="src/assets/fond_site.jpeg" className="bg-black col-span-3 h-full"></img>
                    <div className="bg-gray-600 col-span-7 grid"> 
                        <h1> Ne restez pas ignorant, faites tombez les préjugés</h1>
                        <p>Content</p>
                    </div>
                </div>
                <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5">
                <div className="bg-gray-600 col-span-7"> 
                        <h1>Title </h1>
                        <p>Content</p>
                    </div>
                    <div className="bg-black col-span-3"></div> 
                </div>
                <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5">
                <img src="src/assets/fondballoncarnet.jpg"className="col-span-3 "></img> 
                <div className="col-span-7"> 
                        <h1>Title </h1>
                        <p>Content</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}

export default Home