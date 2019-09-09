import React, { Component } from 'react'
import axios from 'axios'

class Dashboard extends Component {

    constructor() {
        super()

        this.state = {
            search: '',
            myPosts: true,
            posts: []
        }
    }

    handleCheckbox = () => {

        this.setState({
            myPosts: !this.state.myPosts
        })
    }

    componentDidMount = () => {
        axios.get(`/api/posts?self=${this.state.myPosts}&search=${this.state.search}`)
            .then( response => {
                console.log('response', response)
                this.setState({
                    posts: response.data
                })
            })
            .catch( error => {
                console.log(error)
            })
    }

    render() {
        console.log(this.state.posts)

        let mappedPosts = this.state.posts.map( (element, index) => {
            return (
                <div key={ index }>
                    <h1>{ element.title }</h1>
                    <p>by {element.username}</p>
                    <img src={element.profile_pic} alt="user pic" />
                </div>
            )
        })

        return (
            <div>
                Dashboard
                <input type="text" name="search" />
                <button>search</button>
                <button>Reset</button>
                <label>My posts</label>
                <input type="checkbox" name="myPosts" checked={ this.state.myPosts } onChange={ this.handleCheckbox } />
                { mappedPosts }
            </div>
        )
    }
}

export default Dashboard