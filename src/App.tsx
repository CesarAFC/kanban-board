import {Toaster} from 'react-hot-toast'
import CreateTask from './components/CreateTask';
import { useTaskStore } from './store/task';
import {DndContext} from '@dnd-kit/core'
import SingleTask from './components/SingleTask';

function App() {

  const tasks = useTaskStore(store => store.taskStore)

  return (
    <>
      <DndContext>
        <div className="bg-slate-300 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
          <CreateTask />
          {tasks.map((task) => (
            <SingleTask task={task} />
          ))}
        </div>
        <Toaster />
      </DndContext>
    </>
  );
}

export default App