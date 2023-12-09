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
taskInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') addTask(); });

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
  if (confirm('Delete all tasks?')) { taskList.innerHTML = ''; saveTasks(); }
});

function applyFilter() {
  taskList.querySelectorAll('.task').forEach(function(item) {
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
      text: item.querySelector('.task-text').textContent,
      completed: item.classList.contains('completed'),
      timestamp: item.querySelector('.task-time').textContent
    });
  });
  localStorage.setItem('tasks', JSON.stringify(data));
  updateCounts();
  applyFilter();
}

function addTask() {
  var text = taskInput.value.trim();
  if (text === '') { alert('Please enter a task.'); return; }
  var now = new Date().toLocaleString();
  createTaskElement(text, false, now);
  taskInput.value = '';
  saveTasks();
  taskInput.focus();
}

function createTaskElement(text, completed, timestamp) {
  var li = document.createElement('li');
  li.className = 'task';
  if (completed) li.classList.add('completed');

  var content = document.createElement('div');
  content.className = 'task-content';

  var span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;
  span.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();
  });

  var time = document.createElement('small');
  time.className = 'task-time';
  time.textContent = timestamp || '';

  content.appendChild(span);
  content.appendChild(time);

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
  deleteBtn.addEventListener('click', function() { li.remove(); saveTasks(); });

  var btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(content);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

function loadTasks() {
  tasks.forEach(function(task) {
    createTaskElement(task.text, task.completed, task.timestamp);
  });
  updateCounts();
}

loadTasks();

// Drag and drop reordering
taskList.addEventListener('dragover', function(e) {
  e.preventDefault();
  var dragging = taskList.querySelector('.dragging');
  var afterElement = getDragAfterElement(taskList, e.clientY);
  if (afterElement == null) {
    taskList.appendChild(dragging);
  } else {
    taskList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  var elements = Array.from(container.querySelectorAll('.task:not(.dragging)'));
  return elements.reduce(function(closest, child) {
    var box = child.getBoundingClientRect();
    var offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
