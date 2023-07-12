import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task } from '../types/taskTypes'

type TaskStore = {
    taskStore: Array<Task>,
    newTask: (task: Task) => void
    removeTask: (id: string) => void
}

export const useTaskStore = create(
    persist<TaskStore>(
        (set) => ({
            taskStore: [],
            newTask: (task) => {
                set( (state) => ({ 
                    taskStore: [...state.taskStore, task] 
                }) )
            },
            removeTask: (id) => {
                set( state => ({
                    taskStore: state.taskStore.filter( task => task.id !== id)
                }) )
            }
            
        }), 
        {name: 'task'}  
    ))

