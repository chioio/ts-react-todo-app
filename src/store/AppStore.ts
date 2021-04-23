import { IAppState, AppActionType, TodoListType, TodoType } from 'src/typings'

const reducer = (state: IAppState, action: AppActionType) => {
  switch (action.type) {
    case 'NEW_TODO':
      const added: TodoListType = [action.todo, ...state.todos]
      return {
        ...state,
        todos: added,
      }
    case 'EDIT_TODO':
      const edited: TodoListType = state.todos.map(
        (t: TodoType): TodoType => {
          if (t.id === action.todo.id) {
            return { ...t, content: action.todo.content }
          } else {
            return t
          }
        }
      )
      return {
        ...state,
        todos: edited,
      }
    case 'REMOVE_TODO':
      const removed: TodoListType = state.todos.filter(
        (t: TodoType): boolean => t.id !== action.todo.id
      )
      return {
        ...state,
        todos: removed,
      }
    case 'REVERSE_TODO_STATE':
      const toggled: TodoListType = state.todos.map(
        (t: TodoType): TodoType => {
          if (t.id === action.todo.id) {
            return { ...t, completed: !t.completed }
          } else {
            return t
          }
        }
      )
      return {
        ...state,
        todos: toggled,
      }
    case 'REVERSE_ALL_STATE':
      const isAllCompleted = state.todos.every((t: TodoType) => t.completed)
      const toggledAll: TodoListType = state.todos.map(
        (t: TodoType): TodoType => ({ ...t, completed: !isAllCompleted })
      )
      return {
        ...state,
        todos: toggledAll,
      }
    case 'REMOVE_COMPLETED':
      const completed: TodoListType = state.todos.filter(
        (t: TodoType) => !t.completed
      )
      return {
        ...state,
        todos: completed,
      }
    case 'REMOVE_ALL':
      return {
        ...state,
        todos: [],
      }
    default:
      throw new Error()
  }
}

export default reducer
