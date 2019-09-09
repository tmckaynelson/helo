const axios = require('axios')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {

    const { username, password } = req.body
    const db = req.app.get('db')

    const foundUser = await db.get_user([username])

    if(!foundUser[0]) {
        return res.status(401).send('Invalid login')
    }

    if(!bcrypt.compareSync(password, foundUser[0].password)){
        return res.status(401).send('Invalid login')
    }

    delete foundUser[0].password
    req.session.user = foundUser[0]

    return res.status(200).send(foundUser[0])
}

const register = async (req, res) => {

    const { username, password } = req.body

    const db = req.app.get('db')

    const foundUser = await db.get_user([username])
    

    if(foundUser[0]) {
        return res.status(401).send('Username already in use')
    }
    
    const salt = bcrypt.genSaltSync(15)
    const hashPassword = bcrypt.hashSync(password, salt)

    const profilePic = `https://robohash.org/${Math.floor(Math.random()*100000)}`
    
    const newUser = await db.create_user([username, hashPassword, profilePic])

    delete newUser[0].password
    req.session.user = newUser[0]

    return res.status(200).send(newUser[0])
}

const getPosts = async (req, res) => {
    console.log('hit get posts')

    const {self, search} = req.query
    const db = req.app.get('db')

    let post = []

    if(self && !search) {
        posts = await db.get_all_posts()

    }
    else if(!self && !search) {
        posts = await db.get_all_no_self_posts(userId)
    }
    else if(self && search) {
        posts = await db.get_all_search_posts([search])
    }
    else if(!self && search) {
        posts = await db.get_all_no_self_search_posts([userId, search])
    }

    return res.status(200).send(posts)
}

module.exports = {
    login,
    register,
    getPosts
}