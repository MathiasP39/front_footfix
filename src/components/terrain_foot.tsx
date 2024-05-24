import { ChangeEvent, useContext, useRef, useState } from 'react';
import Joueur from './Joueur';
import { DraggableData } from 'react-draggable';
import { JoueurProps } from '../types/JoueurProps';
import { useMutation } from '@tanstack/react-query';
import { SaveComp } from '../api/composition';
import { Composition } from '../types/Composition';
import { AuthContext } from '../services/Auth';
import TerrainImage from '../assets/terrain_foot.svg'

type JoueurType = {
    player : JSX.Element
}

const Terrain = () => {

    const authContext = useContext(AuthContext)

    const terrainRef = useRef<HTMLDivElement>(null);

    const [joueurs, setJoueurs] = useState<JoueurType[]>([]);

    const [positions, setPositions] = useState<{ [key: number]: JoueurProps }>({});

    const [id, setId] = useState(null)

    const [title, setTitle] = useState("")  

    const handleStop = (id: number, data: DraggableData) => {
      setPositions(prevPositions => ({
        ...prevPositions,
        [id]: {name:"Joueur"+id, positionx: data.x, positiony:data.y, numero:10}
    }));
    };


    const handleSubmit = () => {
      const object = {...positions}
      const table : JoueurProps[] = []
      for (const obj in object){
        table.push(object[obj])
      }
      const request : Composition ={
        id:id,
        name: title,
        joueurs: table
      }
      CompoMutation.mutate(request)
    }

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(event.target.value);
    }

    const CompoMutation = useMutation ({
      mutationFn: SaveComp,
      onSuccess: (data) => {
        setId(data.data.id)
      }
    })

    const addComponent = () => {
        setJoueurs([...joueurs, {player:<Joueur key={joueurs.length} id={joueurs.length}parent={terrainRef} handle={handleStop}/>}]);
    };
    
    
    return (
        <div className="col-start-2 col-end-6 row-start-2 row-end-7 border-solid border-black border-8 grid grid-cols-10 grid-rows-10 relative" ref={terrainRef}>
          <textarea name="" id="textareaTitle" value={title} onChange={handleTitleChange} rows={1} className='resize-none w-1/3 rounded-3xl m-auto p-1 border-red-950 border-solid'/>
            {joueurs.map((joueur, index) => (
                <div key={index}>{joueur.player}</div>
            ))}
            <img id="Div_Edition" src={TerrainImage} alt="image terrain de foot" className="col-start-3 row-start-2 col-end-9 h-auto w-auto"/>
            <button className="border-solid border-4 border-blue-500 row-start-10 col-start-3" onClick={addComponent}>Créé un Joueur</button>
            <button className="row-start-10 col-start-8 border-solid border-4 border-blue-500" onClick={handleSubmit} disabled={!authContext.user_status.isLogin || title == ''}>Sauvegarder</button>
        </div>
        
    )

}

export default Terrain