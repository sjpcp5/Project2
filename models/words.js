/* eslint-disable no-unused-vars */
module.exports = function(sequelize, DataTypes) {
  var Words = sequelize.define("words", {
    // The email cannot be null, and must be a proper email before creation
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          ["easy", "medium", "hard"]
        ],
      },
    },
    words: { // user name  cannot be null and must be unique
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true,
        len: [1, 20],
      },

    },
    // The password cannot be null
    letterCount: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  }, {
    freezeTableName: true, //model table name will be the same as the model name

  });
  Words.beforeUpsert(async function(words, options) {
    let phraseLength = await words.split(" ").filter(c => /\w/.test(c)).length;
    words.letterCount = phraseLength;
  }, {
    catch (error) {
      console.log(error);
    }
  });

  return Words;
};