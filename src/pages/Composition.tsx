import { useState } from "react"
import Terrain from "../components/terrain_foot"

const Composition = () => {
    const [editMode, setEditMode] = useState(false)
    return (
        <div className="w-full mt-20 grid grid-cols-6 grid-rows-5 h-[700px]">
            <div className="col-span-full">
                Bienvenu sur l'outil de composition
                <button className="col-span-full" onClick={() => setEditMode(true)}>Creer ma composition</button>
            </div>
            {
                editMode && <Terrain/>
            }
            {
                !editMode && <div> page des compositions </div>
            }
        </div>
    )

}

export default Composition