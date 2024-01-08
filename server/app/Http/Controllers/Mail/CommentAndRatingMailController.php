<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Mail\Client\CommentMail;
use App\Mail\Client\RatingMail;
use App\Mail\OrderMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CommentAndRatingMailController extends Controller
{
    function sendMailNewComment()
    {
        Mail::to('boutiquemadam338@gmail.com')->send(new CommentMail());
    }

    function sendMailNewRating()
    {
        Mail::to('boutiquemadam338@gmail.com')->send(new RatingMail());
    }
}
