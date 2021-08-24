let theInput = document.querySelector(".add-task input");
let addBtn = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector(".task-content")
let taskCount = document.querySelector(".tasks-count span");
let taskComplete = document.querySelector(".tasks-completed span");

// focus on the input field
window.onload = function() {
    noMessage();
    theInput.focus();
    // localStorage.getItem("tasks");
}

// Add Task
addBtn.onclick = function() {
    //if there is no words
    if(theInput.value === ""){
        swal("You Must Enter Something :(", "", "warning");
    } else {
        let noMsg = document.querySelector(".no-tasks-msg");
        
        // check weather noMsg class is on the page when adding new task or not
        if(document.body.contains(noMsg)){
        // Remove (nothing to show)
            noMsg.remove();

        }

        calculate()
        
        // Create task one (Main Span)
        let MainSpan = document.createElement("span");
        // Add class to the main span 
        MainSpan.className = "task-box";
        // Create the text inside the main span
        let textMS = document.createTextNode(theInput.value);
        // Append the text inside the MS
        MainSpan.appendChild(textMS);
        // Create The Delete Span
        let deleteSpan = document.createElement("span");
        // Add Class To Delete Span
        deleteSpan.className = "delete";
        // Add Text To Delete Span
        let deleteText = document.createTextNode("delete");
        // Append Text To The Delete Span
        deleteSpan.appendChild(deleteText);
        // Add deleteSpan to MainSpan
        MainSpan.appendChild(deleteSpan);

        // ----------------------------------------------------------------------------
        // Add Delete All Button
        let deleteSpanAll = document.createElement("span");
       
        deleteSpanAll.className = "deleteAll";
    
        let deleteTextAll = document.createTextNode("delete All");
     
        deleteSpanAll.appendChild(deleteTextAll);
        
        MainSpan.appendChild(deleteSpanAll);




        // Add mainSpan to task-content
        taskContainer.appendChild(MainSpan);
        // Empty The Input
        theInput.value = "";
        theInput.focus();

        const localArray = [];
        for(let i = 0 ; i < taskContainer.childElementCount ; i++){
            localArray.push(MainSpan[i]);
            console.log(MainSpan.textContent[i]);
            localStorage.setItem("key",MainSpan.textContent[i])
        }

    }



};




document.addEventListener("click",function(e){
   
    // delete task
    if(e.target.className == "delete"){
        // remove current task
        e.target.parentNode.remove();

        if(taskContainer.childElementCount == 0){
            noMessage();
        }
        
    }

        // delete All task
        if(e.target.className == "deleteAll"){
            
            deleteAll();
            if(taskContainer.childElementCount == 0){
                noMessage();
            }
            
        }
        

    //complete task
    if(e.target.classList.contains("task-box")){
        // remove current task
        e.target.classList.toggle("is-finished");
        
    }

    calculate()
    
});

// delete all function
function deleteAll() {
    let x = document.querySelectorAll(".task-box")
    arrayAll = Array.from(x);
    console.log(arrayAll)
    for(let i = 0 ; i < arrayAll.length ; i++){
        arrayAll[i].remove();
    }
}

// create no message to show function 
function noMessage() {
    let mainSpan = document.createElement("span");
  
    let text = document.createTextNode("No Message To Show");
 
    mainSpan.className = "no-tasks-msg";
 
    mainSpan.appendChild(text);

    taskContainer.appendChild(mainSpan);
};

 
function calculate(){
    //calculate tasks-count
    taskCount.innerHTML = document.querySelectorAll(".task-content .task-box").length;
    //calculate completed tasks
    taskComplete.innerHTML = document.querySelectorAll(".task-content .is-finished").length;

}
