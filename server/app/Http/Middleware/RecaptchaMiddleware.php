<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RecaptchaMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       
function verifyRecaptcha($recaptchaResponse) {
    $recaptchaSecretKey = '6LcBfkApAAAAAKX8B0x7vkRlg9ZlzOKCGl7LnjSL';
    $recaptchaVerificationURL = 'https://www.google.com/recaptcha/api/siteverify';
    
    $data = array(
        'secret' => $recaptchaSecretKey,
        'response' => $recaptchaResponse,
    );

    $options = array(
        'http' => array(
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($recaptchaVerificationURL, false, $context);

    if ($result === FALSE) {
        // Xử lý lỗi khi gửi yêu cầu kiểm tra reCAPTCHA
        die('Error verifying reCAPTCHA');
    }

    $verificationData = json_decode($result, true);

    // Kiểm tra xem reCAPTCHA có hợp lệ không
    if ($verificationData['success']) {
        return true;
    } else {
        return false;
    }
}

// Sử dụng middleware trong các route cụ thể
$recaptchaResponse = $_POST['recaptcha_token'];

if (verifyRecaptcha($recaptchaResponse)) {
    // Xử lý yêu cầu sau khi reCAPTCHA được xác minh
    echo json_encode(array('success' => true, 'message' => 'reCAPTCHA verification passed'));
} else {
    http_response_code(403);
    echo json_encode(array('success' => false, 'message' => 'reCAPTCHA verification failed'));
}
        
        return $next($request);
    }
}
