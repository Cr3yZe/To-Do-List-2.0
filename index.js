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

    globalUlVariable.addEventListener('click', openTools);

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
        const toolsFrame = document.createElement('div');
        toolsFrame.className = 'tools-frame';
        li.appendChild(toolsFrame);

        const tools = document.createElement('div');
        tools.className = 'tools';
        toolsFrame.appendChild(tools);
        
        const checkIcon = document.createElement('i')
        checkIcon.classList = 'check-icon bx bx-check bx-md bx-tada';
        checkIcon.setAttribute('id', 'tools-icon');
        tools.appendChild(checkIcon);
        
        const rocketIcon = document.createElement('i');
        rocketIcon.classList = 'rocket-icon bx bxs-rocket bx-sm bx-tada';
        rocketIcon.setAttribute('id', 'tools-icon');
        tools.appendChild(rocketIcon);
        
        const starIcon = document.createElement('i');
        starIcon.classList = 'star-icon bx bxs-star bx-sm bx-tada';
        starIcon.setAttribute('id', 'tools-icon');
        tools.appendChild(starIcon);
        
        const commnetIcon = document.createElement('i');
        commnetIcon.classList = 'comment-icon bx bxs-comment-detail bx-sm bx-tada';
        commnetIcon.setAttribute('id', 'tools-icon');
        tools.appendChild(commnetIcon);
        
        //Create the third div
        const menuIconDiv = document.createElement('div');
        menuIconDiv.className = 'menu-icon-div';
        toolsFrame.appendChild(menuIconDiv)

        const menuIconFrame = document.createElement('label');
        menuIconFrame.className = 'menu-icon-frame';
        menuIconDiv.appendChild(menuIconFrame);

        const inputCheckBox = document.createElement('input');
        inputCheckBox.className = 'check';
        inputCheckBox.setAttribute('type', 'checkbox');
        menuIconFrame.appendChild(inputCheckBox);

        const dropDown = document.createElement('i');
        dropDown.classList = 'drop-down bx bxs-chevrons-down bx-xs';
        menuIconFrame.appendChild(dropDown);
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

        //Loop through the entier array and make up the tasks only with the last value that
        //was added to LS
        tasks.forEach(function(x, y){
            if(tasks.length === y+1){
                createTask(y, x);
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
            const toolsFrame = document.createElement('div');
            toolsFrame.className = 'tools-frame';
            li.appendChild(toolsFrame);
    
            const tools = document.createElement('div');
            tools.className = 'tools';
            toolsFrame.appendChild(tools);
            
            const checkIcon = document.createElement('i')
            checkIcon.classList = 'check-icon bx bx-check bx-md bx-tada';
            checkIcon.setAttribute('id', 'tools-icon');
            tools.appendChild(checkIcon);
            
            const rocketIcon = document.createElement('i');
            rocketIcon.classList = 'rocket-icon bx bxs-rocket bx-sm bx-tada';
            rocketIcon.setAttribute('id', 'tools-icon');
            tools.appendChild(rocketIcon);
            
            const starIcon = document.createElement('i');
            starIcon.classList = 'star-icon bx bxs-star bx-sm bx-tada';
            starIcon.setAttribute('id', 'tools-icon');
            tools.appendChild(starIcon);
            
            const commnetIcon = document.createElement('i');
            commnetIcon.classList = 'comment-icon bx bxs-comment-detail bx-sm bx-tada';
            commnetIcon.setAttribute('id', 'tools-icon');
            tools.appendChild(commnetIcon);
            
            //Create the third div
            const menuIconDiv = document.createElement('div');
            menuIconDiv.className = 'menu-icon-div';
            toolsFrame.appendChild(menuIconDiv)
    
            const menuIconFrame = document.createElement('label');
            menuIconFrame.className = 'menu-icon-frame';
            menuIconDiv.appendChild(menuIconFrame);

            const inputCheckBox = document.createElement('input');
            inputCheckBox.className = 'check';
            inputCheckBox.setAttribute('type', 'checkbox');
            menuIconFrame.appendChild(inputCheckBox);

            const dropDown = document.createElement('i');
            dropDown.classList = 'drop-down bx bxs-chevrons-down bx-xs';
            menuIconFrame.appendChild(dropDown);
        }
    }

    //Clear the user's input
    input.value = '';
    
    //Prevent the default behaviour of the form
    e.preventDefault();
}

function openTools(e){
    let object = e.target;
    let currentTask;
    let liTags;
    let arrayLi;

    // Set the li that was selected into a variable.
    let selectedLiTag = object.parentElement.parentElement.parentElement.parentElement;

    //Variables for animations.
    let toolsVarDown = 0;
    let toolsVarUp = 45;
    let opacityDown = 0;
    let opacityUp = 1;
    let rotationDown = 0;
    let rotationUp = 180;
    
    //Check if the tag that was set in the liTag variable it is a li tag.
    if(selectedLiTag.classList.contains('li-class')){
        currentTask = object.parentElement.parentElement.parentElement.parentElement;
    }

    //Check if the icon that was selected by the user is the drop-down icon.
    if(object.classList.contains('drop-down')){
        //Select all the lis form the UI
        liTags = object.parentElement.parentElement.parentElement.parentElement.parentElement.children;
        //Set the checkbox from the DOM in checkBox variable.
        checkBox = object.parentElement.children[0];
        arrayLi = Array.from(liTags);

        //Loop through the array, searching for the currentTask that was selected.
        arrayLi.forEach(function(x, y){
            if(arrayLi[y] === currentTask){
                //If the checkbox is unchecked(false) display the tools menu.
                if(checkBox.checked === false){
                    animationToolsFrameOn();
                //If the checkbox is checked(true) hidde the tools menu.
                } else if(checkBox.checked === true){
                    animationToolsFrameOff();
                }
            }
        })

    }
    
    function animationToolsFrameOn(){
        //Set the frame of the tools menu into toolsFrame variable
        let toolsFrame = object.parentElement.parentElement.parentElement;
        let tools = toolsFrame.children[0];
        let toolsIcon = selectedLiTag.querySelectorAll('#tools-icon');
        
        toolsVarDown += 5;
        opacityDown += .1;
        
        toolsFrame.style.height = `${toolsVarDown}px`;
        selectedLiTag.style.borderBottomLeftRadius = '8px';
        selectedLiTag.style.borderBottomRightRadius = '8px';
        
        toolsIcon = Array.from(toolsIcon);
        
        toolsIcon.forEach(function(x, y){
            toolsIcon[y].style.opacity = `${opacityDown}`
        })
        
        if(toolsVarDown <= 45){
            requestAnimationFrame(animationToolsFrameOn);
        } else{
            animationDropMenuOn();
        }
        
        function animationDropMenuOn(){
            let dropDownIcon = object.parentElement.children[1];
            rotationDown += 30;
    
            dropDownIcon.style.transform = `rotate(${rotationDown}deg)`;
            
            if(rotationDown <= 179){
                requestAnimationFrame(animationDropMenuOn);
            }
        }
    }
    
    function animationToolsFrameOff(){
        let toolsFrame = object.parentElement.parentElement.parentElement;
        let tools = toolsFrame.children[0];
        let toolsIcon = selectedLiTag.querySelectorAll('#tools-icon');
        let radius = 0;
        
        toolsVarUp -= 5;
        console.log(toolsVarUp);
        opacityUp -= .1;
        
        selectedLiTag.style.borderBottomLeftRadius = `${radius}px`;
        selectedLiTag.style.borderBottomRightRadius = `${radius}px`;
        toolsFrame.style.height = `${toolsVarUp}px`;
        
        toolsIcon = Array.from(toolsIcon);
        
        toolsIcon.forEach(function(x, y){
            toolsIcon[y].style.opacity = `${Math.floor(opacityUp)}`;
        });
        
        if(toolsVarUp >= 5){
            requestAnimationFrame(animationToolsFrameOff);
        } else{
            animationDropMenuOff();
            // dropDownIcon.style.transform = 'rotate(0deg)';
        }
        
        function animationDropMenuOff(){
            let dropDownIcon = object.parentElement.children[1];
            
            rotationUp -= 30;
            dropDownIcon.style.transform = `rotate(${rotationUp}deg`;

            if(rotationUp >= 1){
                requestAnimationFrame(animationDropMenuOff);
            }
        }
    }
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
    let object = e.target;

    //Variables for the animation of the tools menu.
    let toolsVarUp = 45;
    let opacityUp = 1;
    let rotationUp = 180;

    //Variable that will be used to create the animation of the deletion process.    
    let xPosition = 0;
    
    //Save the content of the task that will be deleted.
    let content = object.parentElement.parentElement.parentElement.children[0].children[0].textContent;
    
    //Check if the event happend on the rocket icon.
    if(object.classList.contains('rocket-icon')){
        animationToolsFrameOff();   
    }
    
    //First, make the animation of the menu to disappear
    function animationToolsFrameOff(){
        let object = e.target;
        
        //Set the li, that was selected to be deleted, into a variable.
        let selectedLiTag = object.parentElement.parentElement.parentElement;
        
        //Select the bar under the current task.
        let menuIconDiv = object.parentElement.parentElement.children[1];
        //Select the entier tools frame.
        let toolsFrame = object.parentElement.parentElement;
        // //Select the div where the tools are located.
        // let tools = toolsFrame.children[0];
        //Select the drop down icon.
        let dropDownIcon = object.parentElement.parentElement.children[1].children[0].children[1];
        console.log(dropDownIcon);
        //Select the tools.
        let toolsIcon = selectedLiTag.querySelectorAll('#tools-icon');

        //Set new values for the variables every time when the requestAniamtionFrame exeutes.
        toolsVarUp -= 5;
        opacityUp -= 1;
        
        selectedLiTag.style.borderBottomLeftRadius = '0px';
        selectedLiTag.style.borderBottomRightRadius = '0px';
        //Seting the height of the toolsFrame to its original value(0);
        toolsFrame.style.height = `${toolsVarUp}px`;
        //Setting the scale of the menu bar under the task to its original size when deleting the task.
        menuIconDiv.style.transform = 'scale(1, 0.3)';
        dropDownIcon.style.opacity = '0';

        
        toolsIcon = Array.from(toolsIcon);
        
        toolsIcon.forEach(function(x, y){
            toolsIcon[y].style.display = 'none';
            // toolsIcon[y].style.opacity = '0';
            toolsIcon[y].style.color = 'rgb(1, 2, 92)'
            console.log(toolsIcon[y]);
        });
        
        if(toolsVarUp >= 5){
            requestAnimationFrame(animationToolsFrameOff);
        } else{
            animationProcess();  
        }
        
        function animationProcess(){
            xPosition += 50;
            
            object.parentElement.parentElement.parentElement.style.transform = `translate3d(${xPosition}px, 0, 0)`;
            
    
            if(Math.abs(xPosition) <= 900){
                requestAnimationFframe(animationProcess);
            } else{
                removeTaskFromUI(object);
                removeTasksFromLocaleStorage(content);
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
            
                tasks.forEach(function(x, y){
                    createTask(y, x);
                })
        
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
                    const toolsFrame = document.createElement('div');
                    toolsFrame.className = 'tools-frame';
                    li.appendChild(toolsFrame);
            
                    const tools = document.createElement('div');
                    tools.className = 'tools';
                    toolsFrame.appendChild(tools);
                    
                    const checkIcon = document.createElement('i')
                    checkIcon.classList = 'check-icon bx bx-check bx-md bx-tada';
                    checkIcon.setAttribute('id', 'tools-icon');
                    tools.appendChild(checkIcon);
                    
                    const rocketIcon = document.createElement('i');
                    rocketIcon.classList = 'rocket-icon bx bxs-rocket bx-sm bx-tada';
                    rocketIcon.setAttribute('id', 'tools-icon');
                    tools.appendChild(rocketIcon);
                    
                    const starIcon = document.createElement('i');
                    starIcon.classList = 'star-icon bx bxs-star bx-sm bx-tada';
                    starIcon.setAttribute('id', 'tools-icon');
                    tools.appendChild(starIcon);
                    
                    const commnetIcon = document.createElement('i');
                    commnetIcon.classList = 'comment-icon bx bxs-comment-detail bx-sm bx-tada';
                    commnetIcon.setAttribute('id', 'tools-icon');
                    tools.appendChild(commnetIcon);
                    
                    //Create the third div
                    const menuIconDiv = document.createElement('div');
                    menuIconDiv.className = 'menu-icon-div';
                    toolsFrame.appendChild(menuIconDiv)
            
                    const menuIconFrame = document.createElement('label');
                    menuIconFrame.className = 'menu-icon-frame';
                    menuIconDiv.appendChild(menuIconFrame);
    
                    const inputCheckBox = document.createElement('input');
                    inputCheckBox.className = 'check';
                    inputCheckBox.setAttribute('type', 'checkbox');
                    menuIconFrame.appendChild(inputCheckBox);
                    
                    const dropDown = document.createElement('i');
                    dropDown.classList = 'drop-down bx bxs-chevrons-down bx-xs';
                    menuIconFrame.appendChild(dropDown);
                }
            }
        }
    }
}
