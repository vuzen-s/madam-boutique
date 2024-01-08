<?php

namespace App\Mail\Client;

use App\Models\CommentModel;
use App\Models\OrderModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class CommentMail extends Mailable
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
            subject: '[THÔNG BÁO] VỪA CÓ 1 BÌNH LUẬN SẢN PHẨM MỚI ĐANG CHỜ DUYỆT',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $comment_latest = CommentModel::with(['product', 'user'])
            ->get()
            ->last();
        return new Content(
            view: 'client.comment',
            with: [
                'name_product' => $comment_latest->product->name,
                'name_user' => $comment_latest->user->fullname,
                'content' => $comment_latest->content,
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
