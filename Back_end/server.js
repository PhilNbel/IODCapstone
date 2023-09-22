const express = require("express");
const app = express();
const cors = require("cors");
const sqlSanitizer = require('sql-sanitizer');

const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "dev"}` }); // support multiple environments, see package.json

require("./db_run"); // example using mysql2 package - first run 'npm install mysql2'

let userRoutes = require('./routes/userRoutes')
//let categoryRoutes = require('./routes/categoryRoutes')
//let proficiencyRoutes = require('./routes/proficiencyRoutes')

// parse requests of content-type - application / json;
app.use(express.json());
//app.use("/", express.static("public")); // required for image mappings
app.use(cors());
app.use(sqlSanitizer);

app.get("/", (req, res) => {
  res.json({ message: "You should not be here, go to localhost:5173" });
});

app.use('/api/users', userRoutes);
//app.use('/api/categories', categoryRoutes);
//app.use('/api/proficiencies', proficiencyRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

