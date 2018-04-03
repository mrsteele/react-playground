import { Component } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  background: #ccc;
  padding: 10px;
  min-height: 100vh;
  font-size: 1.5em;

  &, * {
    box-sizing: border-box;
  }
`

const AppWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: #efefef;
  box-shadow: 0px 0px 10px #00000066;
`

const ItemStyles = css`
  width: 100%;
  border: none;
  background: none;
  outline: none;
  padding: 0.5em 1em;
  font-size: inherit;
`

const Input = styled.input`
  ${ItemStyles}
  ::placeholder {
    color: #ccc;
  }
`

const ItemWrapper = styled.div`
  ${ItemStyles}
  display: flex;
  cursor: pointer;
  transition: all 0.2s ease-out;
  border-top: dashed 2px #ccc;

  div {
    width: 100%;
  }

  &:hover {
    background: #cfcfcf;

    button {
      opacity: 0.5;
    }
  }

  &.completed div {
    opacity: 0.25;
    text-decoration: line-through;
  }

  button {
    opacity: 0;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease-out;
    font-size: 1em;

    &:hover {
      opacity: 1;
      color: red;
    }
  }
`

const Item = ({ children, completed, onClick, onDelete, ...rest }) => (
  <ItemWrapper className={completed ? 'completed' : ''} {...rest}>
    <div onClick={onClick}>{children}</div>
    <button type='button' onClick={onDelete}>&times;</button>
  </ItemWrapper>
)

class App extends Component {
  state = {
    newTodo: '',
    items: {},
    completed: {},
    counter: 0
  }

  addTodo = (e) => {
    e.preventDefault()
    const { items, newTodo, counter } = this.state
    this.setState({
      items: {
        [counter]: newTodo,
        ...items
      },
      newTodo: '',
      counter: counter + 1
    })
  }

  updateNewTodo = (e) => {
    e.preventDefault()
    this.setState({
      newTodo: e.target.value
    })
  }

  delete = (id) => () => {
    const { ...items } = this.state.items
    const { ...completed } = this.state.completed
    delete items[id]
    delete completed[id]
    this.setState({
      items,
      completed
    })
  }

  toggle = (id) => () => {
    const { completed } = this.state
    this.setState({
      completed: {
        ...completed,
        [id]: !completed[id]
      }
    })
  }

  render () {
    const { items, newTodo, completed } = this.state

    return (
      <Wrapper {...this.props}>
        <AppWrapper>
          <form onSubmit={this.addTodo}>
            <Input placeholder='Add new todo and press [enter]' value={newTodo} onChange={this.updateNewTodo} />
          </form>
          {Object.keys(items).map(id => (
            <Item
              key={id}
              completed={completed[id]}
              onClick={this.toggle(id)}
              onDelete={this.delete(id)}
            >{items[id]}</Item>
          ))}
        </AppWrapper>
      </Wrapper>
    )
  }
}

export default App
