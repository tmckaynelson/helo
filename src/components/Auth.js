import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {updateUser} from '../redux/reducer'

class Auth extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = () => {

        axios.post('/auth/register', this.state)
            .then( response => {
                this.props.updateUser(response.data.id, response.data.username, response.data.profile_pic)
                this.props.history.push('/dashboard')
            })
            .catch( error => {
                console.log(error)
                this.setState({
                    username: '',
                    password: ''
                })
            })
    }

    login = () => {

        axios.post('/auth/login', this.state)
            .then( response => {
                this.props.updateUser(response.data.id, response.data.username, response.data.profile_pic)
                this.props.history.push('/dashboard')
            })
            .catch( error => {
                console.log(error)
                this.setState({
                    username: '',
                    password: ''
                })
            })
    }

    render() {
        return (
            <div>
                <label>Username: </label>
                <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } />
                <label>Password: </label>
                <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } />
                <button onClick={ this.login }>Login</button>
                <button onClick={ this.register }>Register</button>
            </div>
        )
    }
}

export default connect(null, {updateUser})(Auth)