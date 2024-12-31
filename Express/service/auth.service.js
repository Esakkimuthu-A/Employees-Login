const validator = require('validator');
const Employee = require('../models').employee;
const Crypto = require('crypto');
const Bcrypt = require('bcrypt');

const authUser=async function(userAccountInfo){
  let emailId = userAccountInfo.email;
  let user;
  if (validator.isEmail(emailId)) {
    [err, user] = await to(Employee.findOne({
      where: {
        email: emailId,
      },
    }));
    if (err) TE(err.message);
    if (!user) {
      TE(ERROR.invalid_credentials);
    }
  } else {
    TE(ERROR.invalid_email);
  } 
  [err, user] = await to(user.comparePassword(userAccountInfo.password));

  if (err) TE(err.message);
  return user;
  

}
module.exports.authUser=authUser;


const changePassword =async function(userPassword){
    let err;
    const rounds=Crypto.randomInt(4, 10);
    [err, salt] = await to(Bcrypt.genSalt(rounds));
    if (err) {
      console.log('change Password not encrpted' + err.message);
    }
    [err, hash] = await to(Bcrypt.hash(userPassword.password, salt));
    if (err) {
      console.log('change Password not encrpted' + err.message);
    }
    [err,updatePassword]=await to(Employee.update(
      {password : hash },
      {where :{id:userPassword.id}}
    ));
    if(err) return err; 
    if (updatePassword) return updatePassword[0];
}
module.exports.changePassword = changePassword;

