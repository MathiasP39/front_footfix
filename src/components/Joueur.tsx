import { useEffect, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

interface JoueurInput {
    parent: React.RefObject<HTMLDivElement>
    id: number
    onStop: (id: number, data: DraggableData) => void;
}

type Position = {
  x: number;
  y: number;
};


const Joueur = ({parent}:JoueurInput) => {
    const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | null>(null);

    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
      if (parent.current) {
        const rect = parent.current.getBoundingClientRect();
        setBounds({
          left: 0,
          top: 0,
          right: rect.width*(97/100) ,
          bottom: rect.height*(93 /100),
        });
      }
    }, [parent]);


    return (
        <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        grid={[1, 1]}
        scale={1}
        bounds={bounds || undefined}>
        <div className='handle h-7 bg-black w-7 cursor-all-scroll rounded-full absolute left-0 top-0'/>
        </Draggable> 
    )
}

export default Joueur
