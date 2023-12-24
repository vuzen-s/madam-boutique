<?php

namespace App\Mail;

use Illuminate\Mail\Mailables\Address;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class ContactMail extends Mailable
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
            subject: 'THÔNG BÁO THÔNG TIN LIÊN HỆ',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $user = DB::table('users')->first();
        return new Content(
            view: 'mails.contact',
            with: [
                'name' => $user->fullname,
                'email' => $user->email,
                'content' => 'Tôi muốn mua hàng. Hãy liên hệ với tôi.'
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
