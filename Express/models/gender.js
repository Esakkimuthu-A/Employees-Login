

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('gender', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
  Model.associate = function (models) {
    this.employee = this.hasMany(models.employee);
  };
  return Model;
};