const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add a new task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.className = 'task';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => taskItem.remove());

  taskItem.appendChild(taskSpan);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  taskInput.value = '';
});

// Add task with Enter key
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});
