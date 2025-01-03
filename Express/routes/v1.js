var express = require('express');
var router = express.Router();
var Controller=require('../controllers/Employee.controller');
var UserAccount=require('../controllers/UserAccount.controller');

router.post('/login',UserAccount.loginForm);
router.post('/changePassword',UserAccount.forgetPassowrd);
router.post('/createEmployee',Controller.createEmployee);
router.post('/getEmployeeDetailes',Controller.getEmployeeDetailes);
router.post('/deleteEmployee',Controller.deleteEmployee);
router.post('/editEmployee',Controller.editEmployee);

router.get('/getDepartment',Controller.getDepartment);
router.get('/getRole',Controller.getRoll);
router.get('/getMaritalstatus',Controller.getMaritalstatus);
router.get('/getGender',Controller.getGender);
router.get('/getAllEmployeeDetails',Controller.getAllEmployeeDetails);
router.get('/getEmplotyeeCount',Controller.getAllEmployeeCount)

module.exports = router;
