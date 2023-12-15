const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()


app.set('view engine', 'ejs')

app.get('/new', (req, res)=>{
    res.render('users/new', {firstname: "Test"})
})

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { userRouter } = require('./routes/users')
const blogRouter = require('./routes/blogs')
const users = require("./routes/users")


app.use('/users', userRouter)
app.use('/api/blogs',blogRouter)


app.listen(3000)