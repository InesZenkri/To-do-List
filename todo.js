// Function to load tasks from localStorage when the page loads
window.onload = function() {
  loadTasks();
};

function loadTasks() {
  var taskList = document.getElementById("taskList");
  var tasks = localStorage.getItem("tasks");
  
  if (tasks) {
    taskList.innerHTML = tasks;
    var listItems = document.querySelectorAll("#taskList li");
    
    listItems.forEach(function(li) {
      li.onclick = function() {
        if (!li.classList.contains("checked")) {
          li.classList.add("checked");
          setTimeout(function() {
            li.remove();
            saveTasks(); 
          }, 4000);
        }
      };
    });
  }
}

function saveTasks() {
  var taskList = document.getElementById("taskList");
  localStorage.setItem("tasks", taskList.innerHTML);
}

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  var li = document.createElement("li");
  var inputValue = taskInput.value;

  var circleSpan = document.createElement("span");
  circleSpan.className = "circle";
  li.appendChild(circleSpan);

  var textSpan = document.createElement("span");
  var textNode = document.createTextNode(inputValue);
  textSpan.appendChild(textNode);
  li.appendChild(textSpan);

  if (inputValue === '') {
    alert("Please enter a task!");
  } else {
    taskList.appendChild(li);
    saveTasks(); 
  }

  taskInput.value = "";

  li.onclick = function() {
    if (!li.classList.contains("checked")) {
      li.classList.add("checked");
      setTimeout(function() {
        li.remove();
        saveTasks();
      }, 4000);
    }
  };
}
