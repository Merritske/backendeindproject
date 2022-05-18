const mongoose = require('mongoose');

var reizenSchema = new mongoose.Schema({
    title: {
        type: String
    },
    gepland: [{

        datum: {
            type:String
        },
        deelnemers: {
            type: Array
        }
    }]

})

module.exports = mongoose.model("reizen", reizenSchema)