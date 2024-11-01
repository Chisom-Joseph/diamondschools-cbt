const express = require("express");
const app = express();

const PORT = process.env.PORT || 8319;

app.set("view engine", "ejs"); // Use ejs
app.use(express.static("public")); // Use public folder
app.use(express.static("node_modules/flowbite/dist")); // Use flowbite
app.use(express.static("node_modules/bootstrap-icons/font")); // Use flowbite
app.use(require("./routes")); // Use routes

app.listen(PORT, () => {
  console.log(`Server is Up and Running on http://localhost:${PORT}/`);
});
