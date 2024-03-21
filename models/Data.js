const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Data = db.define("data", {
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

module.exports = Data;
