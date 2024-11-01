const express = require("express");
const app = express();

require("dotenv").config(); // configure envs

const PORT = process.env.PORT || 8319;
const db = require("./models");

app.set("view engine", "ejs"); // Use ejs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // Use public folder
app.use(express.static("node_modules/flowbite/dist")); // Use flowbite
app.use(express.static("node_modules/bootstrap-icons/font")); // Use flowbite
app.use(require("./routes")); // Use routes

console.log("Waiting for database connection...");
db.sequelize
  .sync({ force: false })
  .then(({ options, config }) => {
    console.log(`Database connection sucessfull!`);
    console.table({
      dialect: options.dialect,
      database: config.database,
      database_user: config.username,
      database_host: config.host,
      database_protocol: config.protocol,
      database_port: config.port,
    });
    app.listen(PORT, () => {
      console.log(`Server is Up and Running on http://localhost:${PORT}/`);
    });
  })
  .catch((error) => console.log(error));
