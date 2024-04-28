const validate = (params) => (req, res, next) => {
    const body = req.body;
    const missingParams = params.filter(param => !body[param]);
  
    if (missingParams.length > 0) {
      return res.status(400).json({ message: `Please provide ${missingParams.join(', ')}` });
    }

    next();
  };
  
  module.exports = {
    validate,
  };
  