// const express = require('express')
const express = require('..')

const app = express()

/* app.use((req, res, next) => {
  console.log(1)
  setTimeout(() => {
    next()
  }, 2000);
}, (req, res, next) => {
  console.log(2)
  next()
})

app.use((req, res, next) => {
  console.log(3)
  res.end('res')
}) */

// app.use('/', (req, res) => {
//   res.end('/app')
// })

app.get('/', (req, res, next) => {
  console.log('1')
  next()
}, (req, res, next) => {
  console.log('-')
  next()
})

app.get('/', (req, res, next) => {
  console.log('2')
  setTimeout(() => {
    next()
  }, 2000);
})


// app.get('/aaa', (req, res) => {
//   res.end('get aaa')
// })

app.get('/', (req, res) => {
  console.log('3')
  res.end('/ hello world')
})

// app.get('/a*c', (req, res) => {
//   res.end('/a*c')
// })

// app.get('/:a/:c', (req, res, next) => {
//   console.log(req.params)
//   next()
// })

// app.get('/:a/:c', (req, res) => {
//   console.log(req.params)
//   res.end('/:a/:c')
// })

app.listen(3000, () => {
  console.log('server running')
})

console.log(app) 