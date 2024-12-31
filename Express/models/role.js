module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Model.associate = function (models) {
    this.employee = this.hasMany(models.employee);
  };
  return Model;
}