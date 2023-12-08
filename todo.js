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
    }
  
    taskInput.value = ""; 

    li.onclick = function() {
      if (!li.classList.contains("checked")) {
        li.classList.add("checked");
        setTimeout(function() {
          li.remove(); 
        }, 4000); 
      }
    };
  }
  