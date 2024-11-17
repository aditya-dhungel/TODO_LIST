function startTodoListApp() {
  const input = document.getElementById("todo-input");
  const form = document.getElementById("todo-form");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTasks(input.value);
    input.value = "";
    // toggleTodoVisibility();
    syncTasks();
  });

  // save the tasks to local storage
  function syncTasks() {
    const tasks = [];
    const currentTasks = list.querySelectorAll(".todo-task");

    currentTasks.forEach((task) => {
      const label = task.querySelector(".todo-task-label").innerText;
      const checked = task
        .querySelector(".todo-task-checked")
        .classList.contains("checked");
      tasks.push({ label, checked });
    });
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  //toggle the visibility of the todo list
  // function toggleTodoVisibility() {
  //   const todo = document.querySelector(".todo");
  //   const heading = todo.querySelector(".your-tasks");
  
  //   if (todo.children.length === 0) {
  //     // Hide the .todo box (including the border and the heading)
  //     todo.style.display = "none";
  //   } else {
  //     // Show the .todo box and the heading
  //     todo.style.display = "flex"; // flex or block, based on your desired layout
  //     heading.style.display = "block"; // Ensure the heading is visible when tasks are present
  //   }
  // }
  

  function addTasks(label, checked = false) {
    //to prevent empty labels being aadded
    if (label.trim() === "") return;

    const todo = document.querySelector(".todo");

    const item = document.createElement("li");
    item.classList.add("todo-task");

    const taskLabel = document.createElement("span");
    taskLabel.classList.add("todo-task-label");
    taskLabel.innerText = label;

    const checkedTask = document.createElement("img");
    checkedTask.classList.add("todo-task-checked");

    if (checked) {
      checkedTask.classList.add("checked");
      checkedTask.src = "assets/checked.svg"; // checked icon
    } else {
      checkedTask.classList.add("unchecked");
      checkedTask.src = "assets/unchecked.svg"; // unchecked icon
    }
    checkedTask.alt = "task unchecked";

    checkedTask.addEventListener("click", () => {
      checkedTask.classList.toggle("checked");
      checkedTask.classList.toggle("unchecked");

      // if (checkedTask.classList.contains("checked")) {
      //   checkedTask.src = "assets/checked.svg"; // Checked icon
      // } else {
      //   checkedTask.src = "assets/unchecked.svg"; // Unchecked icon
      // }
      checkedTask.src = checkedTask.classList.contains("checked")
        ? "assets/checked.svg"
        : "assets/unchecked.svg";
      syncTasks();
    });
    
    //edit task button
    const editTask = document.createElement("img");
    editTask.classList.add("todo-task-edit");

  editTask.src = "assets/edit.svg";
  editTask.alt = "task-edit";
  editTask.className = "edit";

  editTask.addEventListener("click", () => {
    if (editTask.alt === "task-edit") {
      // Switch to "Save" mode
      input.value = taskLabel.innerText;
      input.focus();
      editTask.src = "assets/edit.svg";
      editTask.alt = "task-save";
    } else if (editTask.alt === "task-save" && input.value.trim().length > 0) {
      // Save changes and switch back to "Edit" mode
      taskLabel.innerText = input.value.trim();
      input.value = "";
      editTask.src = "assets/edit.svg";
      editTask.alt = "task-edit";
      syncTasks();
    }
  });


    //delete task button
    const deleteTask = document.createElement("img");
    deleteTask.classList.add("todo-task-delete");
    deleteTask.src = "assets/trash.svg";
    deleteTask.alt = "delete task";
    deleteTask.addEventListener("click", () => {
      item.remove();
      syncTasks();
    });
    item.append(taskLabel, editTask,checkedTask, deleteTask);
    list.appendChild(item);
    syncTasks();
  }

  const previousTasks = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  console.log("Previous Tasks", previousTasks);
  previousTasks.forEach((task) => addTasks(task.label, task.checked));
  // syncTasks();
}
startTodoListApp();
