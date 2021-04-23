import styled from 'styled-components'

const Footer = () => {
  return (
    <Layout>
      <div className="app-info">
        <a href="https://github.com/chioio/ts-react-todo-app">Source</a>
        <span>&nbsp;|&nbsp;</span>
        <a>Article</a>
        <span>&nbsp;|&nbsp;</span>
        <a href="https://todomvc.com">TodoMVC</a>
      </div>
      <div className="developer-info">
        <span>Created by&nbsp;</span>
        <a href="https://chioio.tech">Tenn Chio</a>
      </div>
    </Layout>
  )
}

const Layout = styled.footer`
  margin-top: 5rem;
  .app-info,
  .developer-info {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    color: var(--primary-white-color);
    line-height: 1.25rem;
    user-select: none;
    span {
      color: #bfbfbf90;
      font-size: 0.8rem;
    }
    a {
      color: var(--primary-white-color);
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: var(--primary-foreground-color)
      }
    }
  }
  .app-info {
    font-size: 0.8rem;
  }
`

export default Footer
