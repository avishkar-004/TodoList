<?php
$servername = "103.216.146.100";
$username = "avishkar_Todo";
$password = "Gladiator@1204";
$dbname = "avishkar_Todo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert Task
if (isset($_POST["task"]) && !empty($_POST["task"])) {
    $stmt = $conn->prepare("INSERT INTO Task (Task, Completed) VALUES (?, 0)");
    $stmt->bind_param("s", $_POST["task"]);
    $stmt->execute();
    $stmt->close();
    
    // Reload page after insertion
    header("Location: index.php");
    exit();
}

// Mark Task as Completed
if (isset($_POST["update"])) {
    $stmt = $conn->prepare("UPDATE Task SET Completed = 1 WHERE id = ?");
    $stmt->bind_param("i", $_POST["update"]);
    $stmt->execute();
    $stmt->close();
    
    // Reload page after update
    header("Location: index.php");
    exit();
}

// Fetch Remaining and Completed Tasks
$RemainingTask = $conn->query("SELECT * FROM Task WHERE Completed = 0 order by CreatedDate");
$CompletedTask = $conn->query("SELECT * FROM Task WHERE Completed = 1 order by CreatedDate desc ");

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div>
        <form action="index.php" method="post">
            <label for="task">Task</label>
            <textarea id="task" name="task"></textarea>
            <button type="submit">ADD</button>
        </form>
    </div>

    <div>
        <h1>Remaining Tasks</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Created Date</th>
                    <th>Mark as Completed</th>
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
                            <button type="submit">Complete Task</button>
                        </form>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <div>
        <h1>Completed Tasks</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Completed Date</th>
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
