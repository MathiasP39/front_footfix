import { useState } from "react"
import Terrain from "../components/terrain_foot"

const Composition = () => {
    const [editMode, setEditMode] = useState(false)
    return (
        <div className="w-full mt-20 grid grid-cols-6 grid-rows-5 h-[700px]">
            {
                editMode && <><button onClick={() => setEditMode(false)}>Retour edition</button><Terrain/></>
            }
            {
                !editMode && <>
                <p>Bienvenu sur l'outil de composition</p>
                <button className="col-span-full" onClick={() => setEditMode(true)}>Creer ma composition</button>
                <div>
                    <p>
                        Bienvenu sur l'outil de composition, laissez libre court a votre imagination pour vos mises en places tactiques ou créer
                        votre équipe de reve
                    </p>
                </div></>
            }
        </div>
    )

}

export default Composition