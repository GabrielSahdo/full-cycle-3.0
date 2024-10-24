import { Sequelize } from "npm:sequelize-typescript";

const connection = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
});

console.log(connection);
