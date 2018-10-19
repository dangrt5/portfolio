<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/src/PHPMailer.php');
require('phpmailer/PHPMailer/src/SMTP.php');

//Validate Post Inputs
$message = [];
$output = [
  'success' => null,
  'messages' => []
];

//Sanitize name field
$message['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
if(empty($message['name'])){
  $output['success'] = false;
  $output['messages'][] = 'missing name key';
}

//Validate email field
$message['email'] = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
if(empty($message['email'])){
  $output['success'] = false;
  $output['messages'][] = 'invalid email key';
}

//Sanitize message
$message['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
if(empty($message['message'])){
  $output['success'] = false;
  $output['messages'][] = 'missing message key';
}


if($output['success'] !== null) {
  http_response_code(422);
  echo json_encode($output);
  exit();
}

//Set up email object
$mail = new PHPMailer\PHPMailer\PHPMailer;
$mail->SMTPDebug = 3;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = EMAIL_USER;  // sender's email address (shows in "From" field)
$mail->FromName = EMAIL_USERNAME;   // sender's name (shows in "From" field)
$mail->addAddress(EMAIL_TO_ADDRESS, EMAIL_USERNAME);  // Add a recipient
$mail->addReplyTo($message['email'], $message['name']); // Add a reply-to address

$mail->isHTML(true);                                  // Set email format to HTML
$message['message'] = nl2br($message['message']); //convert newline characters to line break html tags

$mail->Body    = $message['message'];
$mail->AltBody = htmlentities($messages['message']);


// Attempt email send, output result to client
if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['success'] = true;
}
echo json_encode($output);




?>
