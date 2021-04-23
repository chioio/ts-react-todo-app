import { IAppState, LocalStorageKey, initTodos } from 'src/typings'

const LoadAppStateFromLocalStorage = (): IAppState => {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_TODOS
  )

  if (typeof stringifiedJSON === 'string') {
    const LoadedAppData: IAppState = JSON.parse(stringifiedJSON)
    return LoadedAppData
  }

  const initAppData: IAppState = { todos: initTodos }

  return initAppData
}

export { LoadAppStateFromLocalStorage }