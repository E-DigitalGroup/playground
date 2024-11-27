const sendResponse = async (req, res, next, statusCode, data) => {
  if (statusCode >= 500) {
    return res.status(statusCode).json(data);
  }

  return res.status(statusCode).json(data);
};


export const resMiddleware = async (req, res, next) => {
  req.sendResponse = sendResponse.bind(null, req, res, next);
  next()
};