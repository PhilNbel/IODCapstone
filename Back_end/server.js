const express = require("express");
const app = express();

require("dotenv").config();
require("./db_run"); // example using mysql2 package - first run 'npm install mysql2'
/*
let itemRoutes = require('./routes/itemRoutes')
let categoryRoutes = require('./routes/categoryRoutes')
let proficiencyRoutes = require('./routes/proficiencyRoutes')*/

// parse requests of content-type - application / json;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "You should not be here, go to localhost:5000" });
});
/*
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/proficiencies', proficiencyRoutes);
*/
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
