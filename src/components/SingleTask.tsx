import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities'
import { Task } from "../types/taskTypes";
import { useTaskStore } from "../store/task";
import React from "react";
import {RiDraggable,  RiCloseCircleFill} from 'react-icons/ri'
import { toast } from "react-hot-toast";

type SingleTask = {
    task: Task | any,
    dragOverlay?: any
}

function SingleTask({task}: SingleTask) {

  const removeTask = useTaskStore(state => state.removeTask);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: task.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
  }


  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // e.stopPropagation()
    removeTask(task.id)
    toast('Task deleted', {icon: '💀'})
  }

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      className={`bg-slate-100 relative p-4 shadow-md rounded-md opacity-100 flex justify-between`}
    >
      <h1>{task.name}</h1>
      <div className="flex">
        <button onClick={handleDelete}><RiCloseCircleFill /></button>
        <button  {...listeners}><RiDraggable size={20} /></button>
      </div>
    </div>
  );
}

export default SingleTask
