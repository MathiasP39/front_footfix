import { useRef, useState } from 'react';
import Joueur from './Joueur';

type JoueurType = {
    player : JSX.Element
}

type Position = {
    x: number;
    y: number;
  };

const Terrain = () => {

    const terrainRef = useRef<HTMLDivElement>(null);

    const [joueurs, setJoueurs] = useState<JoueurType[]>([]);

    const [positions, setPositions] = useState<{ [key: number]: Position }>({});

    const handleStop = (id: number, data: DraggableData) => {
        setPositions(prevPositions => ({
          ...prevPositions,
          [id]: { x: data.x, y: data.y }
        }));
      };

    const addComponent = () => {
        setJoueurs([...joueurs, {player:<Joueur key={joueurs.length} parent={terrainRef}/>}]);
        console.log(joueurs)
    };

    const handlePositionUpdate = (id: string, position: Position) => {
        setPositions({ ...positions, [id]: position });
      };
    
    
    return (
        <div className="col-start-2 col-end-6 row-start-2 row-end-7 border-solid border-black border-8 grid grid-cols-10 grid-rows-10 relative" ref={terrainRef}>
            {joueurs.map((joueur, index) => (
                <div key={index}>{joueur.player}</div>
            ))}
            <img id="Div_Edition" src="src/assets/terrain_foot.svg" alt="image terrain de foot" className="col-start-3 row-start-2 col-end-9 h-auto w-auto"/>
            <button className="border-solid border-4 border-blue-500 row-start-10 col-start-3" onClick={addComponent}>Créé un Joueur</button>
            <button className="row-start-10 col-start-8 border-solid border-4 border-blue-500">Sauvegarder</button>
        </div>
        
    )

}

export default Terrain