import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities'
import { Task } from "../types/taskTypes";
import { useTaskStore } from "../store/task";
import { RiDraggable, RiCloseCircleLine, RiEdit2Line, RiCheckboxCircleLine, RiXingLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

type SingleTask = {
    task: Task,
    dragOverlay?: any
}

function SingleTask({task}: SingleTask) {

  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.name);

  const {removeTask, editTask} = useTaskStore(state => state);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: task.id,
    });

    const handleEdit = () => {
      editTask(task.id, newTask)
      setIsEditing(false)
      toast('Task edited', {icon: '🛠️'})
    }

    const inputRef = useRef<HTMLInputElement>(null)

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
  }

  const handleEditChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(target.value)
  }
  const handleFinishEdit = () => {
    handleEdit()
  }

  const handleDelete = () => {
    removeTask(task.id)
    toast('Task deleted', {icon: '💀'})
  }

  const handleSetEdit = () => {
    setIsEditing(true);
  }


  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key == "Enter") {
      handleEdit();
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing])
  

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      className={`bg-slate-100 relative p-4 shadow-md rounded-md opacity-100 flex justify-between`}
    >
      { isEditing ? <input onKeyDown={handleEnter} className="rounded-md outline-none pl-2 transition" ref={inputRef} value={newTask} onChange={handleEditChange} /> : <h3>{task.name}</h3>}
      <div className="flex gap-1">
        {isEditing && <button onClick={handleFinishEdit} className="rounded-sm transition hover:bg-gray-200"><RiCheckboxCircleLine /></button>}
        {!isEditing && <button onClick={handleSetEdit} className="rounded-sm transition hover:bg-gray-200"><RiEdit2Line /></button>}
        {!isEditing && <button onClick={handleDelete} className="rounded-full h-4 mt-1 transition hover:bg-red-200"><RiCloseCircleLine /></button>}
        <button className="rounded-sm transition hover:bg-gray-200"  {...listeners}><RiDraggable size={20} /></button>
      </div>
    </div>
  );
}

export default SingleTask
