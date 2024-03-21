const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("navelinkDataBucket", "root", "Murakam1@", {
    host: "localhost",
    dialect: "mysql",
});

try {
    sequelize.authenticate();
    console.log("mysql ok");
} catch (e) {
    console.log(e);
}

module.exports = sequelize;
