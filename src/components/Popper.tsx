import { useState } from 'react';
import { usePopper } from 'react-popper';
import { useModal } from '../hooks/useModal';
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { useTaskStore } from '../store/task';
import { arrow } from '@popperjs/core';

enum IconType {
    low = 'low',
    mid = 'mid',
    high = 'high',
  }
interface MyComponentProps {
    priority: IconType;
  }

const ProprityIcon = ({priority}: MyComponentProps) => {

    if (priority === 'high') {
        return <FcHighPriority />;
      } else if (priority === 'mid') {
        return <FcMediumPriority />;
      } else {
        return <FcLowPriority />; // Return null for any other or unknown status
      }
    };


type popperTypes = {
    priority: string,
    id: string
}
const Popper = ({priority, id}: popperTypes) => {
  const [isOpen, toogleMenu] = useModal(false)
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [arrow]
  });

  const {changePriority} = useTaskStore(state => state)

  const handlePriorityChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    changePriority(id, event.currentTarget.value)
    toogleMenu();
  }

  return (
    <div>
      <button
      className='p-2 transition hover:bg-slate-400 rounded-md' 
        onClick={toogleMenu}
        type="button"
        ref={setReferenceElement as any}
      >
        <ProprityIcon priority={IconType[priority as keyof typeof IconType]} />
      </button>

      <div
        ref={setPopperElement as any}
        style={styles.popper}
        {...attributes.popper}
        className={`${isOpen ? "flex" : "hidden"} z-50 gap-2 p-2 bg-slate-300 flex-wrap rounded-md text-sm font-medium shadow-md`}
      >
        <button value='high' onClick={handlePriorityChange} className="disabled:text-slate-400 hover:bg-slate-400 px-1 rounded-sm transition">
          High
        </button>
        <button value='low' onClick={handlePriorityChange} className="hover:bg-slate-400 px-1 rounded-sm transition">
          Low
        </button>
        <button value='mid' onClick={handlePriorityChange} className="hover:bg-slate-400 px-1 rounded-sm transition">
          Mid
        </button>
      </div>
    </div>
  );
};

export default Popper