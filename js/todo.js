function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
     
function add() {
    var task = document.getElementById('task').value;
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
    return false;
}
     
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos)); 
    show(); 
    return false;
}

    //Random Colour generator
    /*function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }*/

function show() {
    var todos = get_todos();
    var html = '<div class="col s6" style="margin-left:1rem;">';
    for(var i=0; i<todos.length; i++) {
        html += '<div class="card-panel col s6" class="drag" id="' + i  + '" draggable="true" ondragstart="drag(event)">' + todos[i]  + '<button class="remove" style="float:right" id="' + i  + '"></div>';
    };
    html += '</div>'; 
    document.getElementById('todos').innerHTML = html; 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
} 

function allowDrop(ev) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
        ev.dataTransfer.dropEffect = "none"; //drop blocked!!
    else
        ev.dataTransfer.dropEffect = "all";
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
    var droppedItem = document.getElementById("drop").innerHTML;
    localStorage['item'] = droppedItem;
    //This will remove the dragged item hung in ToDo Section!!
    //ev.preventDefault();
    //var t =  document.getElementsByClassName('drag');
    var id = document.getElementById(data).getAttribute('id');
    //alert(id);
    var todoDone = get_todos();
    todoDone.splice(id, 1); 
    localStorage.setItem('todo', JSON.stringify(todoDone)); 
    show();
}

function doneTask() {
var myDoneTask = localStorage['item'];     
    if (myDoneTask != undefined) {
        document.getElementById("drop").innerHTML = myDoneTask;
    }
    //localStorage.removeItem('item'); //---> only for testing
}

document.getElementById('add').addEventListener('click', add);
show(); 

document.addEventListener("DOMContentLoaded", doneTask, false);