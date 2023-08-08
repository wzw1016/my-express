const http = require('http')
const methods = require('methods')
const Router = require('./router')

function App() {
  this._router = new Router()
}

methods.forEach(method => {
  App.prototype[method] = function (path, ...handlers) {
    this._router[method](path, handlers)
  }
})

App.prototype.listen = function listen(...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res)
  })
  server.listen(...args)
}

App.prototype.use = function use(path, ...handlers) {
  this._router.use(path, handlers)
}

module.exports = App