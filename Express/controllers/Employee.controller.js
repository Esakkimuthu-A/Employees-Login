const Department = require('../models').department;
const Role = require('../models').role;
const Employee = require('../models').employee;
const EmpAdd = require('../models').employeecontact;
const MaritalStatus =require('../models').maritalstatus;
const Gender =require('../models').gender;
const superbaseImage =require('../utils/image-upload');

// const Contact =require('../models').employeecontact

// const getEmployee = async function (req, res) {
//   let [err, departments] = await to(Department.findAll());
//   if (err) ReE(res, err, 422);
//   return ReS(res, { departments });
// }

// module.exports.getEmployee = getEmployee;

// const getEmp = async function (req, res) {
//   let err;
//   [err, datas] = await to(Department.findAll());
//   if (err) ReE(res, err, 422);
//   if (datas) ReS(res, datas, 200);
// }

// module.exports.getEmp = getEmp;

//get all Employees details api call
const getAllEmployeeDetails = async function (req, res) {
  let err;
  [err, AllEmployeeDetailes] = await to(Employee.findAll({
    include:[
      {model:Role}
    ]
  }));
  if (err) ReE(res, err, 422);
  if (AllEmployeeDetailes) ReS(res, { AllEmployeeDetailes })
}
module.exports.getAllEmployeeDetails = getAllEmployeeDetails;

//get Maritalstatus api call
const getMaritalstatus =async function (req,res){
  let [err, marital] =await to(MaritalStatus.findAll());
  if(err) ReE(res, err, 422);
  if(marital) ReS(res,{ marital });
}
module.exports.getMaritalstatus = getMaritalstatus;


const getGender  =async function (req,res){
  let [err, gender] =await to(Gender.findAll());
  if(err) ReE(res, err, 422);
  if(gender) ReS(res,{ gender });
}
module.exports.getGender = getGender;

//get Department api call
const getDepartment = async function (req, res) {
  let err;
  [err, department] = await to(Department.findAll());
  if (err) ReE(res, err, 422);
  if (department) ReS(res, { department });
}
module.exports.getDepartment = getDepartment;

//get role api call
const getRoll = async function (req, res) {
  [err, role] = await to(Role.findAll());
  if (err) ReE(res, err, 422);
  if (role) ReS(res, { role });
}
module.exports.getRoll = getRoll;

//create Employee api call
const createEmployee = async function (req, res) {
  let body;
  body = req.body;
  if(body.isImage){
    const finalImage = await superbaseImage(body.addImage);
    if(finalImage){
      delete body.isImage;
      body.addImage=finalImage;
        [err, addEmploye] = await to(Employee.create(body));
        if (addEmploye) {
          for (let i = 0; i < req.body.contact.length; i++) {
            req.body.contact[i]['employeeId'] = addEmploye.dataValues.id;
            [err, empData] = await to(EmpAdd.create(req.body.contact[i]));
          if (err) return ReE(res, err, 422);
          }
        }
        if (err) ReE(res, err, 422);
        if (addEmploye) ReS(res, addEmploye, 200);
    }
  }

}
module.exports.createEmployee = createEmployee;


//get One Employee Details
const getEmployeeDetailes = async function (req, res) {
  let err;
  body = req.body;
  [err, EmpDetailes] = await to(Employee.findOne({
    where: {
      id: body.id
    },
    include: [
      { model: Role },
      { model: Department },
      { model: MaritalStatus },
      { model: Gender },
      { model: EmpAdd }
    ]
  }
  ));
  if (err) ReE(res, err, 422)
  if (EmpDetailes) ReS(res, { EmpDetailes });
}
module.exports.getEmployeeDetailes = getEmployeeDetailes;
const deleteEmployee= async function(req,res){
  let err;
  body=req.body.id;
  [err,deleteData]=await to(Employee.destroy({
    where:{
      id : body
    }
  }));
  if(err) ReE(res,err,422);
  if(deleteData) ReS(res,{deleteData});
}
module.exports.deleteEmployee=deleteEmployee;

const editEmployee=async function(req,res){
  body=req.body;
  [err,EditEmployee]=await to(Employee.update(body,{
    where:{
      id:body.id
    }
  }));
  for(let i=0;i<this.body.employeecontacts.length;i++){
    [err,updateContact]=await to(EmpAdd.update(body.employeecontacts[i],{
      where: {
        id: body.employeecontacts[i].id
      }
    }))
  }
  if(err) ReE(res,err,422);
  if(EditEmployee) ReS(res,{EditEmployee});
}
module.exports.editEmployee=editEmployee;
