import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, useDroppable } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';

const myInitialState = [
    {
        id: '333',
        title: 'Title 3',
        description: 'Desc 3',
        status: 'backlog',
      },
      {
        id: '222',
        title: 'Title 2',
        description: 'Desc 2',
        status: 'backlog',
      },
      {
        id: '444',
        title: 'Title 4',
        description: 'Desc 4',
        status: 'inProgress',
      },
      {
        id: '555',
        title: 'Title 5',
        description: 'Desc 5',
        status: 'done',
      },
      {
        id: '666',
        title: 'Title 6',
        description: 'Desc 6',
        status: 'done',
      },
];

type Task = {
    id: string,
    title: string,
    description: string,
    status: string,
}
// interface StateIterator {
//         [key: string]: Task[];
// }

interface SingleProps {
    item: Task | any
}
function SingleItem({item}: SingleProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id: item.id });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      };

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} style={style} className='p-4 bg-red-400 rounded-md'>
            <h3>Item: {item.title}</h3>
        </div>
    )
}


interface ContaninerProps {
    id: string
    items: Task[]
}
function TaskContainer({id, items}: ContaninerProps) {

    const {isOver, setNodeRef } = useDroppable({
        id,
      });

      const style = {
        backgroundColor: isOver ? 'green' : 'blue',
      };

    return (
      <div className='bg-emerald-300 p-4 w-52 rounded-md h-72'>
        <h1 className='text-center mb-2 uppercase'>{id}</h1>

        <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>

            <div style={style} className="flex flex-col gap-5 min-h-full" ref={setNodeRef}>
            {items.map((item) => (
                <SingleItem item={item} key={item.id} />
            ))}
            </div>

        </SortableContext>

      </div>
    );
}



function ThirdApp() {

    const [itemsGroups, setItemsGroups] = useState<Task[]>(myInitialState);
    const [activeId, setActiveId] = useState<string | null>();

    const StatusType = ['backlog','inProgress','done'];

    const filterTodosByStatus = (status: string) => {
        return itemsGroups.filter((todo) => todo.status === status);
      };
      
    const handleDragStart = ({active}: DragStartEvent) => {
        setActiveId(active.id as string)
    }
    const handleDragCancel = () => {
        setActiveId(null)
    }
    const handleDragOver = ({active, over}: DragOverEvent) => {
        console.log("### ~ active:", active);
        console.log("### ~ over:", over);
        
        const overId = over?.id;

        // Por si el item no esta sobre ningun container
        if (!overId) {
            return;
        }

        // Guardamos los containers de donde sale (activeContainer) 
        // el elemento y el container sobre el que esta (overContainer)
        const activeContainer = active.data.current?.sortable.containerId;
        const overContainer = over?.data.current?.sortable.containerId || over?.id;

        if(activeContainer !== overContainer) {
            setItemsGroups( prevState => {
                // const activeIndex = active.data.current?.sortable.index;
                // const overIndex = prevState.findIndex(item => item.id === over?.id);

                const updatedTasks = prevState.map( (task) =>
                task.id === activeId ? { ...task, status: overContainer } : task
              );
              console.log(updatedTasks);

                return updatedTasks
            })
        }
        
    }
    const handleDragEnd = ({active, over}: DragEndEvent) => {
        if (active.id !== over?.id) {

            setItemsGroups((prevState) => {
              // const oldIndex = people.indexOf(active.id);
              // const newIndex = people.indexOf(over.id);
              const oldIndex = prevState.findIndex( person => person.id === active.id);
              const newIndex = prevState.findIndex(person => person.id === over?.id);
              
              return arrayMove(prevState, oldIndex, newIndex);
            });
          }
    }

    const tastTry = itemsGroups.find( item => item.id === activeId)
  return (
    <div className="bg-slate-400 h-screen flex justify-center place-items-center gap-10">
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {StatusType.map((status) => {
          const filteredtask = filterTodosByStatus(status);
          return (
            <TaskContainer id={status} items={filteredtask} key={status} />
          );
        })}
        <DragOverlay>
          {activeId ? <SingleItem item={tastTry} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default ThirdApp;

