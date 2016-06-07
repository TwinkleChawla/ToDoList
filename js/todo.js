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
    function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }

    function show() {
        var todos = get_todos();
        var randColor = getRandomColor();
        var html = '<div class="col s6" style="margin-left:1rem;">';
        for(var i=0; i<todos.length; i++) {
            html += '<div class="card-panel col s6" id="drag" draggable="true" ondragstart="drag(event)">' + todos[i]  + '<button class="remove" style="float:right" id="' + i  + '"></div>';
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
    } 

    /*function dragOver(ev) {
        return false;
    }
         
    function dragDrop(ev) {
        var src = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(src));
        ev.stopPropagation();
        return false;
    }*/

    document.getElementById('add').addEventListener('click', add);
    show();