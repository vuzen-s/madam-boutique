<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Mail\OrderMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

use function Laravel\Prompts\table;

class ContactMailController extends Controller
{
    function sendMailOrder()
    {
        Mail::to('boutiquemadam338@gmail.com')->send(new OrderMail());
    }
}
