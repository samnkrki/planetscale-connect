const express = require("express")
const Sequelize = require('sequelize');
const fs = require("fs");

require('dotenv').config()
const app = express();

process.env
const sequelize = new Sequelize(process.env.database, process.env.db_username, process.env.db_password, {
  host: process.env.db_host,
  dialect: "mysql",
  dialectOptions:{
      ssl:{
        ca: fs.readFileSync('./cacert.pem')
      }
  }
});

const User = sequelize.define('user', {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  }, {
    // options
  });

  User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });

  app.get("/",function(req,res,next){

    User.findAll().then(users => {
        console.log("All users:", JSON.stringify(users, null, 4));
      });
      res.send("success")
  })
app.listen(3000,()=>{
    console.log("started")
})
