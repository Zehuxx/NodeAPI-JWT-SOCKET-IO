const jwt = require('jsonwebtoken');
const {key} = require('../config/config');

let userAuth = async(req, res) => {
    try {
        let {user, password} = req.body;
        if(user === "test" && password === "test") {
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, key, {
                expiresIn: '7d'
            });
            res.json({
                message: 'Autenticación correcta',
                token: token
            });
        } else {
            res.json({ message: "Usuario o contraseña incorrectos"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor." });
    }
}

module.exports = {
    userAuth
}