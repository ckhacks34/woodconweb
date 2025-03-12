<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];  

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = "chrismoses2b2@gmail.com";
        $mail->Password = "fnul kieb veka cdlx";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress("ngongochris415@gmail.com", "Chris Ngongo");

        $mail-> subject = "New Contact Form Submission";
        $mail-> Body = "Name: $name\n". 
                       "Email: $email\n".
                       "Messege: $message\n";
        if($mail-> send()){
            echo "Messenge sent successfully";
        }
        else{
            echo "Messenge could not be sent, Error: {$mail->ErrorInfo}";
        }
    } catch (Exception $e) {
        echo "Messenge could not be sent, Error: {$mail->ErrorInfo}";

    }


}
?>