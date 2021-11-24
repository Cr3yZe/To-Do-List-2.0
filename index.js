// Global variables
const html = document;
const form = document.getElementById('input_form');
const globalUlVariable = document.querySelector('ul.ul_class');
const removeAllTasksButton = document.querySelector('button.remove-tasks');
const input = document.getElementById('input');

events();

// This function will load all the events listener
function events() {
    
    //Load the tasksfrom locale storage when the page is opened.
    html.addEventListener('DOMContetLoaded', getFromLocaleStorage());
    //Here I have to set two brackets. If I don't set them after the function 
    //name the event doesn't work out, it doesn't load the tasks from LS.

    // Get the input from the user and create the task card.
    form.addEventListener('submit', submit);

    //Remove all the the tasks from the UI and Local Storage.
    removeAllTasksButton.addEventListener('click', removeAllTasks);
    
    //Remove a specific task from list
    // globalUlVariable.addEventListener('click', removeTask);

    //Test animation on li.
    globalUlVariable.addEventListener('click', animationRemove);
}

//Get the tasks from LS and display them on the UI
function getFromLocaleStorage() {
    let tasks;

    //Check if there is a key called tasks in LS, if not set it
    //the variable tasks to an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    //If there is a key in LS called tasks take it and make it
    //into an array to create a task with every value.
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(x){
            createTask(x);
        })
    }

    function createTask(value) {
        const li = document.createElement('li');
        li.className = 'li_class';
        globalUlVariable.appendChild(li);
        
        const div = document.createElement('div');
        div.className = 'content_frame';
        li.appendChild(div);
        
        const content = document.createElement('p');
        content.className = 'content'
        content.appendChild(document.createTextNode(value))
        div.appendChild(content)
        
        const tools = document.createElement('div');
        tools.className = 'tools_frame'
        li.appendChild(tools);
        
        const tick = document.createElement('i')
        tick.classList = 'check_icon bx bx-check bx-md';
        tools.appendChild(tick);
        
        const trash = document.createElement('i');
        trash.classList = 'trash_icon bx bx-trash bx-sm';
        tools.appendChild(trash);
    }

}

function submit(e){
    let inputValue = input.value;

    if(inputValue === '') {
        window.alert('Please enter a task!')
    } else {
        //save it to the locale storage
        storeTaskToLocalStorage(inputValue);
    }

    //Set the task's value to locale storage
    function storeTaskToLocalStorage(value) {
        let tasks;
    
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    
        tasks.push(value);
    
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(localStorage.getItem('tasks'));
    }

    createTaskOnUI();

    function createTaskOnUI(){
        let tasks;

        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }

        console.log(tasks);

        tasks.forEach(function(x, y){
            console.log(`${y+1}: ${x}`);
            createTask(y, x)
        })


        function createTask(value, index) {
            const li = document.createElement('li');
            li.className = `li_class${value+1}`;
            globalUlVariable.appendChild(li);
            
            const div = document.createElement('div');
            div.className = 'content_frame';
            li.appendChild(div);
            
            const content = document.createElement('p');
            content.className = 'content'
            content.appendChild(document.createTextNode(index))
            div.appendChild(content)
            
            const tools = document.createElement('div');
            tools.className = 'tools_frame'
            li.appendChild(tools);
            
            const tick = document.createElement('i')
            tick.classList = 'check_icon bx bx-check bx-md';
            tools.appendChild(tick);
            
            const trash = document.createElement('i');
            trash.classList = 'trash_icon bx bx-trash bx-sm';
            tools.appendChild(trash);
        }
    }

    //Clear the user's input
    input.value = '';
    
    //Prevent the default behaviour of the form
    e.preventDefault();
}

//Remove all the tasks
function removeAllTasks() {
    let allChidren;

    //Make an array with all the children of the ul(meaning all the li tags).
    allChidren = Array.from(globalUlVariable.children);

    if(allChidren.length === 0){
        window.alert('There is no task to be deleted');
    } else{
        if(confirm('Are you sure you wanna delete all the tasks?') === true) {
            //Loop through the entier array and delete every index,
            //one by one.
            allChidren.forEach(function(x){
                globalUlVariable.removeChild(x);
            })
            //After all the task were deleted from the UI,
            //Delete the key 'tasks' from the LS to not load again when
            //the browser have been opened.
            localStorage.removeItem('tasks');
        }
    }
}

function animationRemove(e){    
    let xPosition = 0;
    let object = e.target;
    let content = object.parentElement.parentElement.children[0].children[0].innerText;

    if(object.classList.contains('trash_icon')){
        animationProcess();
    }
    
    function animationProcess(){
        xPosition += 50;
        
        object.parentElement.parentElement.style.transform = `translate3d(${xPosition}px, 0, 0)`;
        
        if(Math.abs(xPosition) <= 900){
            requestAnimationFrame(animationProcess);
        } else{
            removeTaskFromUI(object);
            removeTasksFromLocaleStorage(content);
        }
    }

    function removeTaskFromUI(taskToRemove){
        taskToRemove.parentElement.parentElement.remove();
    }

    function removeTasksFromLocaleStorage(task){
        let tasks;

        //Check if there is something in the LS. If there is nothing in there set
        //the tasks variable to an empty array and if there is something in there
        //take it and parse it as an array into the tasks variable.
        if(localStorage.getItem('tasks' === null)){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        //Loop through the entier array(tasks) and if x(the content on the index)
        //is equal to the task variable remove y(the index of that content)
        tasks.forEach(function(x, y){
            if(x === task){
                tasks.splice(y, 1);
        }});

        //After the index was removed from the array set back the LS;
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}