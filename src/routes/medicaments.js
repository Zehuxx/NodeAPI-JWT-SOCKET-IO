const { Router } = require('express');
const {authValidate} = require('../middleware/jwtAuth');
const {createMedicament, getAllMedicaments, getMedicamentById, updateMedicament, deleteMedicament} = require('../controllers/medicaments')
const medicamentValidator = require('../validators/medicaments');
const router = Router();

router.get('/', authValidate, getAllMedicaments);
router.post('/create/', [authValidate, medicamentValidator.create], createMedicament);
router.get('/:id', authValidate, getMedicamentById);
router.put('/update/:id', [authValidate, medicamentValidator.update], updateMedicament);
router.delete('/:id', authValidate, deleteMedicament);

module.exports = router;