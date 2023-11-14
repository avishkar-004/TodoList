var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

function saveTasks() {
  var data = [];
  var items = taskList.querySelectorAll('.task');
  items.forEach(function(item) {
    data.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(data));
}

function addTask() {
  var text = taskInput.value.trim();
  if (text === '') {
    alert('Please enter a task.');
    return;
  }
  createTaskElement(text, false);
  taskInput.value = '';
  saveTasks();
}

function createTaskElement(text, completed) {
  var li = document.createElement('li');
  li.className = 'task';
  if (completed) li.classList.add('completed');

  var span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();
  });

  var deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', function() {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function loadTasks() {
  tasks.forEach(function(task) {
    createTaskElement(task.text, task.completed);
  });
}

loadTasks();
