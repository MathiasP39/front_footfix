import { ChangeEvent, useContext, useRef, useState } from 'react';
import Joueur from './Joueur';
import { DraggableData } from 'react-draggable';
import { JoueurProps } from '../types/JoueurProps';
import { useMutation } from '@tanstack/react-query';
import { SaveComp } from '../api/composition';
import { Composition } from '../types/Composition';
import { AuthContext } from '../services/Auth';
import TerrainImage from '../assets/terrain_foot.svg'

type JoueurElement = {
    player : JSX.Element
}



const Terrain = () => {


    const authContext = useContext(AuthContext)

    const terrainRef = useRef<HTMLDivElement>(null);

    const [joueurs, setJoueurs] = useState<JoueurElement[]>([]);

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
        <div className="col-span-6 row-span-5 border-solid border-black border-8 grid grid-rows-[auto,1fr,auto] p-4 relative" ref={terrainRef}>
          <label htmlFor="textareaTitle" className='mx-auto p-5 md:w-1/3 mb-4 text-center'>Le nom de ta composition</label>
          <textarea
            name=""
            id="textareaTitle"
            value={title}
            onChange={handleTitleChange}
            rows={1}
            className="resize-none w-full md:w-1/3 rounded-3xl mx-auto p-1 border-red-950 border-solid border-4 mb-4 mt-5 max-h-36 text-center"/>
          <div className="flex justify-center items-center mb-4">
            {joueurs.map((joueur, index) => (
                        <div key={index}>{joueur.player}</div>
                    ))}
            <img
              id="Div_Edition"
              src={TerrainImage}
              alt="image terrain de foot"
              className="max-w-full max-h-full flex-shrink-1 "/></div>
          <div className="flex justify-around">
            <button
              className="border-solid border-4 border-blue-500 p-2"
              onClick={addComponent}>Créer un Joueur </button>
            <button
              className="border-solid border-4 border-blue-500 p-2"
              onClick={handleSubmit}
              disabled={!authContext.user_status.isLogin || title === ''}
            >
              Sauvegarder
            </button>
          </div>
        </div>   
            )
      

    }
    

export default Terrain