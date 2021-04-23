import React, { useState, useContext, ReactElement } from 'react'
import AppContext from 'src/context/TodoAppContext'
import TodoItem from './TodoItem'
import styled from 'styled-components'
import { TodoType } from 'src/typings'

enum Filters {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
interface IFilterState {
  filter: string
}

const TodoList: React.FC = () => {
  const { appContext, dispatch } = useContext(AppContext)

  const [state, setState] = useState<IFilterState>({
    filter: Filters.ALL,
  })

  const isAllCompleted = appContext.todos.every(
    (t: TodoType): boolean => t.completed
  )
  const isHavingCompleted = appContext.todos.every(
    (t: TodoType): boolean => !t.completed
  )

  const reverseAllItemState = (): void => {
    dispatch({
      type: 'REVERSE_ALL_STATE',
    })
  }

  const clearAllItem = (): void => {
    dispatch({
      type: 'REMOVE_ALL',
    })
  }

  const clearCompleted = (): void => {
    dispatch({
      type: 'REMOVE_COMPLETED',
    })
  }

  const FiltersButton: React.FC = () => {
    return (
      <div className="filters">
        <button
          className={state.filter === Filters.ALL ? 'active' : ''}
          onClick={() => setState({ filter: Filters.ALL })}
        >
          All
        </button>
        <button
          className={state.filter === Filters.ACTIVE ? 'active' : ''}
          onClick={() => setState({ filter: Filters.ACTIVE })}
        >
          Active
        </button>
        <button
          className={state.filter === Filters.COMPLETED ? 'active' : ''}
          onClick={() => setState({ filter: Filters.COMPLETED })}
        >
          Completed
        </button>
      </div>
    )
  }

  return (
    <Layout>
      {/* Top Features  */}
      <div className="top-features">
        <button
          onClick={reverseAllItemState}
          disabled={appContext.todos.length === 0}
        >
          {isAllCompleted ? 'Active All ' : 'Complete All'}
        </button>
        {/* Filters */}
        <div className="center">
          {appContext.todos.length > 0 ? <FiltersButton /> : null}
        </div>
        <button
          onClick={clearAllItem}
          disabled={appContext.todos.length === 0}
        >
          Clear All
        </button>
      </div>
      {/* Todo Item List */}
      <ul className="todo-list">
        {appContext.todos
          .filter((todo: TodoType): boolean => {
            switch (state.filter) {
              case Filters.ALL:
                return true
              case Filters.ACTIVE:
                return todo.completed === false
              case Filters.COMPLETED:
                return todo.completed === true
              default:
                return true
            }
          })
          .map(
            (todo: TodoType): ReactElement => {
              return <TodoItem key={todo.id} todo={todo} />
            }
          )}
      </ul>
      {/* Bottom Features */}
      <div className="bottom-features">
        <span>
          {
            appContext.todos.filter(
              (t: TodoType): boolean => t.completed === false
            ).length
          }{' '}
          items left
        </span>
        <button
          disabled={isHavingCompleted}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </div>
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  max-height: 50vh;
  overflow: scroll;
  min-height: 1rem;
  border-radius: 0.5rem;
  background-color: #353941;
  color: #dfdfdf;
  margin: 1rem 0;
  box-sizing: border-box;
  .top-features,
  .bottom-features {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0.4rem 1rem;
    background-color: #3d414a80;
    backdrop-filter: blur(5px);
    font-size: 0.8rem;
    user-select: none;
    button {
      background: none;
      outline: none;
      border: none;
      color: #dfdfdf;
      font-weight: bold;
      &:disabled {
        color: #4f5156;
      }
    }
  }
  .top-features {
    margin: 0;
    button {
      width: 6rem;
    }
    .center {
      height: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      &::before {
        content: '';
        width: 3.5rem;
        height: 0.4rem;
        background-color: var(--primary-color);
        box-shadow: 0 1px 1px #333740;
        border-radius: 0.2rem;
      }
      .filters {
        display: flex;
        justify-content: space-around;
        button {
          width: 4.8rem;
        }
        .active {
          border-bottom: var(--primary-foreground-color) solid 0.2rem;
        }
      }
    }
  }
  .todo-list {
    list-style: none;
    padding: 0 1.2rem;
  }
`

export default TodoList
