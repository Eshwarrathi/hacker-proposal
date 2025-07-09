<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['answer'])) {
    $answer = htmlspecialchars($_POST['answer']);
    $date = date("Y-m-d H:i:s");
    $entry = "Response: $answer - at $date\n";

    file_put_contents("response_log.txt", $entry, FILE_APPEND | LOCK_EX);
    echo "✅ Response saved successfully!";
} else {
    echo "❌ Invalid request.";
}
?>
