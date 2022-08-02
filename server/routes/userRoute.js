const express = require('express');
const {signup, signin, googleSignIn}  = require('../controllers/userControlller');
const router = express.Router()


router.post('/signup', signup)
router.post('/signin', signin)
router.post('/googleSignIn', googleSignIn)



module.exports = router