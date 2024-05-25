import { ChangeEvent, useEffect, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

interface JoueurInput {
    parent: React.RefObject<HTMLDivElement>
    id: number
    handle: (id: number, data: DraggableData) => void;
}


function Joueur ({id,parent,handle}:JoueurInput) {

  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | null>(null);
  const [nom,setNom] = useState("Joueur"+id)

  const handleJoeurNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNom(event.target.value)
  }

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

  return (<div>
    <Draggable
    axis="both"
    handle=".handle"
    defaultPosition={{x: 1010, y: 350}}
    grid={[1, 1]}
    scale={1}
    bounds={bounds || undefined}
    onStop={(_e,data) => handle(id,data)}>
    <div className='absolute left-0 top-0'>
    <textarea className='resize-none relative bottom-5 right-10 text-xs bg-transparent w-[6.5rem] text-center' value={nom} cols={20} rows={1} spellCheck="false" onChange={handleJoeurNameChange}>Nom joueur</textarea>
    <div className='handle h-7 bg-black w-7 cursor-all-scroll rounded-full absolute left-0 top-0'/>
    </div>
    </Draggable> </div>
)
}

export default Joueur
