import React, { useState } from "react";
import { Task } from "../types/taskTypes";
import { useTaskStore } from "../store/task";
import {v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

const initialTask = 
    {
        id: "",
        name: "",
        status: "todo", // inProgess or Closed
    }

function CreateTask() {
    const [task, setTask] = useState<Task>(initialTask);
    const newTask = useTaskStore( state => state.newTask);
     
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(task.name.length < 3) return toast.error('Enter a valid task (More than 3 characters)')

        newTask(task)
        setTask(initialTask);
        toast.success('Task Created!')
    }

    const handleNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,
            id: uuidv4(),
            name: e.target.value,
        })
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-3 outline-none"
        value={task.name}
        onChange={handleNewTask}
      />
      <button
        className="bg-emerald-500 rounded-md px-4 h-12 text-white duration-500 hover:bg-emerald-700"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}

export default CreateTask