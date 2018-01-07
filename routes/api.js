const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user');
const positionControllers = require('../controllers/position');
const candidateControllers = require('../controllers/candidate')
const upload = require("../utils/uploads.js");

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/islogin', userControllers.isLogin);
router.get('/logout', userControllers.logOut);

router.post('/addPosition',upload.single('logo'),positionControllers.addPosition);
router.get('/getPositionList', positionControllers.getPositionList);
router.get('/removePosition', positionControllers.removePosition);
router.get('/updatePosition', positionControllers.getPosition);
router.post('/updatePositionNew',upload.single('logo'),positionControllers.updatePosition);


router.post('/addCandidate',upload.single('pic'),candidateControllers.addCandidate);
router.get('/getCandidateList', candidateControllers.getCandidateList);
router.get('/removeCandidate', candidateControllers.removeCandidate);
router.get('/updateCandidate', candidateControllers.getCandidate);
router.post('/updateCandidateNew',upload.single('pic'),candidateControllers.updateCandidateNew);
router.get('/salaryChioce', candidateControllers.salaryChioce);
module.exports = router;
