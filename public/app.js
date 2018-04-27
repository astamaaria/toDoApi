/*global $*/
$(document).ready(function (){
    $.getJSON("api/todos")
    .then(addTodos)
    .catch(error => console.log(`Something went wrong ${error}`))
    
     $(`#todoInput`).keypress(event =>{
         var todoText = $(`#todoInput`).val();
        if(event.which == 13 && todoText){
            createTodo();
        }
    });
    $(`.list`).on("click", `li`, function () {
        updateTodo($(this))
    })
    $(`.list`).on("click", `span`, function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    })
});

function addTodos(todos){
    // add toodos to the page
    todos.forEach(todo => addTodo(todo));
}

function createTodo (){
    var userInput =$(`#todoInput`).val();
    $.post(`/api/todos`, {name:userInput})
    .then(newTodo => {
        $(`#todoInput`).val(``);
        addTodo(newTodo);
    })
    .catch(err => console.log(`Something went wrong ${err}`))
}

function addTodo(todo){
    var newTodo =$(`<li class="task"> ${todo.name} <span>X</span></li>`);
    newTodo.data(`id`, todo._id);
    newTodo.data(`completed`, todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    try{
        $(`.list`).append(newTodo)
    }
   catch(error){
       console.log(`Something went wrong ${error}`);
   }
}

function updateTodo(todo){
    var isDone = !todo.data(`completed`);
    var updateData = {completed: isDone}
    $.ajax({
        method: `PUT`,
        url: `/api/todos/${todo.data(`id`)}`,
        data: updateData
    })
    .then(updatedTodo => {
        todo.toggleClass("done");
        todo.data(`completed`, isDone);
    });
}

function removeTodo(todo){
    var clickedId = todo.data(`id`);
        $.ajax({
            method: "DELETE",
            url: `/api/todos/${clickedId}`,
            
        })
        .then(data => todo.remove())
}