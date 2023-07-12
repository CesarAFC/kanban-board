import { Task } from "../types/taskTypes";

type SingleTask = {
    task: Task
}

function SingleTask({task}: SingleTask) {
  return (
    <div
      className={`bg-slate-100 relative p-4 mt-8 shadow-md rounded-md opacity-100`}
    >
      <h1>{task.name}</h1>
    </div>
  );
}

export default SingleTask