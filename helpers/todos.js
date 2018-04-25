var db = require("../models");

exports.getTodos = function(req, res){
    db.Todo.find()
    .then(todos => res.json(todos))
    .catch(error => res.send(error))
}

exports.createTodo = function(req, res){
   db.Todo.create(req.body)
   .then(newTodo => res.status(201).json(newTodo))
   .catch(error => res.send(error))
};

exports.getTodo = function (req,res){
    db.Todo.findById(req.params.todoId)
    .then(foundTodo => res.json(foundTodo))
    .catch(error => res.send(error))
}
exports.updateTodo = function (req,res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(todo => res.json(todo))
    .catch(error => res.send(error))
}

exports.deleteTodo = function (req,res){
    db.Todo.remove({_id:req.params.todoId})
    .then(()=> res.json({message: `We deleted it`}))
    .catch(error => res.send(error))
}

module.exports= exports;