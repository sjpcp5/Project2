module.exports = function(sequelize, DataTypes) {
  var Scores = sequelize.define(
    "Scores",
    {
      // The email cannot be null, and must be a proper email before creation
      player: {
        type: DataTypes.STRING,
        allowNull: false
      },
      score: {
        // user name  cannot be null and must be unique
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [1, 1000]
        }
      }
    },
    {
      freezeTableName: true //model table name will be the same as the model name
    }
  );

  return Scores;
};
