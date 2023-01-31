'use strict'
const {
    Model
} = require()
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models){

        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Ce nom est deja pris'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
    return User
}