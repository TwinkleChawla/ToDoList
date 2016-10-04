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
    var element = document.getElementById('drop');
    var numberOfChildren = element.getElementsByTagName('*').length/2;
    alert(numberOfChildren);
    //for (var i=0; i<numberOfChildren; i++ )
    var thisElement = document.getElementById(data).id = numberOfChildren-1;
    alert(thisElement);
       /* var changedId = element.getElementsByTagName('div').id = numberOfChildren-1;
    alert(changedId);*/

    
    var droppedItem = document.getElementById("drop").innerHTML;
    localStorage['item'] = droppedItem;
    //This will remove the dragged item hung in ToDo Section!!     ---------> REMOVED ONLY FOR TESTING
    /*var id = document.getElementById(data).getAttribute('id');
    var todoDone = get_todos();
    todoDone.splice(id, 1); 
    localStorage.setItem('todo', JSON.stringify(todoDone)); 
    show();*/
}

function doneTask() {
var myDoneTask = localStorage['item'];     
    if (myDoneTask != undefined) {
        document.getElementById("drop").innerHTML = myDoneTask;
    }       
    //localStorage.removeItem('item'); //---> only for testing
    // same id wala move nhi hoga
}
//Need to change class='remove' located inside button in show function.
function removeDoneTask(){
    var id = this.getAttribute('thisElement');
    var done = localStorage['item'];
    done.splice(id, 1);
    localStorage.setItem('item', JSON.stringify(done));     
    //show();
    return false;
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