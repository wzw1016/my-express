// const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')


function Router() {
  this.stack = []
}

methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    const route = new Route()
    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    layer.method = method
    this.stack.push(layer)
    route[method](path, handlers)
  }
})

Router.prototype.handle = function handle(req, res) {
  const baseURL = `http://${req.headers.host}/`
  const { pathname } = new URL(req.url, baseURL)
  // const method = req.method.toLowerCase()

  let index = 0
  const next = () => {
    const layer = this.stack[index++]
    if (!layer) return res.end(`Can not get ${pathname}`)
    const match = layer.match(pathname)

    // if (match && layer.method == method) {
    if (match) { // 这里可以只判断 path 是否匹配，method 是否匹配可以在 route 内进行 (方便 app.use 使用)
      req.params = req.params || layer.params
      return layer.handler(req, res, next)
    }
    next()
  }

  next()
}

Router.prototype.use = function use(path, handlers) {
  if (typeof path === 'function') {
    handlers.unshift(path)
    path = '/'
  }
  handlers.forEach(handler => {
    const layer = new Layer(path, handler)
    handler.isUseMiddleware = true
    this.stack.push(layer)
  })
}

module.exports = Router