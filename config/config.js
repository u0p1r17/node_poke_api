
module.exports = {
  development:{
    "database": "pokedex",
    "username": "root",
    "password": null,
    "host": "localhost",
    "port":"3333",  
    "logging": true,
    "dialect": "mysql",
    "dialectOPtions": {
      
    }
  },
  production: { 
    "database": process.env.MYSQLDATABASE,
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "host": process.env.MYSQLHOST,
    "port": process.env.MYSQLPORT,
    "logging": true,  
    "dialect": "mysql",
    "dialectOPtions": {
      
    }
  }
}
