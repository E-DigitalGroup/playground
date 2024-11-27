const _ = require('lodash');

function convertFalsyToNull(obj) {
  if (_.isArray(obj)) {
    return obj.map(item => convertFalsyToNull(item));
  }
  if (_.isObject(obj) && !_.isArray(obj)) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!obj[key]) {
          obj[key] = null;
        }
      }
    }
    return obj;
  }
  return obj;
}

// Middleware function for validation
export const validatorMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = convertFalsyToNull(req.body);
      if (_.isArray(req.body)) {
        await Promise.all(req.body.map(item => schema.validateAsync(item)));
      } else if (_.isObject(req.body)) {
        await schema.validateAsync(req.body);
      } else {
        return res.status(422).json({ message: 'Validation error' });
      }

      next();
    } catch (error) {
      return res.status(422).json({ message: 'Validation error', details: error.details });
    }
  };
};
