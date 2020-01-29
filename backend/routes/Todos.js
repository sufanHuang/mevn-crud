const express = require ('express')
const todos = express.Router()
const Todo = require('../models/Todo.js')
const to = require('await-to-js').default
const _ = require('lodash')



todos.get('/', async(req, res)=>{
    let [ error, result ] = await to(Todo.find())
    let outputData = _.map(result,(item) =>{
        return _.assign(
            {id:item._id},
            _.pick(item, ["title"])
        )

    })
    if(error){
        res.status(500).json({message:error.message})
    }
    return res.json(outputData)
})

todos.get('/:id', async(req,res)=>{
    let { id } = req.params
    let [ error, document ] = await to(Todo.findOne({_id:id}))
    let { title,date } = document._doc
    let outputItem = {
        id,
        title,
        date
    }

    if(error){
        res.status(500).json({message:error.message})
    }
    return res.json(outputItem)
})

todos.post('/', async(req, res)=>{
    const { title } = req.body
    const newTodo = new Todo({
        title
    })

    let [ error ] = await to( newTodo.save())
    console.log(title)
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('adding todo')
})

todos.delete('/:id', async(req,res)=>{
    let { id } = req.params
    let [ error ]= await to(Todo.deleteOne({_id:id}))
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('deleting todo')
})

todos.put('/:id', async(req, res)=>{
    let { id } = req.params
    let { title } = req.body
    let [ error ]= await to(Todo.updateOne(
        {_id:id},
        { $set:{ title }}
    ))
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('updating todo')


})

module.exports = todos
