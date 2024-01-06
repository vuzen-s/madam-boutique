<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Mail\OrderMail;
use App\Mail\Client\OrderMailClient;
use App\Models\OrderModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderMailController extends Controller
{
    function sendMailOrder()
    {
        Mail::to('ducvuglotec@gmail.com')->send(new OrderMail());
    }

    function sendMailOrderClient()
    {
        $order_latest = OrderModel::with(['user'])
            ->get()
            ->last();
        Mail::to($order_latest->user->email)->send(new OrderMailClient());
    }
}
