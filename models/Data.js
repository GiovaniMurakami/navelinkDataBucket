const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = require("./User");

const Data = db.define("Data", {
    username: {
        type: DataTypes.STRING,
        require: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    },
    link: {
        type: DataTypes.STRING,
        require: true,
    },
    description: {
        type: DataTypes.STRING,
        require: true,
    },
});

Data.belongsTo(User);
User.hasMany(Data);

module.exports = Data;
