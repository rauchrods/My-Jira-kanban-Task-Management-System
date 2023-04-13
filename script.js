let addtaskbtn = document.querySelector(".add-task-btn");
let modaltask = document.querySelector(".modal");
let form = document.querySelector("#add-task-form");
let taskmodalclose = document.querySelector(".close");




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
    alert("Task Succesfully added");
    addTask(task, priority, date, status);

});

function addTask(task, priority, date, status) {
    if (status == "not-started") {
        let notstartedcontainer = document.querySelector("#not-started");

        notstartedcontainer.innerHTML += `
      <li class="task-card">
      <div >${task}</div>
      <div class="priority chip">${priority}</div>
      <div class="status chip">${status}</div>
      <div>DUE:${date}</div>
      </li>
      `
    }
    else if (status == "in-progress") {

        let inprogresscontainer = document.querySelector("#in-progress");

        inprogresscontainer.innerHTML += `
      <li class="task-card">
      <div >${task}</div>
      <div class="priority chip">${priority}</div>
      <div class="status chip">${status}</div>
      <div>DUE:${date}</div>
      </li>
      `

    }
    else if (status == "completed") {
        let completecontainer = document.querySelector("#completed");

        completecontainer.innerHTML += `
      <li class="task-card">
      <div >${task}</div>
      <div class="priority chip">${priority}</div>
      <div class="status chip">${status}</div>
      <div>DUE:${date}</div>
      </li>
      `
    }


    setPriorityColor();
    dragactions();
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
         console.log(draggable);
     
       draggablecontainer.appendChild(draggable);
    });
});
