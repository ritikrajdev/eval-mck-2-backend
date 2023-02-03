const joi = require('joi');
const { HttpError } = require('../../errors');

module.exports = {
  handleErrors(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    
    console.error(err);
    switch (err.constructor) {
    case joi.ValidationError: {
      return res.status(400).json({message: err.message});
    }
    case HttpError: {
      return res.status(err.code).json({message: err.message});
    }
    default: {
      return res.status(500).json({message: 'Something unexpected happened'});
    }
    }
  }
};