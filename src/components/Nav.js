import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {

    

    render() {
        return (
            <div>
                <div>
                    <img src={ this.props.profile_pic} alt='robot' />
                    <p>{ this.props.username }</p>
                </div>
                <Link to="/dashboard"><button>Home</button></Link>
                <Link to="/new"><button>New Post</button></Link>
                <Link to="/"><button>Logout</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Nav)