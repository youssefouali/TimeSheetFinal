const express = require('express');


const phasecontroller =require('../controllers/phase')
const router = express.Router();

router.get('/',  phasecontroller.getPhases);
router.post('/',  phasecontroller.createPhase);
router.get('/:id',  phasecontroller.getPhase);
router.patch('/:id',  phasecontroller.updatePhase);
router.delete('/:id',  phasecontroller.deletePhase);
router.patch('/:id/likePhase',  phasecontroller.likePhase);

module.exports=router;