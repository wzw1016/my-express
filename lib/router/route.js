const methods = require('methods')
const Layer = require('./layer')

function Route() {
  /**
   * [
   *   Layer: { path, method, handler }
   * ]
   */
  this.stack = []
}

Route.prototype.dispatch = function dispatch(req, res, out) {
  const method = req.method.toLowerCase()
  let index = 0
  const next = () => {
    const layer = this.stack[index++]
    if (!layer) return out()
    if (layer.method == method) {
      return layer.handler(req, res, next)
    }
    next()
  }
  next()
}

methods.forEach(method => {
  Route.prototype[method] = function (path, handlers) {
    handlers.forEach(handler => {
      const layer = new Layer(path, handler)
      layer.method = method
      this.stack.push(layer)
    })
  }
})

module.exports = Route