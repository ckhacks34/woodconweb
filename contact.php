<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $to = "ngongochris415@gmail.com";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $email_body = "You have received a new message from your website contact form.<br><br>" .
                 "Name: $name<br>" .
                 "Email: $email<br>" .
                 "Subject: $subject<br>" .
                 "Message:<br>$message";
    
    if(mail($to, $subject, $email_body, $headers)) {
        header('Location: index.html?status=success#contact');
    } else {
        header('Location: index.html?status=error#contact');
    }
} else {
    header('Location: index.html');
}
?>
