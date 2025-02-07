const express = require("express");
const session = require("express-session");
const app = express();

require("dotenv").config(); // configure envs

const PORT = process.env.PORT || 8319;
const db = require("./models");
const MemoryStore = require("memorystore")(session);

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs"); // Use ejs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("cookie-parser")());
app.use(express.static("public")); // Use public folder
app.use(express.static("node_modules/flowbite/dist")); // Use flowbite
app.use(express.static("node_modules/bootstrap-icons/font")); // Use flowbite
app.use(require("./routes")); // Use routes

console.log("Waiting for database connection...");
db.sequelize
  .sync({ force: false, alter: false, benchmark: true })
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
