const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authController = require('../controllers/auth');

router.post('/login', authController.postSignIn);
router.get('/signin', authController.getSignIn);
router.post('/register', upload.single('image'), authController.postRegister);
router.post('/logout', authController.postLoggedOut);

module.exports = router;
