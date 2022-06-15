module.exports = function notFoundMiddleware(req, res) {
    res.status(404).send('Route does not exits')
}
      