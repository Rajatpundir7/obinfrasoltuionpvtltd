<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// If JSON decode failed, try form data
if (!$data) {
    $data = $_POST;
}

// Validate required fields
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$subject = isset($data['subject']) ? trim($data['subject']) : 'Contact Form Submission';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Sanitize input
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');

// Email configuration
$to = 'ombalaji.ltd@gmail.com';
$emailSubject = "New Contact Form Submission: $subject";
$emailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0B5ED7, #0A4EB4); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .field label { font-weight: bold; color: #0B5ED7; }
        .field-value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <label>Name:</label>
                <div class='field-value'>$name</div>
            </div>
            <div class='field'>
                <label>Email:</label>
                <div class='field-value'>$email</div>
            </div>
            " . (!empty($phone) ? "<div class='field'><label>Phone:</label><div class='field-value'>$phone</div></div>" : "") . "
            <div class='field'>
                <label>Subject:</label>
                <div class='field-value'>$subject</div>
            </div>
            <div class='field'>
                <label>Message:</label>
                <div class='field-value'>" . nl2br($message) . "</div>
            </div>
        </div>
    </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: OMBALAJI Website <noreply@ombalajiinfra.com>" . "\r\n";
$headers .= "Reply-To: $name <$email>" . "\r\n";

// Send email
if (mail($to, $emailSubject, $emailBody, $headers)) {
    // Save to file (optional backup)
    $logEntry = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Phone: $phone | Subject: $subject\n";
    file_put_contents('contact_log.txt', $logEntry, FILE_APPEND);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! We will contact you shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}
?>

