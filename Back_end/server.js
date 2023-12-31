const express = require("express");
const app = express();//define the app
const cors = require("cors");
const path = require('path')

const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `./.env.${environment}` }); // define the environment

require("./db_run"); //runs the database

//define the routes
let userRoutes = require('./routes/userRoutes')
let fieldRoutes = require('./routes/fieldRoutes')
let skillRoutes = require('./routes/skillRoutes')
let projectRoutes = require('./routes/projectRoutes')

// parse requests of content-type - application / json;
app.use(cors());
app.use(express.json());

//app.use("/", express.static("public")); // required for image mappings

//use the routes
app.use('/api/users', userRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);

// only load the distribution/production version of frontend if we aren't running our local/dev server
if (environment != 'dev') {
  let front=(process.env.SOURCE=="DOCKER")?'./Front_end/dist':'../Front_end/dist'
  app.use(express.static(path.join(__dirname, front)))

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, front+"/index.html")
    );
  });
}

//set the port
const PORT = process.env.PORT || 8080;

//and voila
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

