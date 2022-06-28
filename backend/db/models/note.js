'use strict';
module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define('Note', {
    author_id: DataTypes.INTEGER,
    notebook_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  note.associate = function(models) {

    note.belongsTo(models.User, {
      foreignKey: 'author_id',
      onDelete: 'CASCADE'
    });

    note.belongsTo(models.Notebook, {
      foreignKey: 'notebook_id',
      onDelete: 'CASCADE'
    });
    
  };
  return note;
};
