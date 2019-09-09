import React, { Component } from 'react'
import Nav from './components/Nav';
import routes from './routes'

class App extends Component {

  constructor() {
    super()

    this.state = {
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {/* {
          this.props.location.pathname === '/' ? null : <Nav />
        } */}
        <Nav />
        { routes }
      </div>
    )
  }
}

export default App