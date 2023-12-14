let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

window.onload = function() {
  loadTasks();
  populateSidebar(); 
};

function loadTasks() {
  var taskList = document.getElementById("taskList");
  var tasks = localStorage.getItem("tasks");

  if (tasks) {
    taskList.innerHTML = tasks;
    var listItems = document.querySelectorAll("#taskList li");

    listItems.forEach(function(li) {
      li.ondblclick = function() {
        makeTaskEditable(li);
      };

      let circleSpan = li.querySelector('.circle');
      circleSpan.onclick = function(event) {
        event.stopPropagation();
        li.classList.toggle("checked");
        markTaskAsCompleted(li);
        setTimeout(function() {
          li.remove();
          saveTasks();
        }, 4000);
      };

      let textSpan = li.querySelector('span:last-child');
      textSpan.onclick = function(event) {
        event.stopPropagation();
      };
    });
  }
}

function saveTasks() {
  var taskList = document.getElementById("taskList");
  localStorage.setItem("tasks", taskList.innerHTML);
}

function markTaskAsCompleted(taskElement) {
  const taskName = taskElement.querySelector("span:last-child").innerText;
  const timestamp = new Date().toLocaleString();
  
  const taskDetails = {
    taskName: taskName,
    timestamp: timestamp
  };

  completedTasks.push(taskDetails);
  saveCompletedTasks();
}

function saveCompletedTasks() {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function populateSidebar() {
  const sidebar = document.getElementById('sidebar');

  const historyHTML = completedTasks.map(task => {
    return `<div class="history-item">
              <p>${task.taskName}</p>
              <p class="timestamp">${task.timestamp}</p>
            </div>`;
  }).join('');

  sidebar.innerHTML = historyHTML;
}

function makeTaskEditable(taskElement) {
  const textSpan = taskElement.querySelector("span:last-child");
  textSpan.contentEditable = true;
  textSpan.focus();

  textSpan.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      textSpan.contentEditable = false;
      textSpan.blur();
      saveTasks();
    }
  });

  textSpan.addEventListener('blur', function() {
    textSpan.contentEditable = false;
    saveTasks();
  });
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

    li.ondblclick = function() {
      makeTaskEditable(li);
    };

    circleSpan.onclick = function(event) {
      event.stopPropagation();
      li.classList.toggle("checked");
      markTaskAsCompleted(li);
      setTimeout(function() {
        li.remove();
        saveTasks();
      }, 4000);
    };

    textSpan.onclick = function(event) {
      event.stopPropagation();
    };
  }

  taskInput.value = "";
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show'); 

  if (sidebar.classList.contains('show')) {
    populateSidebar(); 
  }
}
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && document.activeElement === document.getElementById('taskInput')) {
    addTask();
  }
});
