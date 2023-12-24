<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

use function Laravel\Prompts\table;

class ContactMailController extends Controller
{
    function sendMailContact()
    {
        Mail::to('ducvuglotec@gmail.com')->send(new ContactMail());
    }
}
