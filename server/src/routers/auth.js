const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');

const { auth }  = require('../controllers');

// Auth
router.post('/login', auth.login);
router.get('/whoami', authenticate.auth, auth.whoami);
router.get('/logout', authenticate.auth, auth.logout);

module.exports = router;
