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
    var num = id.replace( /^\D+/g, '');     var todos = get_todos();
    todos.splice(num, 1);
    localStorage.setItem('todo', JSON.stringify(todos)); 
    show(); 
    return false;
}

//Random Colour generator
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    alert("Color!")
}

function show() {
    var todos = get_todos();
    var html = '<div class="col s6" style="margin-left:1rem;">';
    for(var i=0; i<todos.length; i++) {
        html += '<div class="card-panel teal lighten-4 col s6" class="drag" id="todo_' + i + '" draggable="true" ondragstart="drag(event)">' + todos[i]  + '<button class="remove" style="float:right" id="button_' + i + '"></div>';
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
    var element = document.getElementById('drop');
    var numberOfChildren = element.getElementsByTagName('*').length/2;
    //alert(numberOfChildren);
    var thisElement = document.getElementById(data).id = numberOfChildren-1;
    //alert(thisElement);

     //This will remove the dragged item hung in ToDo Section!!     ---------> REMOVED ONLY FOR TESTING
    var num = data.replace( /^\D+/g, '');
    //alert(num);
    var todoDone = get_todos();
    todoDone.splice(num, 1); 
    localStorage.setItem('todo', JSON.stringify(todoDone)); 
    show();

    //To change button id
    var changeButtonId = document.getElementById(thisElement).getElementsByTagName('button')[0].id = numberOfChildren-1;
    //alert(changeButtonId);   

    var droppedItem = document.getElementById("drop").innerHTML;
    localStorage['item'] = droppedItem;
}

function doneTask() {
var myDoneTask = localStorage['item'];     
    if (myDoneTask != undefined) {
        document.getElementById("drop").innerHTML = myDoneTask;
    }   
}

function deleteMe(){
    localStorage.removeItem('item');
     window.location.reload();
}

function handle(e){
        if(e.keyCode === 13){
            e.preventDefault();
            add();
        }
    }

document.getElementById('add').addEventListener('click', add);
show(); 

document.addEventListener("DOMContentLoaded", doneTask, false);