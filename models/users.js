const mongoose = require('mongoose')

//create schema
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    geboortedatum: {
        type: String,
        required: true
    },
    woonplaats: {
        type: String,
        required: true
    },
    nieuwsbrief: {
        type: Boolean,
        required: true
    },
    reis: {
        gedaan: {
            title: {
                type: String
            },
            datum: {
                type: String
            },
            quotatie: {
                type: Number
            }
        },
        gepland: {
            title: {
                type: String
            },
            datum: {
                type: String
            }
        }
    }
})

module.exports = mongoose.model("user", userSchema)