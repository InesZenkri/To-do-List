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

function markTaskAsCompleted(taskElement) {
  const taskName = taskElement.querySelector(".task-text").innerText;
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

function showDeletedTasks() {
  const deletedTasksList = document.getElementById('deletedTasksList');
  const containerWidth = document.querySelector('.dropdown').offsetWidth;
  const deletedHTML = completedTasks.map(task => {
    return `<li class="deleted-task">
              <span class="deltxt">${task.taskName}</span>
              <span class="timestamp">${task.timestamp}</span>
            </li>`;
  }).join('');

  deletedTasksList.innerHTML = deletedHTML;
  
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


let dropdownVisible = false;

function toggleDropdown() {
  const dropdown = document.querySelector('#deletedTasksList');
  const upIcon = document.querySelector('.up-icon');

  dropdownVisible = !dropdownVisible;
  
  if (dropdownVisible) {
    upIcon.classList.add('rotate');
    dropdown.classList.toggle('show');
    
  } else {
    upIcon.classList.remove('rotate');
    dropdown.classList.toggle('hidden'); 
  }
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
