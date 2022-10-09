const router = require('express').Router();
const { userController } = require('../controllers');
const authenticate = require('../middlewares/authenticate');

const {
  tambahUserRules,
  updateUserRules,
  validate,
} = require('../lib/validator');

// Akun Admin 
router.get('/get_all_admin', authenticate.auth, authenticate.admin, userController.user.dataAdmin);
router.post('/tambah_admin', authenticate.auth, authenticate.admin, tambahUserRules(), validate, userController.user.tambahAdmin);
router.get('/get_admin_byId/:id', authenticate.auth, authenticate.admin, userController.user.dataAdminById);
router.put('/update_data_admin/:id', authenticate.auth, authenticate.admin, updateUserRules(), validate, userController.user.updateAdmin);
router.delete('/delete_admin/:id', authenticate.auth, authenticate.admin, userController.user.deleteAdmin);


// Akun User
router.get('/get_all_customer', authenticate.auth, authenticate.admin, userController.user.dataCustomer);
router.post('/register', tambahUserRules(), validate, userController.user.register);
router.get('/get_customer_byId/:id', authenticate.auth, authenticate.admin, userController.user.dataCustomerById);
router.put('/update_data_customer/:id', authenticate.auth, updateUserRules(), validate, userController.user.updateCustomer);
router.delete('/delete_customer/:id', authenticate.auth, authenticate.admin, userController.user.deleteCustomer);



module.exports = router;