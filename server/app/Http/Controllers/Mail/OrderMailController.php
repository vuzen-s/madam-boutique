<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Mail\OrderMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderMailController extends Controller
{
    function sendMailOrder()
    {
        Mail::to('ducvuglotec@gmail.com')->send(new OrderMail());
    }
}
