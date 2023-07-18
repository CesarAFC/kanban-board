import { useDroppable } from "@dnd-kit/core";
import SingleTask from "./SingleTask";
import StatusHeader from "./StatusHeader"
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import { Task } from "../types/taskTypes";

type StatusProps = {
    status: string
    tasks: Task[]
}

function StatusSingle({status, tasks}: StatusProps) {

    const {setNodeRef} = useDroppable({id: status});

  return (
    <div className={`w-72 rounded-md p-2 bg-slate-200`}>
      <StatusHeader header={status} count={tasks.length} />

      <SortableContext
        id={status}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-2 h-96 overflow-scroll">
          {tasks.map((task) => (
            <SingleTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default StatusSingle