const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodbConnModule = require('./mongodbConnModule')
let db = mongodbConnModule.connect()

let Post = require('../models/post')

const testjson = require('./surveyTestData')

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error) }
    res.send({
      posts: posts
    })
  }).sort({ _id: -1 })
})

app.post('/add_post', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let newPost = new Post({
    title: title,
    description: description
  })

  newPost.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true
    })
  })
})

app.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) { console.error(error) }

    post.title = req.body.title
    post.description = req.body.description
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

app.delete('/posts/:id', (req, res) => {
  Post.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err) {
      res.send(err)
    }
    res.send({
      success: true
    })
  })
})

app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error) }
    res.send(post)
  })
})

app.get('/surveys', (req, res) => {
  res.send(testjson)
})

let port = process.env.PORT || 8081
console.log(port)
app.listen(port, (err) => {
  if (err !== undefined) {
    console.log(`Error on startup http: ${err}`)
  } else {
    console.log(`Listening http on port: ${port}`)
  }
})
