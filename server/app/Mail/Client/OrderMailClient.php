<?php

namespace App\Mail\Client;

use App\Models\OrderModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderMailClient extends Mailable
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
            subject: '[MADAM BOUTIQUE] | PLEASE CHECK YOUR ORDER INFORMATION',
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
            view: 'client.orders',
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
