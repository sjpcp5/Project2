# Project2 Corona Typer
Saphirah Pociluyko, Christopher Wood, Lawrence De Belen, Andrew Myers

## USERSTORY:
AS A young professional, I WANT to better my typing in speed, skill, and accuracy, SO THAT I will be more competitive and more efficient as an employee.

## Corona Typer
Corona Typer is a fast-paced typing game aimed at improving typing speed, skill, and accuracy.

## Motivation
We wanted to create an interactive, fun and yet constructive game with the vision to increase typing skills across age, skill, and vocation.

## Screenshots
![Image Description](https://imgur.com/a/p74bUvC)
![Image Description](https://imgur.com/a/pkfKveP)
![Image Description](https://imgur.com/a/Q14ljfd)

## Code Example
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
      }},
    {freezeTableName: true //model table name will be the same as the model name});

  return Scores;
};

## How to use?
The object of Vaccine Typer is to rid the world of infection by typing as fast and as accurately as possible. Type as many words as you can before time runs out. Answering correctly gives precious seconds back to the player and increases the score counter. How long will you survive?

## Links
https://github.com/sjpcp5/Project2