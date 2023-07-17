import { useTaskStore } from "../store/task";
import StatusSingle from "./StatusSingle";

type StatusProps = {
}

function StatusComponent({}: StatusProps) {

    // Different status for the todos
    const taskState = ["todo", "inProgress", "closed"]; 
    const tasksStore = useTaskStore(store => store.taskStore);

    const filterTodosByStatus = (status: string) => {
        return tasksStore.filter((todo) => todo.status === status);
      };

  return (
    <div className="flex gap-16">
      {
      taskState.map( status => {

        const taskFiltered = filterTodosByStatus(status);

        return (
        <StatusSingle key={status} status={status} tasks={taskFiltered} />
        )
        })
      }

    </div>
  );
}

export default StatusComponent