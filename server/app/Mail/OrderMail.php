<?php

namespace App\Mail;

use App\Models\OrderModel;
use App\Models\ProductModel;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct()
    {
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('ducvuglotec@gmail.com', 'MADAM Boutique'),
            subject: 'VỪA CÓ 1 ĐƠN HÀNG MỚI [ĐANG CHỜ DUYỆT]',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $order_latest = OrderModel::with(['user'])
            ->get()
            ->last();
        return new Content(
            view: 'mails.orders',
            with: [
                'order_latest' => $order_latest,
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
