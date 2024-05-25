import { Composition } from "../../types/Composition";


function CompositionPreview ({id,name,suppression,open}:Omit<Composition,'joueurs'> & {id:number;suppression:(id:number) => void;open:(id:number)=> void}) {
    return (
        <div onClick={() => open(id)}>
            <p>{name}</p>
            <button onClick={() => suppression(id)}>supprimer</button>
        </div>
    )
}

export default CompositionPreview