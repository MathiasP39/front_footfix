import { ChangeEvent, useEffect, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { JoueurType } from '../types/Joueur';

type Position = {
  x: number
  y: number
}

function Joueur ({id,parent,handle}:JoueurType & {handle: (id: number, data: DraggableData) => void;}) {

  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | null>(null);
  const [nom,setNom] = useState("Joueur"+id)
  const [parentElement,setParent] = useState<HTMLDivElement>()
  const [position,setPos] = useState<Position>()

  const handleJoeurNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNom(event.target.value)
  }

  useEffect(() => {
    if (parent.current) {
      setParent(parentElement)
      const rect = parent.current.getBoundingClientRect();
      setBounds({
        left: 0,
        top: 0,
        right: rect.width*(97/100) ,
        bottom: rect.height*(93 /100),
      });
    }
  }, [parent,parentElement,position]);

  return (<div>
    <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: (parentElement?.getBoundingClientRect().width ?? 1700)/2 , y: (parentElement?.getBoundingClientRect().height ?? 700)/2}}
    grid={[1, 1]}
    scale={1}
    bounds={bounds || undefined}
    onStop={(_e,data) => handle(id,data)}
    onDrag={(_e,data) => {setPos({x:data.x,y:data.y})}}>
    <div className='absolute left-0 top-0'>
    <textarea className='resize-none relative bottom-5 right-10 text-xs bg-transparent w-[6.5rem] text-center' value={nom} cols={20} rows={1} spellCheck="false" onChange={handleJoeurNameChange}>Nom joueur</textarea>
    <div className='handle h-7 bg-black w-7 cursor-all-scroll rounded-full absolute left-0 top-0'/>
    </div>
    </Draggable> </div>
)
}

export default Joueur
