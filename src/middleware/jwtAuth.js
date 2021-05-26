const jwt = require('jsonwebtoken');
const {key} = require('../config/config');

exports.authValidate = (req, res, next) => {
    const token = req.headers['token'];
    if (token) {
      jwt.verify(token, key, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 }
