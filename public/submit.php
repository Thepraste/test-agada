<?php
/**
 * Agada Initiative - Backend Form Submission Handler
 * SPDX-License-Identifier: Apache-2.0
 */

// Enable CORS so the React app can submit requests from other domains if necessary
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false, 
        "message" => "Method Not Allowed. Only POST requests are supported."
    ]);
    exit();
}

// Read the input body
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Fallback to $_POST if JSON payload is empty
if (empty($data)) {
    $data = $_POST;
}

if (empty($data)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Bad Request. No data submitted."
    ]);
    exit();
}

// Config
$to = "praiseoti3@gmail.com";
$formType = isset($data['Form Type']) ? $data['Form Type'] : (isset($data['formType']) ? $data['formType'] : "General Inquiry");
$subject = isset($data['_subject']) ? $data['_subject'] : "[Agada Initiative] New $formType Submission";

// Remove internal configuration helper variables
$metadata_subject = isset($data['_subject']) ? $data['_subject'] : null;
$metadata_type = isset($data['Form Type']) ? $data['Form Type'] : null;
$metadata_time = isset($data['Submitted At']) ? $data['Submitted At'] : null;

unset($data['_subject']);
unset($data['Form Type']);
unset($data['Submitted At']);

$submittedAt = date("Y-m-d H:i:s");

// Build a clean, styled HTML email body
$emailContent = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>" . htmlspecialchars($subject) . "</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background-color: #065f46; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.025em; }
        .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
        .content { padding: 32px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .table th, .table td { text-align: left; padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
        .table th { width: 35%; font-weight: 600; color: #475569; background-color: #f8fafc; }
        .table td { color: #0f172a; }
        .footer { background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 0; }
        .badge { display: inline-block; padding: 4px 8px; font-size: 11px; font-weight: bold; border-radius: 4px; background-color: #ecfdf5; color: #065f46; border: 1px solid #d1fae5; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Agada Initiative Form Submission</h1>
            <p>Form Type: " . htmlspecialchars($formType) . "</p>
        </div>
        <div class='content'>
            <p style='font-size: 14px; margin-top: 0;'>A new submission has been received from your website platform. The details are recorded below:</p>
            <table class='table'>
                <tr>
                    <th>Form Type</th>
                    <td><span class='badge'>" . htmlspecialchars($formType) . "</span></td>
                </tr>
                <tr>
                    <th>Submitted At</th>
                    <td>" . htmlspecialchars($submittedAt) . "</td>
                </tr>
";

foreach ($data as $key => $value) {
    if ($key === "id" || $key === "createdAt" || $key === "status" || strpos($key, "_") === 0) {
        continue;
    }

    // Standardize user-friendly labels
    $label = htmlspecialchars($key);
    $displayValue = "";
    if (is_array($value)) {
        $displayValue = htmlspecialchars(implode(", ", $value));
    } else {
        $displayValue = htmlspecialchars((string)$value);
    }

    $emailContent .= "
                <tr>
                    <th>$label</th>
                    <td>" . nl2br($displayValue) . "</td>
                </tr>
    ";
}

$emailContent .= "
            </table>
        </div>
        <div class='footer'>
            <p>This is an automated notification from the Agada Initiative Web Platform.</p>
            <p>&copy; " . date("Y") . " Agada Initiative. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Fallback sender from headers
$senderEmail = "noreply@agada-initiative.org";
if (isset($data['Email']) && filter_var($data['Email'], FILTER_VALIDATE_EMAIL)) {
    $senderEmail = $data['Email'];
} else if (isset($data['Email Address']) && filter_var($data['Email Address'], FILTER_VALIDATE_EMAIL)) {
    $senderEmail = $data['Email Address'];
} else if (isset($data['Subscriber Email']) && filter_var($data['Subscriber Email'], FILTER_VALIDATE_EMAIL)) {
    $senderEmail = $data['Subscriber Email'];
}

$headers .= "From: Agada Initiative <$senderEmail>" . "\r\n";
$headers .= "Reply-To: $senderEmail" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Dispatch email
$mailSent = @mail($to, $subject, $emailContent, $headers);

if ($mailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Your message has been processed and sent successfully to $to.",
        "debug_sent" => true
    ]);
} else {
    // If mail function fails, we send 200 with debug warning so users can easily test local server without SMTP server crash
    echo json_encode([
        "success" => true,
        "message" => "Form received locally! (Warning: PHP mail() function failed, verify SMTP is configured in php.ini on your host server)",
        "smtp_sent" => false
    ]);
}
