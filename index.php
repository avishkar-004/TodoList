<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST["task"]) && !empty($_POST["task"])) {
    $stmt = $conn->prepare("INSERT INTO Task (Task, Completed) VALUES (?, 0)");
    $stmt->bind_param("s", $_POST["task"]);
    $stmt->execute();
    $stmt->close();
    header("Location: index.php");
    exit();
}

if (isset($_POST["update"])) {
    $stmt = $conn->prepare("UPDATE Task SET Completed = 1 WHERE id = ?");
    $stmt->bind_param("i", $_POST["update"]);
    $stmt->execute();
    $stmt->close();
    header("Location: index.php");
    exit();
}

$RemainingTask = $conn->query("SELECT * FROM Task WHERE Completed = 0 ORDER BY CreatedDate");
$CompletedTask = $conn->query("SELECT * FROM Task WHERE Completed = 1 ORDER BY CreatedDate DESC");

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo - PHP Version</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Todo List</h1>
        <form action="index.php" method="post" class="input-container">
            <textarea id="task" name="task" placeholder="Enter a task..."></textarea>
            <button type="submit">ADD</button>
        </form>

        <h2>Remaining Tasks</h2>
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($x = $RemainingTask->fetch_assoc()) { ?>
                <tr>
                    <td><?php echo htmlspecialchars($x["Task"]); ?></td>
                    <td><?php echo $x["CreatedDate"]; ?></td>
                    <td>
                        <form action="index.php" method="post">
                            <input type="hidden" name="update" value="<?php echo $x['id']; ?>">
                            <button type="submit" class="complete-btn">Complete</button>
                        </form>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>

        <h2>Completed Tasks</h2>
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($x = $CompletedTask->fetch_assoc()) { ?>
                <tr>
                    <td><?php echo htmlspecialchars($x["Task"]); ?></td>
                    <td><?php echo $x["CreatedDate"]; ?></td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
</body>
</html>
