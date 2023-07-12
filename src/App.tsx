import {Toaster} from 'react-hot-toast'
import CreateTask from './components/CreateTask';
import {DndContext, closestCenter} from '@dnd-kit/core'
import StatusComponent from './components/StatusComponent';

function App() {
  
  const handleDragEnd = () => {}

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

        <div className="bg-slate-300 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
          <CreateTask />
          <StatusComponent />
        </div>
        
        <Toaster />
      </DndContext>
    </>
  );
}

export default App