let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

window.onload = function() {
  loadTasks();
  //const upIcon = document.querySelector('.up-icon');
  //upIcon.style.transform = 'scaleY(-1)';
  document.querySelector('.up-icon').addEventListener('click', function() {
    showDeletedTasks(); 
    toggleDropdown();
  });
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

      let editIcon = li.querySelector('.edit-icon');
      editIcon.onclick = function(event) {
        event.stopPropagation();
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
        }, 1000
        );
      };

      let textSpan = li.querySelector('.task-text');
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


function getDeletedTasksLength() {
  const deletedTasksJSON = localStorage.getItem('completedTasks');
  if (deletedTasksJSON) {
    const deletedTasks = JSON.parse(deletedTasksJSON);
    return deletedTasks.length;
  } else {
    return 0; 
  }
}

function undoTask(taskName, timestamp) {
  const dropdown = document.querySelector('#deletedTasksList');
  const upIcon = document.querySelector('.up-icon');
  const taskIndex = completedTasks.findIndex(task => task.taskName === taskName && task.timestamp === timestamp);
  if (taskIndex !== -1) {
    const undoneTask = completedTasks.splice(taskIndex, 1)[0];
    saveCompletedTasks();
    addTaskBackToTaskList(undoneTask.taskName);
    showDeletedTasks();
    if(getDeletedTasksLength() === 0){
      upIcon.classList.toggle('rotate2');
      dropdown.classList.toggle('hidden'); 
    }
  }
}

function addTaskBackToTaskList(taskName) {
  var taskList = document.getElementById("taskList");
  var li = document.createElement("li");
  var inputValue = taskName; 

  var circleSpan = document.createElement("span");
  circleSpan.className = "circle";
  li.appendChild(circleSpan);

  var textSpan = document.createElement("span");
  textSpan.className = "task-text";
  var textNode = document.createTextNode(inputValue);
  textSpan.appendChild(textNode);
  li.appendChild(textSpan);

  var editIcon = document.createElement("img");
  editIcon.src = "srs/edit.png";
  editIcon.alt = "Edit";
  editIcon.className = "edit-icon";
  editIcon.setAttribute("title", "Edit"); 
  li.appendChild(editIcon);
  taskList.appendChild(li);
  saveTasks();
  li.ondblclick = function() {
    makeTaskEditable(li);
  };

  editIcon.onclick = function(event) {
    event.stopPropagation();
    makeTaskEditable(li);
  };

  circleSpan.onclick = function(event) {
    event.stopPropagation();
    li.classList.toggle("checked");
    markTaskAsCompleted(li);
    setTimeout(function() {
      li.remove();
      saveTasks();
    }, 1000
    );
  };

  textSpan.onclick = function(event) {
    event.stopPropagation();
  };
}

function makeTaskEditable(taskElement) {
  const textSpan = taskElement.querySelector(".task-text");
  textSpan.contentEditable = true;
  textSpan.focus();

  textSpan.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      textSpan.contentEditable = false;
      textSpan.blur();
      saveTasks();
    }
  });

  textSpan.addEventListener("blur", function () {
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
  textSpan.className = "task-text";
  var textNode = document.createTextNode(inputValue);
  textSpan.appendChild(textNode);
  li.appendChild(textSpan);

  var editIcon = document.createElement("img");
  editIcon.src = "srs/edit.png";
  editIcon.alt = "Edit";
  editIcon.className = "edit-icon";
  editIcon.setAttribute("title", "Edit"); 
  li.appendChild(editIcon);

  if (inputValue === '') {
    alert("Please enter a task!");
  } else {
    taskList.appendChild(li);
    saveTasks();

    li.ondblclick = function() {
      makeTaskEditable(li);
    };

    editIcon.onclick = function(event) {
      event.stopPropagation();
      makeTaskEditable(li);
    };

    circleSpan.onclick = function(event) {
      event.stopPropagation();
      li.classList.toggle("checked");
      markTaskAsCompleted(li);
      setTimeout(function() {
        li.remove();
        saveTasks();
      }, 1000
      );
    };

    textSpan.onclick = function(event) {
      event.stopPropagation();
    };
  }

  taskInput.value = "";
}

function getDeletedTasks() {
  const deletedTasksJSON = localStorage.getItem('completedTasks');
  if (deletedTasksJSON) {
    const deletedTasks = JSON.parse(deletedTasksJSON);
    return deletedTasks;
  } else {
    return [];
  }
}

let dropdownVisible = false;

function toggleDropdown() {
  const dropdown = document.querySelector('#deletedTasksList');
  const upIcon = document.querySelector('.up-icon');
  const deletedTasks = getDeletedTasks();
  if (completedTasks.length === 0 && deletedTasks.length === 0) {
    alert("Empty Archive");
  } else {
    dropdownVisible = !dropdownVisible;
    
    if (dropdownVisible) {
      upIcon.classList.toggle('rotate1');
      dropdown.classList.toggle('show');
      
    } else {
      upIcon.classList.toggle('rotate2');
      dropdown.classList.toggle('hidden'); 
    }
  }
}


function markTaskAsCompleted(taskElement) {
  const taskName = taskElement.querySelector(".task-text").innerText;
  const dropdown = document.querySelector('#deletedTasksList');
  const timestamp = new Date().toLocaleString();
  
  const taskDetails = {
    taskName: taskName,
    timestamp: timestamp
  };
  completedTasks.push(taskDetails);
  saveCompletedTasks();
  if(dropdown.classList.contains('show')) {
    console.log('habtet');
    showDeletedTasks();
}
}

function saveCompletedTasks() {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function showDeletedTasks() {
  const deletedTasksList = document.getElementById('deletedTasksList');
  const containerWidth = document.querySelector('.dropdown').offsetWidth;
  const deletedHTML = completedTasks.map(task => {
    return `<li class="deleted-task">
              <span class="deltxt">${task.taskName}</span>
              <span class="timestamp">${task.timestamp}</span>
              <img src="srs/undo.png" alt="Undo" class="undo-icon" title="Undo" onclick="undoTask('${task.taskName}', '${task.timestamp}')">
            </li>`;
  }).join('');

  deletedTasksList.innerHTML = deletedHTML;
  
}


/*
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
*/
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && document.activeElement === document.getElementById('taskInput')) {
    addTask();
  }
});
