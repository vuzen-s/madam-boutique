<?php

namespace App\Http\Requests\Admin\Blogs;

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
            'title' => 'required' . $this->id,
            'content' => 'required',
            'avatar_blog' => 'mimes:jpg,png,jpeg',
            'status' => 'required',
            'topic_id' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Name field is mandatory. Please re-enter.',
            'content.required' => 'Please re-enter.',
            'avatar_blog.mimes' => 'The avatar file must be of type: jpg, png, jpeg. Please re-enter.',
            'status.required' => 'Please enter again.',
            'topic_id.required' => 'Please enter again.',
        ];
    }
}
