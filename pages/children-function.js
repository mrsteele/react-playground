import { Component, StrictMode } from 'react'

class LoadSomething extends Component {
  state = {
    loaded: false
  }

  static defaultProps = {
    ttl: 2000
  }

  componentDidMount () {
    this.load()
  }

  load = () => {
    this.setState({ loaded: false })
    window.setTimeout(() => {
      console.log('loaded')
      this.setState({ loaded: true })
    }, this.props.ttl)
  }

  render () {
    const { loaded } = this.state
    const { children } = this.props

    return (
      <div>
        {children(loaded)}
        {loaded && <button onClick={this.load}>Reload</button>}
      </div>
    )
  }
}

const Page = () => (
  <StrictMode>
    <LoadSomething>
      {loaded => loaded ? <div>This is loaded</div> : <div>loading...</div>}
    </LoadSomething>
    <LoadSomething ttl={1000}>
      {loaded => loaded ? <div>Finally loaded</div> : <div>this is loading...</div>}
    </LoadSomething>
    <LoadSomething children={loaded => loaded ? <div>children loaded</div> : <div>loading children...</div>} />
  </StrictMode>
)

export default Page
