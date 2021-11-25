// Global variables
const html = document;
const form = document.getElementById('input-form');
const globalUlVariable = document.querySelector('ul.ul-class');
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

    //Remove task from the UI
    globalUlVariable.addEventListener('click', RemoveOneTask);
}

//Get the tasks from LS and display them on the UI always when the site is opened.
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
        tasks.forEach(function(x, y){
            createTask(y, x);
        })
    }

    function createTask(index, value) {
        //Create the li
        const li = document.createElement('li');
        li.className = 'li-class';
        //Set a different id using the index of the loop.
        li.setAttribute('id', `li-id${index+1}`);
        globalUlVariable.appendChild(li);
        
        //Create the first div
        const div = document.createElement('div');
        div.className = 'content-frame';
        li.appendChild(div);
        
        const content = document.createElement('p');
        content.className = 'content';
        content.appendChild(document.createTextNode(value))
        div.appendChild(content)

        //Create the second div
        const menuIconDiv = document.createElement('div');
        menuIconDiv.className = 'menu-icon-div';
        li.appendChild(menuIconDiv)

        const menuIconFrame = document.createElement('div');
        menuIconFrame.className = 'menu-icon-frame';
        menuIconDiv.appendChild(menuIconFrame);

        const dropDown = document.createElement('i');
        dropDown.classList = 'drop-down bx bxs-chevrons-down bx-xs bx-tada-hover';
        menuIconFrame.appendChild(dropDown);
        
        //Create tht third div
        const toolsFrame = document.createElement('div');
        toolsFrame.className = 'tools-frame';
        li.appendChild(toolsFrame);

        const tools = document.createElement('div');
        tools.className = 'tools';
        toolsFrame.appendChild(tools);
        
        const checkIcon = document.createElement('i')
        checkIcon.classList = 'check-icon bx bx-check bx-md bx-tada';
        tools.appendChild(checkIcon);
        
        const rocketIcon = document.createElement('i');
        rocketIcon.classList = 'rocket-icon bx bxs-rocket bx-sm bx-tada';
        tools.appendChild(rocketIcon);

        const starIcon = document.createElement('i');
        starIcon.classList = 'star-icon bx bxs-star bx-sm bx-tada';
        tools.appendChild(starIcon);

        const commnetIcon = document.createElement('i');
        commnetIcon.classList = 'comment-icon bx bxs-comment-detail bx-sm bx-tada';
        tools.appendChild(commnetIcon);
    }

}

function submit(e){
    let inputValue = input.value;

    //The user will be alerted if he doesn't type anything in.
    if(inputValue === '') {
        window.alert('Please enter a task!')
    } else {
        //save it to the locale storage
        storeTaskToLocalStorage(inputValue);
        //after the task is saved in LS it will be automatically created on the UI
        createTaskOnUI();
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
    }

    function createTaskOnUI(){
        let tasks;

        //Get all the tasks form LS 
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }

        console.log(tasks);

        //Loop through the entier array and make up the tasks only with the last value that
        //was added to LS
        tasks.forEach(function(x, y){
            if(tasks.length === y+1){
                createTask(y, x);
                console.log(true);
            }
        })

        //Create the entier li tag
        function createTask(index, value) {
            //Create the li
            const li = document.createElement('li');
            li.className = 'li-class';
            //Set a different id using the index of the loop.
            li.setAttribute('id', `li-id${index+1}`);
            globalUlVariable.appendChild(li);
            
            //Create the first div
            const div = document.createElement('div');
            div.className = 'content-frame';
            li.appendChild(div);
            
            const content = document.createElement('p');
            content.className = 'content';
            content.appendChild(document.createTextNode(value))
            div.appendChild(content)
    
            //Create the second div
            const menuIconDiv = document.createElement('div');
            menuIconDiv.className = 'menu-icon-div';
            li.appendChild(menuIconDiv)
    
            const menuIconFrame = document.createElement('div');
            menuIconFrame.className = 'menu-icon-frame';
            menuIconDiv.appendChild(menuIconFrame);
    
            const dropDown = document.createElement('i');
            dropDown.classList = 'drop-down bx bxs-chevrons-down bx-xs bx-tada-hover';
            menuIconFrame.appendChild(dropDown);
            
            //Create tht third div
            const toolsFrame = document.createElement('div');
            toolsFrame.className = 'tools-frame';
            li.appendChild(toolsFrame);
    
            const tools = document.createElement('div');
            tools.className = 'tools';
            toolsFrame.appendChild(tools);
            
            const checkIcon = document.createElement('i')
            checkIcon.classList = 'check-icon bx bx-check bx-md bx-tada';
            tools.appendChild(checkIcon);
            
            const rocketIcon = document.createElement('i');
            rocketIcon.classList = 'rocket-icon bx bxs-rocket bx-sm bx-tada';
            tools.appendChild(rocketIcon);
    
            const starIcon = document.createElement('i');
            starIcon.classList = 'star-icon bx bxs-star bx-sm bx-tada';
            tools.appendChild(starIcon);
    
            const commnetIcon = document.createElement('i');
            commnetIcon.classList = 'comment-icon bx bxs-comment-detail bx-sm bx-tada';
            tools.appendChild(commnetIcon);
        }
    }

    //Clear the user's input
    input.value = '';
    
    //Prevent the default behaviour of the form
    e.preventDefault();
}

//Remove all the tasks
function removeAllTasks() {
    //Make an array with all the children of the ul(meaning all the li tags).
    let allChidren = Array.from(globalUlVariable.children);
    console.log(allChidren);
    //Variable vor animation process when all tasks are deleted alltogheter.
    let xPosition = 0;
    
    if(allChidren.length === 0){
        window.alert('There is no task to be deleted');
    } else{
        if(confirm('Are you sure you wanna delete all the tasks?') === true) {
            removeAllTasksAnimation(allChidren);
        }
        
        function removeAllTasksAnimation(){
            xPosition += 50;

            globalUlVariable.style.transform = `translate3d(${xPosition}px, 0, 0)`

            if(Math.abs(xPosition) <= 900){
                requestAnimationFrame(removeAllTasksAnimation);
            } else{
                console.log(true);
             //Loop through the entier array and delete every index,
            //one by one.
            allChidren.forEach(function(x){
                globalUlVariable.removeChild(x);
            })
            //After all the task were deleted from the UI,
            //Delete the key 'tasks' from the LS to not load again when
            //the browser have been opened.
            localStorage.removeItem('tasks');
            let xPosition = 0;
            globalUlVariable.style.transform = `translate3d(${xPosition}px, 0, 0)`
            }
        }
    }
}

function RemoveOneTask(e){
    //Variable that will be used to create the animation of the deletion process.    
    let xPosition = 0;
    let object = e.target;
    //Save the content of the task that will be deleted.
    let content = object.parentElement.parentElement.parentElement.children[0].children[0].innerText;
    
    if(object.classList.contains('rocket-icon')){
        animationProcess();
    }
    
    function animationProcess(){
        xPosition += 50;
        
        object.parentElement.parentElement.parentElement.style.transform = `translate3d(${xPosition}px, 0, 0)`;
        
        if(Math.abs(xPosition) <= 900){
            requestAnimationFrame(animationProcess);
        } else{
            removeTaskFromUI(object);
            removeTasksFromLocaleStorage(content);
            //After the task is deleted from UI and LS delet all the tasks on the UI and
            //make them up again to reset the number of the ids on the DOM.
            removeAndGetFromLS(globalUlVariable);
        }
    }

    function removeTaskFromUI(taskToRemove){
        taskToRemove.parentElement.parentElement.parentElement.remove();
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

    function removeAndGetFromLS(e){
        //The function that delet the task from the UI.
        removeTasks(e);
        //The function that recreate all the tasks on the UI from LS.
        getFromLS();

        function removeTasks(e){
            let allChidren = Array.from(e.children);

            allChidren.forEach(function(x){
                e.removeChild(x);
            })
        }

        function getFromLS(){
            let tasks;

            if(localStorage.getItem('tasks') === null){
                tasks = [];
            } else{
                tasks = JSON.parse(localStorage.getItem('tasks'))
            }
    
            console.log(tasks);
    
            tasks.forEach(function(x, y){
                createTask(y, x);
            })
    
            function createTask(index, value) {
                //Create the li
                const li = document.createElement('li');
                li.className = 'li-class';
                li.setAttribute('id', `li-id${index+1}`);
                globalUlVariable.appendChild(li);
                
                //Create the first div
                const div = document.createElement('div');
                div.className = 'content-frame';
                li.appendChild(div);
                
                const content = document.createElement('p');
                content.className = 'content';
                content.appendChild(document.createTextNode(value))
                div.appendChild(content)
        
                //Create the second div
                const menuIconDiv = document.createElement('div');
                menuIconDiv.className = 'menu-icon-div';
                li.appendChild(menuIconDiv)
        
                const menuIconFrame = document.createElement('div');
                menuIconFrame.className = 'menu-icon-frame';
                menuIconDiv.appendChild(menuIconFrame);
        
                const dropDown = document.createElement('i');
                dropDown.classList = 'drop-down bx bxs-chevrons-down bx-xs bx-tada-hover';
                menuIconFrame.appendChild(dropDown);
                
                //Create tht third div
                const toolsFrame = document.createElement('div');
                toolsFrame.className = 'tools-frame';
                li.appendChild(toolsFrame);
        
                const tools = document.createElement('div');
                tools.className = 'tools';
                toolsFrame.appendChild(tools);
                
                const checkIcon = document.createElement('i')
                checkIcon.classList = 'check-icon bx bx-check bx-md bx-tada';
                tools.appendChild(checkIcon);
                
                const rocketIcon = document.createElement('i');
                rocketIcon.classList = 'rocket-icon bx bxs-rocket bx-sm bx-tada';
                tools.appendChild(rocketIcon);
        
                const starIcon = document.createElement('i');
                starIcon.classList = 'star-icon bx bxs-star bx-sm bx-tada';
                tools.appendChild(starIcon);
        
                const commnetIcon = document.createElement('i');
                commnetIcon.classList = 'comment-icon bx bxs-comment-detail bx-sm bx-tada';
                tools.appendChild(commnetIcon);
            }
        }
    }
}