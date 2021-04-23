export type TodoType = {
  id: number
  content: string
  completed: boolean
}

export type TodoListType = TodoType[]

export type AppActionType =
  | {
      type: 'NEW_TODO'
      todo: TodoType
    }
  | {
      type: 'EDIT_TODO'
      todo: TodoType
    }
  | {
      type: 'REMOVE_TODO'
      todo: TodoType
    }
  | {
      type: 'REVERSE_TODO_STATE'
      todo: TodoType
    }
  | {
      type: 'REVERSE_ALL_STATE'
    }
  | {
      type: 'REMOVE_COMPLETED'
    }
  | {
      type: 'REMOVE_ALL'
    }

export interface IAppState {
  todos: TodoListType
}

export enum LocalStorageKey {
  APP_TODOS = 'TODOS',
}

export const initTodos: TodoListType = [
  {
    id: 1,
    content: 'Using CRA create Todo app',
    completed: true,
  },
  {
    id: 2,
    content: 'TypeScript & React Hooks',
    completed: true,
  },
  {
    id: 3,
    content: 'Reducer & Context API',
    completed: false,
  },
  {
    id: 4,
    content: 'Custom Hooks',
    completed: false,
  },
  {
    id: 5,
    content: '...',
    completed: false,
  },
]
