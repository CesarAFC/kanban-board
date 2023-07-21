// type StatusTask = 'todo' | 'inProgress' | 'closed' | 'testing';
// type PriorityTask = 'low' | 'medium' | 'high';


export interface Task {
    id: string
    name: string
    status: string //StatusTask
    // new feature
    description?: string
    priority: string //PriorityTask
}