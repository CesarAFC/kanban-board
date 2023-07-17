import {Toaster} from 'react-hot-toast'
import CreateTask from './components/CreateTask';
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core'
import StatusComponent from './components/StatusComponent';
import { useTaskStore } from './store/task';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import SingleTask from './components/SingleTask';
import { Task } from './types/taskTypes';

function App() {

  const {taskStore, updateIndex, updateTaskState} = useTaskStore(state => state)
  const [activeId, setActiveId] = useState<string | null>();

    // for input methods detection
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    // triggered when dragging starts
    const handleDragStart = (event: DragStartEvent) => {
      const { active } = event;
      setActiveId(active.id as string);
    };

    const handleDragOver = ({active, over}: DragOverEvent) => {

      const overId = over?.id;

      // Por si el item no esta sobre ningun container
      if (!overId) {
          return;
      }
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over?.data.current?.sortable.containerId || over?.id;

      if(activeContainer !== overContainer) {

        updateTaskState(activeId as string, overContainer)
    }
      
    }

    const handleDragCancel = () => {
      setActiveId(null);
    };

  const handleDragEnd = ({active, over}: DragEndEvent) => {

    if (active.id !== over?.id) {
      const oldIndex = taskStore.findIndex((person) => person.id === active.id);
      const newIndex = taskStore.findIndex((person) => person.id === over?.id);
      const newArray = arrayMove(taskStore, oldIndex, newIndex);
      updateIndex(newArray);
    }
  }
  const tastTry = taskStore.find( item => item.id === activeId)

  return (
        <div className="bg-slate-300 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
          <CreateTask />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
          <StatusComponent />

        <DragOverlay
          style={{ transformOrigin: "0 0" }}
          dropAnimation={{
            duration: 500,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {activeId ? <SingleTask task={tastTry} dragOverlay /> : null}
        </DragOverlay>

        <Toaster />
      </DndContext>
      </div>
  );
}

export default App