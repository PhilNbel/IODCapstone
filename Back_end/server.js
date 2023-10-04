const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path')

const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `./.env.${environment}` }); // support multiple environments, see package.json

require("./db_run"); // example using mysql2 package - first run 'npm install mysql2'

let userRoutes = require('./routes/userRoutes')
let fieldRoutes = require('./routes/fieldRoutes')
let skillRoutes = require('./routes/skillRoutes')
let projectRoutes = require('./routes/projectRoutes')

// parse requests of content-type - application / json;
app.use(cors());
app.use(express.json());
//app.use("/", express.static("public")); // required for image mappings

app.use('/api/users', userRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);

// only load the distribution/production version of frontend if we aren't running our local/dev server
if (environment != 'dev') {

  app.use(express.static(path.join(__dirname, '../Front_End/dist')))

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Front_End/dist/index.html")
    );
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

