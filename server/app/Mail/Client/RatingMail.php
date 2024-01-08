<?php

namespace App\Mail\Client;

use App\Models\CommentModel;
use App\Models\RatingModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RatingMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('boutiquemadam338@gmail.com', 'MADAM Boutique'),
            subject: '[THÔNG BÁO] VỪA CÓ 1 ĐÁNH GIÁ SẢN PHẨM MỚI',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $rating_latest = RatingModel::with(['product', 'user'])
            ->get()
            ->last();
        return new Content(
            view: 'client.rating',
            with: [
                'name_product' => $rating_latest->product->name,
                'name_user' => $rating_latest->user->fullname,
                'rating' => $rating_latest->rating,
                'rating_content' => $rating_latest->rating_content,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
