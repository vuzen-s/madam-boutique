<?php
//$serverKey = config('firebase.server_key');
return [
    'driver' => env('FCM_PROTOCOL', 'http'),
    'log_enabled' => false,

    'http' => [
//        'server_key' => env('FCM_SERVER_KEY', 'BDCFnfIwhItylw9bA9djH5evKGKH_DxA9OAvBEdZas4RqXymGke0cKBFnv4peec5F5x_yrllj-r3VBMVCUfY3hI'),
        'sender_id' => env('FCM_SENDER_ID', '355542446507'),
//    'server_key' => env('FCM_SERVER_KEY', $serverKey),
//    'sender_id' => '355542446507'
    ],
];
