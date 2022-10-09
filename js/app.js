//define ui elements


let form = document.querySelector('#task-form');
let taskInput = document.querySelector('#new-task');
let filter = document.querySelector('#filter-task');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear-task-btn');

//define event listeners

form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks)


//define functions

//add task function

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Please Add A Task")
    }
    else {
        //create li element

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = 'X';
        li.appendChild(link)
        tasklist.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }

}


//remove task function

function removeTask(e) {
    e.preventDefault();
    if (e.target.hasAttribute('href')) {
        if (confirm("Are You Sure?")) {
            let removeElement = e.target.parentElement;
            removeElement.remove();
            removeFromLocalStorage(removeElement);
        }
    }
}


//clear task function


function clearTask(e) {
    e.preventDefault();
    if (confirm("Are You Sure?")) {
        tasklist.innerHTML = "";
    }

    localStorage.clear();
}


//filter task function

function filterTask(e) {
    e.preventDefault();
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    })

}

//store in local storage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))

}


//load from local storage

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = 'X';
        li.appendChild(link)
        tasklist.appendChild(li);
    })
}

//remove from local storage

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}