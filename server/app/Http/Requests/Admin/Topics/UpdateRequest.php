<?php

namespace App\Http\Requests\Admin\Topics;

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
            'name' => 'required|unique:topics,name,' . $this->id,
        ];
    }

    public function messages():array
    {
        return [
            'name.required' => 'Mục topic hiệu là bắt buộc. Vui lòng nhập lại.',
            'name.unique' => 'Tên topic không được trùng nhau. Vui lòng nhập lại.',
        ];
    }
}