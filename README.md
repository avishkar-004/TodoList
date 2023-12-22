# Todo List

A simple and feature-rich todo list application with both a client-side JavaScript version and a server-side PHP version.

## Features

### JavaScript Version (index.html)
- Add, edit, and delete tasks
- Mark tasks as completed with click
- Filter tasks: All / Pending / Completed
- Search tasks in real-time
- Dark mode toggle with persistence
- Drag and drop task reordering
- Task creation timestamps
- Task counter (total, completed, pending)
- localStorage persistence
- Responsive design

### PHP Version (index.php)
- Server-side task management with MySQL
- Add new tasks
- Mark tasks as completed
- Separate remaining and completed task views

## How to Run

### JavaScript Version
Simply open `index.html` in any modern web browser. No server required.

### PHP Version
1. Set up a MySQL database with a `Task` table:
```sql
CREATE TABLE Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Task TEXT NOT NULL,
    Completed TINYINT DEFAULT 0,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
2. Update database credentials in `index.php`
3. Serve with PHP: `php -S localhost:8000`

## Tech Stack

- HTML5, CSS3, JavaScript (ES5+)
- PHP 7+ / MySQL (server version)
- localStorage API
