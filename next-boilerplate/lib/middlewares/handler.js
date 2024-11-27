const execMiddleware = async (
  req,
  res,
  middleware,
  index = 0,
) => {
  if (res.headersSent || !middleware[index]) return
  if (typeof middleware[index] !== 'function') {
    res.status(500).end('Middleware must be a function!')
    throw new Error('Middleware must be a function!')
  }
  await middleware[index](req, res, async () => {
    await execMiddleware(req, res, middleware, index + 1)
  })
}

export const handler =
  (...middleware) =>
    async (req, res) => {
      await execMiddleware(req, res, middleware)
    }