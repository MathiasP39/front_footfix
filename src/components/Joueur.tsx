import { useEffect, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

interface JoueurInput {
    parent: React.RefObject<HTMLDivElement>
    id: number
    handle: (id: number, data: DraggableData) => void;
}


function Joueur ({id,parent,handle}:JoueurInput) {

  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | null>(null);

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
    defaultPosition={{x: 560, y: 255}}
    grid={[1, 1]}
    scale={1}
    bounds={bounds || undefined}
    onStop={(_e,data) => handle(id,data)}>
    <div className='handle h-7 bg-black w-7 cursor-all-scroll rounded-full absolute left-0 top-0'/>
    </Draggable> 
)
}

export default Joueur
