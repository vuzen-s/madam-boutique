<?php

namespace App\Http\Requests\Client\Comments;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'required',
        ];
    }

    public function messages():array
    {
        return [
            'content.required' => 'Nội dung là bắt buộc. Vui lòng nhập lại.',
        ];
    }
}