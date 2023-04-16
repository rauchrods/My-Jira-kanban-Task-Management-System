let addtaskbtn = document.querySelector(".add-task-btn");
let modaltask = document.querySelector(".modal");
let form = document.querySelector("#add-task-form");
let taskmodalclose = document.querySelector(".close");
let modaladdbutton = document.querySelector("#add-task-btn-modal");
let searchbox = document.querySelector(".search-input-text");


let notstartedarr = [];
let inprogressarr = [];
let completedarr = [];
let global_id = 1;
let editid = -1;
addtaskbtn.addEventListener("click", () => {

    modaltask.style.display = "flex";
});

taskmodalclose.addEventListener("click", () => {

    modaltask.style.display = "none";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let task = document.querySelector("#task-name").value;
    let priority = document.querySelector("#priority").value;
    let date = document.querySelector("#due-date").value;
    let status = document.querySelector("#status").value;

    modaltask.style.display = "none";

    addTask(task, priority, date, status);

});



function addTask(task, priority, date, status) {

    if (modaladdbutton.innerHTML == "Edit Card") {

        let editcardobj = findobj(editid);

        for (let i = 0; i < notstartedarr.length; i++) {
            if (notstartedarr[i].id == editid) {
                notstartedarr[i].task = task;
                notstartedarr[i].priority = priority;
                notstartedarr[i].date = date;
                notstartedarr[i].status = status;
                break;
            }
        }

        for (let i = 0; i < inprogressarr.length; i++) {
            if (inprogressarr[i].id == editid) {
                inprogressarr[i].task = task;
                inprogressarr[i].priority = priority;
                inprogressarr[i].date = date;
                inprogressarr[i].status = status;
                break;
            }
        }

        for (let i = 0; i < completedarr.length; i++) {
            if (completedarr[i].id == editid) {
                completedarr[i].task = task;
                completedarr[i].priority = priority;
                completedarr[i].date = date;
                completedarr[i].status = status;
                break;
            }
        }

        modaladdbutton.innerHTML = "Add Task";

        let tempobj = {};
        for (let i = 0; i < notstartedarr.length; i++) {
            if (notstartedarr[i].status != "not-started") {
                tempobj = notstartedarr[i];
                notstartedarr.splice(i, 1);
                break;
            }

        }

        for (let i = 0; i < inprogressarr.length; i++) {
            if (inprogressarr[i].status != "in-progress") {
                tempobj = inprogressarr[i];
                inprogressarr.splice(i, 1);
                break;
            }

        }

        for (let i = 0; i < completedarr.length; i++) {
            if (completedarr[i].status != "completed") {
                tempobj = completedarr[i];
                completedarr.splice(i, 1);
                break;
            }

        }

        if (tempobj.status == "not-started") {
            notstartedarr.push(tempobj);
        }
        else if (tempobj.status == "in-progress") {
            inprogressarr.push(tempobj);
        }
        else if (tempobj.status == "completed") {
            completedarr.push(tempobj);
        }

        localStorage.setItem("notstartedarr", JSON.stringify(notstartedarr));
        localStorage.setItem("inprogressarr", JSON.stringify(inprogressarr));
        localStorage.setItem("completedarr", JSON.stringify(completedarr));


        alert("Task Edited successfully");
        printCards();
        setPriorityColor();
        dragactions();
        console.log(notstartedarr, inprogressarr, completedarr);
        return;
    }


    let cardobj = {
        id: global_id,
        task: task,
        priority: priority,
        date: date,
        status: status
    }
    global_id++;

    localStorage.setItem("jira_globalid", JSON.stringify(global_id));

    if (status == "not-started") {

        notstartedarr.push(cardobj);
        localStorage.setItem("notstartedarr", JSON.stringify(notstartedarr));
    }
    else if (status == "in-progress") {

        inprogressarr.push(cardobj);
        localStorage.setItem("inprogressarr", JSON.stringify(inprogressarr));

    }
    else if (status == "completed") {

        completedarr.push(cardobj);
        localStorage.setItem("completedarr", JSON.stringify(completedarr));
    }

    console.log(cardobj);
    console.log(notstartedarr, inprogressarr, completedarr);
    printCards();
    setPriorityColor();
    dragactions();
    alert("Task Succesfully added");
}

function printCards() {

    let str = "";

    let notstartedcontainer = document.querySelector("#not-started");
    let inprogresscontainer = document.querySelector("#in-progress");
    let completecontainer = document.querySelector("#completed");

    notstartedarr.forEach(function (cardobj) {
        str += `
        <li class="task-card" id="task-card-${cardobj.id}">
        <div>Task:${cardobj.task}</div>
        <div class="chip-conatiner">
            <div class="priority chip">${cardobj.priority}</div>
            <div class="status chip">${cardobj.status}</div>
            <div><span class="material-icons">calendar_month</span>
                <span>${cardobj.date}</span>
            </div>
        </div>
        <div class="task-changes">
            <span class="material-icons" onclick="editcard(${cardobj.id})">edit</span>
            <span class="material-icons" onclick="deletecard(${cardobj.id})">delete</span>
        </div>
        </li>
        `

    });
    notstartedcontainer.innerHTML = str;

    str = "";
    inprogressarr.forEach(function (cardobj) {
        str += `
        <li class="task-card" id="task-card-${cardobj.id}">
        <div>Task:${cardobj.task}</div>
        <div class="chip-conatiner">
            <div class="priority chip">${cardobj.priority}</div>
            <div class="status chip">${cardobj.status}</div>
            <div><span class="material-icons">calendar_month</span>
                <span>${cardobj.date}</span>
            </div>
        </div>
        <div class="task-changes">
            <span class="material-icons" onclick="editcard(${cardobj.id})">edit</span>
            <span class="material-icons" onclick="deletecard(${cardobj.id})">delete</span>
        </div>
        </li>        
        `

    });
    inprogresscontainer.innerHTML = str;

    str = "";
    completedarr.forEach(function (cardobj) {
        str += `
        <li class="task-card" id="task-card-${cardobj.id}">
        <div>Task:${cardobj.task}</div>
        <div class="chip-conatiner">
            <div class="priority chip">${cardobj.priority}</div>
            <div class="status chip">${cardobj.status}</div>
            <div><span class="material-icons">calendar_month</span>
                <span>${cardobj.date}</span>
            </div>
        </div>
        <div class="task-changes">
            <span class="material-icons" onclick="editcard(${cardobj.id})">edit</span>
            <span class="material-icons" onclick="deletecard(${cardobj.id})">delete</span>
        </div>
        </li>  

        `

    });
    completecontainer.innerHTML = str;


    ifnoTaksPresent();
}

function setPriorityColor() {

    document.querySelectorAll(".task-list").forEach((list) => {
        list.querySelectorAll(".priority").forEach((priorityele) => {
            if (priorityele.innerHTML == "high") {
                priorityele.style.backgroundColor = "#e3242b";
            }
            else if (priorityele.innerHTML == "medium") {
                priorityele.style.backgroundColor = "orange";
            }
            else if (priorityele.innerHTML == "low") {
                priorityele.style.backgroundColor = "#5dbb63";
            }
        })
    });

}


function dragactions() {
    let taskcards = document.querySelectorAll(".task-card");

    taskcards.forEach((taskcard) => {
        taskcard.draggable = true;
    })

    taskcards.forEach((taskcard) => {
        taskcard.addEventListener("dragstart", () => {
            taskcard.classList.add("dragging");
        });
    });

    taskcards.forEach((taskcard) => {
        taskcard.addEventListener("dragend", () => {
            taskcard.classList.remove("dragging");
        });
    });
}




let draggablecontainers = document.querySelectorAll(".task-list");

draggablecontainers.forEach((draggablecontainer) => {
    draggablecontainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        let draggable = document.querySelector(".dragging");
        //  console.log(draggable);

        draggablecontainer.appendChild(draggable);
    });
});

function editcard(myid) {
    console.log(myid);
    modaltask.style.display = "flex";

    modaladdbutton.innerHTML = "Edit Card";
    let editcardobj = findobj(myid);
    console.log(editcardobj);
    document.querySelector("#task-name").value = editcardobj.task;
    document.querySelector("#priority").value = editcardobj.priority;
    document.querySelector("#due-date").value = editcardobj.date;
    document.querySelector("#status").value = editcardobj.status;


    editid = myid;
    // addTask(editcardobj.task, editcardobj.priority, editcardobj.date, editcardobj.status);

}

function deletecard(myid) {
    console.log(myid);

    for (let i = 0; i < notstartedarr.length; i++) {
        if (notstartedarr[i].id == myid) {
            notstartedarr.splice(i, 1);
            break
        }
    }

    for (let i = 0; i < inprogressarr.length; i++) {
        if (inprogressarr[i].id == myid) {
            inprogressarr.splice(i, 1);
            break
        }
    }

    for (let i = 0; i < completedarr.length; i++) {
        if (completedarr[i].id == myid) {
            completedarr.splice(i, 1);
            break
        }
    }


    localStorage.setItem("notstartedarr", JSON.stringify(notstartedarr));
    localStorage.setItem("inprogressarr", JSON.stringify(inprogressarr));
    localStorage.setItem("completedarr", JSON.stringify(completedarr));


    alert("Task sucessfully deleted")
    printCards();
    setPriorityColor();
    dragactions();
    console.log(notstartedarr, inprogressarr, completedarr);
}


function findobj(myid) {   //find in 3 arrays and returns the object.

    for (let cardobj of notstartedarr) {
        if (cardobj.id == myid) {
            return cardobj;
        }
    }


    for (let cardobj of inprogressarr) {
        if (cardobj.id == myid) {
            return cardobj;
        }
    }

    for (let cardobj of completedarr) {
        if (cardobj.id == myid) {
            return cardobj;
        }
    }

}


searchbox.addEventListener("input", () => {

    let searchedtxt = searchbox.value.trim().toLowerCase();

    document.querySelectorAll(".task-list").forEach((list) => {
        list.querySelectorAll(".task-card").forEach((taskcard) => {

            let task = taskcard.querySelector("div:nth-child(1)").textContent.toLowerCase();

            let priority = taskcard.querySelector("div:nth-child(2)>.priority").textContent.toLowerCase();
            let status = taskcard.querySelector("div:nth-child(2)>.status").textContent.toLowerCase();
            let date = taskcard.querySelector("div:nth-child(2)>div:nth-child(3)>span:nth-child(2)").textContent.toLowerCase();

            console.log(task, priority, status, date);

            if (task.includes(searchedtxt) || priority.includes(searchedtxt) || status.includes(searchedtxt) || date.includes(searchedtxt)) {
                taskcard.style.display = "flex";
            }
            else {
                taskcard.style.display = "none";
            }

        });
    });


});

function ifnoTaksPresent() {

    document.querySelectorAll(".task-list").forEach((list) => {
        if (list.innerHTML == "") {
            list.innerHTML = `
             <p>No Tasks added..</P>
           `
        }

    });

}


(() => {

    notstartedarr = JSON.parse(localStorage.getItem("notstartedarr")) || [];
    inprogressarr = JSON.parse(localStorage.getItem("inprogressarr")) || [];
    completedarr = JSON.parse(localStorage.getItem("completedarr")) || [];
    global_id = JSON.parse(localStorage.getItem("jira_globalid")) || 1;
    printCards();
    setPriorityColor();
    dragactions();

})();

