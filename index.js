window.onload = function () {
  addTaskInList();
};


const inputValue = document.getElementById("task");
const AddTask = document.getElementById("addBtn");
let storedTasks = [];
storedTasks = JSON.parse(localStorage.getItem("Items")) || [];
let edit_id = null;

// Task add function *********************************

AddTask.addEventListener("click", (e) => {
  e.preventDefault();
  let Task = inputValue.value;

  if (edit_id !== null) {
    //edit
    storedTasks.splice(edit_id, 1, Task);
    edit_id = null;
  } else {
    //insert
    storedTasks.push(Task); // Add new task to array
  }

  localStorage.setItem("Items", JSON.stringify(storedTasks)); // Save updated array to local storage
  inputValue.value = "";
  addTaskInList();
  AddTask.innerHTML = "Add Task";
});


// Add task in List **********************************

function addTaskInList() {
  let gettask = JSON.parse(localStorage.getItem("Items"));
  let newtask = "";

  if (gettask.length === 0) {
    console.log(gettask)
    newtask = "<li class='text-muted'>No tasks found.</li>";
  } else {
    gettask.forEach((item, i) => {
      newtask += ` 
          <li class="" id=${i}>
            <input type="checkbox" class='check-box'/>
            <span class="font-weight-bold">${item}</span>
            <div class="buttons d-flex gap-3">
              <span class="text-primary edit-btn" onclick ="editInfo(${i})">Edit</span>
              <span class="text-danger delete-btn"  onclick ="deleteItem(${i})">Delete</span>
            </div>
          </li>
        `;
    });
  }

  document.getElementById("task_body").innerHTML = newtask;

}


// Delete task from list *******************************



function deleteItem(index) {
  storedTasks.splice(index, 1);
  localStorage.setItem("Items", JSON.stringify(storedTasks));
  addTaskInList();
}



// Edit task from list *******************************


// add event listener for edit button in each task item
function editInfo(id) {
  edit_id = id;
  inputValue.value = storedTasks[id];
  AddTask.innerHTML = "Save Task";
}



const allTask = document.getElementById("Alltask");
const pendingTask = document.getElementById("pending_task");
const completedTask = document.getElementById("complete_task");

let activeBtn = allTask; // initially set the "All Task" button as active

allTask.addEventListener("click", () => {
  activeBtn.classList.remove("active"); // remove the "active" class from the previous button
  allTask.classList.add("active");
  activeBtn = allTask; // set the current button as the active button
  showAllTasks();
});

pendingTask.addEventListener("click", () => {
  activeBtn.classList.remove("active"); // remove the "active" class from the previous button
  pendingTask.classList.add("active");
  activeBtn = pendingTask; // set the current button as the active button
  showPendingTasks();
});

completedTask.addEventListener("click", () => {
  activeBtn.classList.remove("active"); // remove the "active" class from the previous button
  completedTask.classList.add("active");
  activeBtn = completedTask; // set the current button as the active button
  showCompletedTasks();
});

function showCompletedTasks() {
  const tasks = document.querySelectorAll("#task_body li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".check-box");
    if (checkbox.checked) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function showPendingTasks() {
  const tasks = document.querySelectorAll("#task_body li");
  tasks.forEach((task) => {
    const checkbox = task.querySelector(".check-box");
    if (!checkbox.checked) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

function showAllTasks() {
  const tasks = document.querySelectorAll("#task_body li");
  tasks.forEach((task) => {
    task.style.display = "flex";
  });
}




// clear All task from Local storage ***************************



const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", clearTask);
function clearTask() {
  window.localStorage.clear();
  console.log("clear");

  // Remove list items from the DOM
  const taskList = document.getElementById("task_body");
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Set the "Items" key to an empty array in localStorage
  localStorage.setItem("Items", JSON.stringify([]));
  storedTasks.length = 0;
  addTaskInList();
}
