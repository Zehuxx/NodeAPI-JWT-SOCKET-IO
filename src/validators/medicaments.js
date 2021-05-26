const connectionDB  = require('../data/Connection');
const { body, validationResult } = require('express-validator');
// id,
// name,
// type,
// location,
// quantity,
// cost,
// date
const createRules = () => [
    body('id')
    .isInt()
    .withMessage('El campo id debe de ser un valor entero')
    .custom(async(id, { req }) => {
        let {status, data} = connectionDB.readData();
        if (status) {
            let medicament = data.medicaments.find((m)=>m.id === id);
            if (medicament) {
                return Promise.reject('El id ingresado ya existe.');
            }
        }
    }),
    body('name')
    .isLength({ min: 5, max: 40 })
    .withMessage('El nombre del medicamento debe de tener entre 5 y 40 caracteres'),
    body('type')
    .isLength({ min: 5, max: 40 })
    .withMessage('El tipo de medicamento debe de tener entre 5 y 40 caracteres'),
    body('location')
    .isLength({ min: 1, max: 100 })
    .withMessage('La ubicación debe de tener no mas de 100 caracteres'),
    body('quantity')
    .isInt()
    .withMessage('La cantidad de medicamento debe de ser un valor entero'),
    body('cost')
    .isNumeric()
    .withMessage('El costo de medicamento debe de ser un valor numerico'),
    body('date')
    .isISO8601()
    .withMessage('Fecha de adición no tiene un formato ISO8601 YYYY-MM-DD')
    // .custom(date => {
    //     let fundation_date = new Date(date);
    //     let today = new Date();
    //     if (fundation_date > today) {
    //         return Promise.reject('La fecha debe de ser menor o igual a hoy');
    //     }
    // })
]

const updateRules = () => [
    body('id')
    .isInt()
    .withMessage('El campo id debe de ser un valor entero')
    .custom(async(id, { req }) => {
        let {status, data} = connectionDB.readData();
        if (status) {
            let medicament = data.medicaments.find((m)=>m.id === id);
            if (!medicament) {
                return Promise.reject('El id ingresado no existe.');
            }
        }
    }),
    body('name')
    .isLength({ min: 5, max: 40 })
    .withMessage('El nombre del medicamento debe de tener entre 5 y 40 caracteres'),
    body('type')
    .isLength({ min: 5, max: 40 })
    .withMessage('El tipo de medicamento debe de tener entre 5 y 40 caracteres'),
    body('location')
    .isLength({ min: 1, max: 100 })
    .withMessage('La ubicación debe de tener no mas de 100 caracteres'),
    body('quantity')
    .isInt()
    .withMessage('La cantidad de medicamento debe de ser un valor entero'),
    body('cost')
    .isNumeric()
    .withMessage('El costo de medicamento debe de ser un valor numerico'),
    body('date')
    .isISO8601()
    .withMessage('Fecha de adición no tiene un formato ISO8601 YYYY-MM-DD')
    // .custom(date => {
    //     let fundation_date = new Date(date);
    //     let today = new Date();
    //     if (fundation_date > today) {
    //         return Promise.reject('La fecha debe de ser menor o igual a hoy');
    //     }
    // })
]

const ValidateErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


module.exports = {
    create: [createRules(), ValidateErrors],
    update: [updateRules(), ValidateErrors]
}