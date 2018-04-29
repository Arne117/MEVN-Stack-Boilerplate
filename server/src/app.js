const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const puppeteer = require('puppeteer')
let HtmlDiffer = require('html-differ').HtmlDiffer
let difLogger = require('html-differ/lib/logger')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodbConnModule = require('./mongodbConnModule')
let db = mongodbConnModule.connect()

let Post = require('../models/post')

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error) }
    res.send({
      posts: posts
    })
  }).sort({_id: -1})
})

app.post('/add_post', (req, res) => {
  let db = req.db
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
  let db = req.db
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
  let db = req.db
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
  let db = req.db
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error) }
    res.send(post)
  })
})

const viewPort = { width: 1280, height: 800 }

let browserV1
let pageV1

async function launch (url) {
  browserV1 = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']}) // {headless: false, devtools: true, slowMo: 100, ignoreHTTPSErrors: true}
  pageV1 = await browserV1.newPage()
  await pageV1.emulate({viewport: viewPort, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'})
  await pageV1.goto(url, { waitUntil: 'load', timeout: 120 * 1000 })
  console.log('loaded')

  let scripts = await findScripts()
  for (let i = 0; i < scripts.length; i++) {
    let el = scripts[i]
    switch (true) {
      case el.includes('bunchbox'):
        console.log('bb')
        break
      case el.includes('visualwebsiteoptimizer'):
        console.log('vwo')
        break
    }
  }
}

// launch('https://www.nivea.de')
launch('https://www.wingo.ch/de/internet')

async function findScripts () {
  let src = await pageV1.evaluate(() => {
    let src = []
    document.querySelectorAll('script').forEach((el) => {
      if (el.src !== '') {
        src.push(el.src)
      }
    })
    return src
  })
  return src
}

async function scrape () {
  let rect = await pageV1.evaluate(() => {
    const {x, y, width, height} = document.querySelector('img').getBoundingClientRect()
    return {left: x, top: y, width, height}
  })

  await pageV1.screenshot({
    path: './public/qr.jpeg',
    type: 'jpeg',
    clip: {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    }
  })
  console.log('end')
  // await browser.close()
}

let port = process.env.PORT || 8081
console.log(port)
app.listen(port, (err) => {
  if (err !== undefined) {
    console.log(`Error on startup http: ${err}`)
  } else {
    console.log(`Listening http on port: ${port}`)
  }
})
