var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);

function addTask() {
  var text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task.');
    return;
  }

  var li = document.createElement('li');
  li.className = 'task';

  var span = document.createElement('span');
  span.textContent = text;

  var deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', function() {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
}

taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
