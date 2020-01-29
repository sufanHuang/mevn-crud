const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Recipe = mongoose.model('todos', TodoSchema)
