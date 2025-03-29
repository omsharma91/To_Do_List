let text = document.getElementById("inputt");
let addbutton = document.querySelector("#addbtn");
let container = document.getElementById("container");
let options = document.querySelector(".options");
let editIndex = -1; 
let addtodo = null;
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

const addToDo = () => {
  let name = text.value.trim();
  if (name.length <= 0) {
    alert("Provide some value");
    return;
  }

  let tasks = getTasks();
  let data = { name, status: "pending" };

  if (addbutton.innerText === "edit") {
    tasks[editIndex] = data;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addtodo.target.previousElementSibling.innerHTML = data.name;
    addbutton.innerText = "Add";
    text.value = "";
    loadTasks(); 
  } else {
    tasks.push(data);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(data, tasks.length - 1);
    text.value = "";
  }
};

const renderTask = (task, index) => {
  const li = document.createElement("div");
  const p = document.createElement("p");
  const edit = document.createElement("button");
  const remove = document.createElement("button");
  const select = document.createElement("select");

  li.setAttribute("class", "task1");
  p.setAttribute("class", "text");
  p.textContent = task.name;

  edit.innerText = "Edit";
  remove.innerText = "Delete";
  edit.setAttribute("class", "edit");
  remove.setAttribute("class", "delete");

  const pendingOption = document.createElement("option");
  const completedOption = document.createElement("option");
  pendingOption.innerText = "pending";
  completedOption.innerText = "completed";

  select.appendChild(pendingOption);
  select.appendChild(completedOption);
  select.value = task.status;
  select.classList.add("selects");
  select.setAttribute("data-index", index);

  li.append(p, edit, remove, select);
  container.appendChild(li);

  select.addEventListener("change", (e) => {
    let newStatus = e.target.value;
    let tasks = getTasks();
    tasks[index].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
};

const loadTasks = () => {
  container.innerHTML = "";
  getTasks().forEach((task, index) => renderTask(task, index));
};

const edittask = (e) => {
  editIndex = e.target.getAttribute("data-index");
  text.value = e.target.previousElementSibling.innerText;
  text.focus();
  addbutton.innerText = "edit";
  addtodo = e;
};

const deltask = (e) => {
  if (e.target.innerText === "Delete") {
    let index = e.target.getAttribute("data-index");
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); 
  }
};

const option = (e) => {
  let tasks = getTasks();
  Array.from(container.getElementsByClassName("task1")).forEach((task, index) => {
    let taskStatus = tasks[index].status;
    switch (e.target.innerText) {
      case "ALL TASK":
        task.classList.remove("hide");
        break;
      case "COMPLETED TASK":
        task.classList.toggle("hide", taskStatus !== "completed");
        break;
      case "PENDING TASK":
        task.classList.toggle("hide", taskStatus !== "pending");
        break;
      default:
        alert("Some error occurred. Sorry for the inconvenience.");
    }
  });
};

addbutton.addEventListener("click", addToDo);
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) edittask(e);
  else if (e.target.classList.contains("delete")) deltask(e);
});
options.addEventListener("click", option);
window.addEventListener("DOMContentLoaded", loadTasks);
