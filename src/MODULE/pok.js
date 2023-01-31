'user strict'
const { Model } = require("sequelize")

const valideTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']
module.exports = (sequelize, DataTypes) => {
    class Pokemon extends Model {
        static associate(models){

        }
    }
    Pokemon.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "le nom est deja pris"
            },
            validate: {
                notEmpty: { msg: 'Ce champ doit etre renseigner'},
                notNull: { msg: 'Ce champ doit etre renseigner'},
                len: {
                    args: [1,25],
                    msg: 'doit etre conmpris entre 1 et 25 caractère'
                },
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: 'les points de vie sont une propriété requise.'},
                min:{
                    args: [0],
                    msg: 'Une valeur en desous de 0 n\'est pas permise',
                },
                max:{
                    args: [999],
                    msg: 'Une valeur au dessus de 999 n\'est pas permise',
                },

            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {  msg: "Utilisez uniquement des nombres entiers pour les points de vie."},
                notNull: { msg: 'Les points de vie sont une propriété requise.'},
                min: {
                    args: [0],
                    msg : "Une valeur en desous de 0 n'est pas valide"
                },
                max: {
                    args: [99],
                    msg: "une valeur au dessus de 99 n'estpas valide"
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'Une image est requise' },
                isUrl: { msg: "Le chemin fournis n'est pas valide"}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types){
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value){
                    if(!value){
                        throw new Error('Un pokémon doit au moins avoir un type.')
                    }
                    if(value.split(',').length > 3){
                        throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
                    }
                    value.split(',').forEach(type => {
                        if(!valideTypes.includes(type)){
                            throw new Error(`Les types valide sont: ${valideTypes}`)
                        }
                    })
                }
            }
        }
    }, 
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
    return Pokemon
}