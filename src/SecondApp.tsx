import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, useDroppable } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';


const initialState = {
    group1: ["1", "2", "3"],
    group2: ["4", "5", "6"],
    group3: ["7", "8", "9"]
}
interface stateTypes {}
interface StateIterator {
        [key: string]: string[];
}

interface SingleProps {
    item: string
}
function SingleItem({item}: SingleProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id: item });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      };

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} style={style} className='p-4 bg-red-400 rounded-md'>
            <h3>Item: {item}</h3>
        </div>
    )
}


interface ContaninerProps {
    id: string
    items: string[]
}
function TaskContainer({id, items}: ContaninerProps) {
    // id: nombre del container, group1...

    const {isOver, setNodeRef } = useDroppable({
        id,
      });

      const style = {
        backgroundColor: isOver ? 'green' : 'blue',
      };

    return (
      <div className='bg-emerald-300 p-4 w-52 rounded-md'>
        <h1 className='text-center mb-2 uppercase'>{id}</h1>

        <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>

            <div style={style} className="flex flex-col gap-5" ref={setNodeRef}>
            {items.map((item) => (
                <SingleItem item={item} key={item} />
            ))}
            </div>

        </SortableContext>

      </div>
    );
}



function SecondApp() {

    const [itemsGroups, setItemsGroups] = useState<StateIterator>(initialState);
    const [activeId, setActiveId] = useState<string>("");

    const handleDragStart = ({active}: DragStartEvent) => {
        setActiveId(active.id as string)
    }
    const handleDragCancel = () => {
      setActiveId("");
    };
    const handleDragOver = ({active, over}: DragOverEvent) => {
        console.log("### ~ active, over:", active, over);

        const overId = over?.id;
        if (!overId) {
            return;
        }

        // Guardamos los containers de donde sale (activeContainer) 
        // el elemento y el container sobre el que esta (overContainer)
        const activeContainer = active.data.current?.sortable.containerId;
        const overContainer = over?.data.current?.sortable.containerId || over?.id;

        if(activeContainer !== overContainer) {
            setItemsGroups( prevState => {
                const activeIndex = active.data.current?.sortable.index;
                const overIndex =
                  over?.id in prevState
                    ? prevState[overContainer].length + 1
                    : over?.data.current?.sortable.index;
                return moveBetweenContainers(
                    prevState,
                    activeContainer,
                    activeIndex,
                    overContainer,
                    overIndex,
                    active.id as string
                  )
            })
        }

    }
    const handleDragEnd = ({active, over}: DragEndEvent) => {
        if (!over) {
            setActiveId('');
            return;
          }

        if (active.id !== over.id) {
            const activeContainer = active.data.current?.sortable.containerId;
            const overContainer = over.data.current?.sortable.containerId || over.id;
            const activeIndex = active.data.current?.sortable.index;
            const overIndex =
              over.id in itemsGroups
                ? itemsGroups[overContainer].length + 1
                : over.data.current?.sortable.index;
                
            setItemsGroups((prevState) => {
              let newItems: StateIterator;
              if (activeContainer === overContainer) {
                newItems = {
                  ...prevState,
                  [overContainer]: arrayMove(
                    prevState[overContainer],
                    activeIndex,
                    overIndex
                  )
                };
              } else {
                newItems = moveBetweenContainers(
                    prevState,
                  activeContainer,
                  activeIndex,
                  overContainer,
                  overIndex,
                  active.id as string
                );
              }
      
              return newItems;
            });
          }
      
          setActiveId('');
    }

    const removeAtIndex = (array: string[], index: number) => {
        return [...array.slice(0, index), ...array.slice(index + 1)];
      };
      
    const insertAtIndex = (array: string[], index: number, item: string) => {
        return [...array.slice(0, index), item, ...array.slice(index)];
      };

      type itemstocall = {
        [index: number]: string[]
      }
    const moveBetweenContainers = (
        items: itemstocall,
        activeContainer: number,
        activeIndex: number,
        overContainer: number,
        overIndex: number,
        item: string
      ) => {
        return {
          ...items,
          [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
          [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
        };
      };

  return (
    <div className="bg-slate-400 h-screen flex justify-center place-items-center gap-10">
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(itemsGroups).map((group) => (
          <TaskContainer id={group} items={itemsGroups[group]} key={group} />
        ))}
        <DragOverlay>
          {activeId ? <SingleItem item={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default SecondApp

