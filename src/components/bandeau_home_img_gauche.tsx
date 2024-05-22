const Bandeau_Home_Droite = () => {
    return (
        <div className="grid grid-cols-10 h-[300px] w-95% ml-5 mr-5 rounded-3xl mb-7">
        <img src="src/assets/fond_site.jpeg" className="bg-black col-span-3 h-full rounded-3xl"></img>
        <div className="col-span-7 grid grid-rows-6"> 
            <h1 className="row-span-2"> Ne restez pas ignorant, faites tomber les préjugés</h1>
            <p className="row-span-4">Content</p>
        </div>
        </div>
    )
}

export default Bandeau_Home_Droite