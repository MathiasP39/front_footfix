import { Composition } from "../../types/Composition";


function CompositionPreview ({id,name,suppression}:Omit<Composition,'joueurs'> & {id:number;suppression:(id:number) => void}) {
    return (
        <div>
            <p>{name}</p>
            <button onClick={() => suppression(id)}>supprimer</button>
        </div>
    )
}

export default CompositionPreview