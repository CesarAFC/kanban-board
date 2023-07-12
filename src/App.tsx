import {Toaster} from 'react-hot-toast'
import CreateTask from './components/CreateTask';
import { useTaskStore } from './store/task';
import {DndContext} from '@dnd-kit/core'
import SingleTask from './components/SingleTask';
import StatusComponent from './components/StatusComponent';

function App() {

  const tasks = useTaskStore(store => store.taskStore)
  console.log(tasks)

  return (
    <>
      <DndContext>
        <div className="bg-slate-300 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
          <CreateTask />
          <StatusComponent />
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