import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task } from '../types/taskTypes'

type TaskStore = {
    taskStore: Array<Task>,
    updateIndex: (newArray: Array<Task>) => void,
    newTask: (task: Task) => void,
    removeTask: (id: string) => void,
    updateTaskState: (taskId: string , newStatus: string) => void
    editTask: (taskId: string , newTask: string) => void
}

export const useTaskStore = create(
    persist<TaskStore>(
        (set) => ({
            taskStore: [],

            updateIndex: (newArray) => {
                set( () => ({
                    taskStore: newArray
                }))
            },

            newTask: (task) => {
                set( (state) => ({ 
                    taskStore: [...state.taskStore, task] 
                }) )
            },
            removeTask: (id) => {
                set( state => ({
                    taskStore: state.taskStore.filter( task => task.id !== id)
                }) )
            },
            updateTaskState: (taskId, newStatus) => {
                //downside: it loops through all the task
                set( state => {
                  const updatedTasks = state.taskStore.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                  );
                  return { taskStore: updatedTasks };
                }
                )
              },
            editTask: (taskId, newTask) => {
                //downside: it loops through all the task
                set( state => {
                  const updatedTasks = state.taskStore.map((task) =>
                    task.id === taskId ? { ...task, name: newTask } : task
                  );
                  return { taskStore: updatedTasks };
                }
                )
              }
            
        }), 
        {name: 'task'}  
    ))

