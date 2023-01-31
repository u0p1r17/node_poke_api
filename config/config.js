console.log(process.env)
module.exports = {
  development:{
    "database": "pokedex",
    "username": "root",
    "password": null,
    "host": "localhost",
    "port":"3333",  
    "logging": true,
    "dialect": "mariadb",
    "dialectOPtions": {
      "timezone": "Etc/GMT-2"
    }
  },
  production: { 
    "username": process.env.MYSQLUSER,
    "password": process.env.MYSQLPASSWORD,
    "database": process.env.MYSQLDATABASE,
    "host": process.env.MYSQLHOST,
    "port": process.env.MYSQLPORT,  
    "dialect": 'mysql'
  }
}
