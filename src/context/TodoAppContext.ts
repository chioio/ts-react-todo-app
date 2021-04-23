import { createContext, Dispatch } from 'react'
import { IAppState, AppActionType } from 'src/typings'
import { LoadAppStateFromLocalStorage } from 'src/utils'

export interface TodoAppContextProps {
  appContext: IAppState,
  dispatch: Dispatch<AppActionType>
}

export const todoAppContextDefault: TodoAppContextProps = {
  appContext: LoadAppStateFromLocalStorage(),
  dispatch: () => {}
}

export default createContext<TodoAppContextProps>(todoAppContextDefault)
