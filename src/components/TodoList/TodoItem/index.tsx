import React, { useEffect, useContext, useState, createRef } from 'react'
import TodoAppContext from 'src/context/TodoAppContext'
import styled from 'styled-components'
import { TodoType } from 'src/typings'

interface IEditState {
  onEdit: boolean
}

export const TodoItem = ({ todo }: { todo: TodoType }) => {
  const { dispatch } = useContext(TodoAppContext)
  const [state, setState] = useState<IEditState>({ onEdit: false })
  // Todo edit text input
  const editInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  useEffect(() => {
    // For focus input element when double clicks text label
    if (state.onEdit === true && editInput.current !== null) {
      editInput.current.focus()
    }
  }, [editInput, state.onEdit])

  const handleTodoTextEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    onEditTodo: TodoType
  ): void => {
    dispatch({
      type: 'EDIT_TODO',
      todo: { ...onEditTodo, content: e.target.value },
    })
  }

  const reverseItemState = (onReverseTodo: TodoType): void => {
    dispatch({
      type: 'REVERSE_TODO_STATE',
      todo: { ...onReverseTodo },
    })
  }

  const removeItem = (onRemoveTodo: TodoType): void => {
    dispatch({
      type: 'REMOVE_TODO',
      todo: { ...onRemoveTodo },
    })
  }

  const onEditClick = (): void => {
    console.log(state.onEdit)
    setState({ onEdit: true })
  }

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      removeItem(todo)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape')
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
  }

  return (
    <Layout>
      <div className="todo-item">
        {/* Todo state checkbox */}
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => reverseItemState(todo)}
        />
        {/* Todo content text */}
        <label
          style={{ display: !state.onEdit ? 'block' : 'none' }}
          className={todo.completed ? 'completed-todo' : ''}
          onDoubleClick={onEditClick}
        >
          {todo.content}
        </label>
        {/* Todo text edit */}
        <input
          ref={editInput}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
          className="text-edit"
          style={{ display: state.onEdit ? 'block' : 'none' }}
          value={todo.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTodoTextEdit(e, todo)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
            submitEditText(e)
          }
        />
        {/* Todo destroy button */}
        {!state.onEdit ? (
          <button className="destroy" onClick={() => removeItem(todo)} />
        ) : null}
      </div>
    </Layout>
  )
}

const Layout = styled.li`
  position: relative;
  border-bottom: 1px solid #80808030;
  &:last-child {
    border-bottom: none;
  }
  /* Todo style */
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;
    padding: 0.6rem 0.4rem;
    .toggle,
    .destroy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      appearance: none;
      outline: none;
      border-radius: 0.2rem;
      padding: 0;
      font-size: 1.2rem;
      color: var(--primary-white-color);
      transition: ease 0.5s;
    }
    .toggle {
      background: var(--primary-white-color);
      &:checked {
        background: var(--primary-foreground-color);
        &::after {
          content: '✔︎';
        }
      }
    }
    .text-edit {
      display: none;
      flex: 1;
      height: inherit;
      margin-left: 2rem;
      padding: 0.25rem 1rem;
      background-color: var(--primary-text-input-bg-color);
      color: var(--primary-white-color);
      font-size: 1.25rem;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: none;
      border-radius: 0.5rem;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      outline: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .destroy {
      display: none;
      border: 0.15rem solid var(--primary-foreground-color);
      background: none;
      outline: none;
      &::after {
        content: '✘';
      }
    }
    label {
      flex: 1;
      margin: 0 2rem;
      font-size: 1.5rem;
      transition: ease 0.5s;
    }
    .completed-todo {
      color: #596069;
      text-decoration: line-through;
    }
    &:hover {
      .destroy {
        display: block;
      }
    }
  }
`

export default TodoItem
