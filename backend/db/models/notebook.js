'use strict';
module.exports = (sequelize, DataTypes) => {
  const notebook = sequelize.define('Notebook', {
    author_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  notebook.associate = function(models) {
    notebook.belongsTo(models.User, {
      foreignKey: 'author_id',
      onDelete: 'CASCADE'
    });
    notebook.hasMany(models.Note, {
      foreignKey: 'notebook_id',
      onDelete: 'CASCADE'
    });
  };
  return notebook;
};
