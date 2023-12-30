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
            'title.required' => 'Mục tiêu đề bài viết là bắt buộc. Vui lòng nhập lại.',
            'content.required' => 'Mục description là bắt buộc. Vui lòng nhập lại.',
            'avatar_blog.mimes' => 'Mục avatar phải là tệp thuộc loại: jpg, png, jpeg. Vui lòng nhập lại.',
            'status.required' => 'Mục status là bắt buộc. Vui lòng nhập lại.',
            'topic_id.required' => 'Mục collection là bắt buộc. Vui lòng nhập lại.',
        ];
    }
}
