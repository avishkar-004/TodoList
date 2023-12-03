var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');
var filterBtns = document.querySelectorAll('.filter-btn');
var clearCompletedBtn = document.getElementById('clearCompleted');
var clearAllBtn = document.getElementById('clearAll');
var themeToggle = document.getElementById('themeToggle');
var currentFilter = 'all';
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var isDark = localStorage.getItem('darkMode') === 'true';

// Theme
if (isDark) {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', function() {
  isDark = !isDark;
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('darkMode', isDark);
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

clearCompletedBtn.addEventListener('click', function() {
  taskList.querySelectorAll('.task.completed').forEach(function(item) { item.remove(); });
  saveTasks();
});

clearAllBtn.addEventListener('click', function() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    taskList.innerHTML = '';
    saveTasks();
  }
});

function applyFilter() {
  var items = taskList.querySelectorAll('.task');
  items.forEach(function(item) {
    var isCompleted = item.classList.contains('completed');
    if (currentFilter === 'all') item.style.display = 'flex';
    else if (currentFilter === 'completed') item.style.display = isCompleted ? 'flex' : 'none';
    else item.style.display = isCompleted ? 'none' : 'flex';
  });
}

function updateCounts() {
  var all = taskList.querySelectorAll('.task');
  var done = taskList.querySelectorAll('.task.completed');
  document.getElementById('totalCount').textContent = 'Total: ' + all.length;
  document.getElementById('completedCount').textContent = 'Done: ' + done.length;
  document.getElementById('pendingCount').textContent = 'Pending: ' + (all.length - done.length);
}

function saveTasks() {
  var data = [];
  taskList.querySelectorAll('.task').forEach(function(item) {
    data.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(data));
  updateCounts();
  applyFilter();
}

function addTask() {
  var text = taskInput.value.trim();
  if (text === '') { alert('Please enter a task.'); return; }
  createTaskElement(text, false);
  taskInput.value = '';
  saveTasks();
  taskInput.focus();
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

  var editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', function() {
    var newText = prompt('Edit task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
      saveTasks();
    }
  });

  var deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', function() {
    li.remove();
    saveTasks();
  });

  var btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

function loadTasks() {
  tasks.forEach(function(task) {
    createTaskElement(task.text, task.completed);
  });
  updateCounts();
}

loadTasks();
