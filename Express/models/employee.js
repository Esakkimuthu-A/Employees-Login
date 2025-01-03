const Crypto = require('crypto');
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoService = require('../service/crypto.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alternateEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genderId :{
       type:DataTypes.INTEGER,
       allowNull:false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maritalstatusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateOfJoining: {
      type: DataTypes.DATE,
      allowNull: false
    },
    addImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: DataTypes.STRING

  });

  Model.associate = function (models) {
    this.roleId = this.belongsTo(models.role);
    this.departmentId = this.belongsTo(models.department);
    this.maritalstatusId = this.belongsTo(models.maritalstatus);
    this.genderId = this.belongsTo(models.gender);
    this.employeecontact = this.hasMany(models.employeecontact);

  };

  Model.beforeSave(async (user, options) => {
    let err;
    // console.log('data',user.changed('password'));
    if (user.changed('password')) {
      let salt, hash;
      let rounds = Crypto.randomInt(4, 10);
      // console.log('rounds',rounds);
      [err, salt] = await to(Bcrypt.genSalt(rounds));
      if (err) {
        console.log('error in encryption in user account' + err.message);
      }
      // console.log('salt',salt);
      [err, hash] = await to(Bcrypt.hash(user.password, salt));
      // console.log('hash',hash);
      if (err) {
        console.log('error in hash method in encryption' + err.message);
      }

      user.password = hash;
    }
  })

  Model.prototype.comparePassword = async function (pw) {
    console.log('compare password');
    let err, pass
    if (!this.password) TE(ERROR.password_notset);

    //Password verification
    [err, pass] = await to(Bcrypt.compare(pw, this.password));
    // console.log("pass", pass);
    // console.log("err", err);
    if (err) TE(err);

    if (!pass) TE(ERROR.invalid_credentials);

    return this;


  };

  //Instance level methods to get the jsonWebToken
  Model.prototype.getJWT = async function () {
    let err, encryptedToken;
    //return the signature for given payload and secretkey
    const token = "Bearer " + jwt.sign({
      id: this.id,
      email: this.email
    }, CONFIG.jwt_encryption, { expiresIn: CONFIG.jwt_expiration });
    // console.log('Token: ', token);
    [err, encryptedToken] = await to(cryptoService.encrypt(token));
    // console.log('encryptedToken',encryptedToken);
    if (err) TE(err);
    return encryptedToken;
    // return token;
  };

  return Model;
}