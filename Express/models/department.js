

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('department', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
  Model.associate = function (models) {
    this.employee = this.hasMany(models.employee);
  };
  return Model;
};