import { useTaskStore } from "../store/task";
import SingleTask from "./SingleTask";
import StatusHeader from "./StatusHeader"
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'

type StatusProps = {
    status: string
}

function StatusSingle({status}: StatusProps) {

    const tasksStore = useTaskStore(store => store.taskStore);
    console.log(tasksStore)
    const filterTodosByStatus = (status: string) => {
        return tasksStore.filter((todo) => todo.status === status);
      };

  return (
    <div className={`w-72 rounded-md p-2 bg-slate-200`}>
      <StatusHeader header={status} />

      {/* Sortable here I guess */}
      <div className="h-96">
        <SortableContext items={tasksStore} strategy={verticalListSortingStrategy}>
          {filterTodosByStatus(status).map((task) => (
            <SingleTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default StatusSingle