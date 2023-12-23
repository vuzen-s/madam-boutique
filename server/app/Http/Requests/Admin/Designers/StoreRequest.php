<?php

namespace App\Http\Requests\Admin\Designers;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'name' => 'required|unique:collections,name,' . $this->id,
            'address' => 'required',
        ];
    }

    public function messages():array
    {
        return [
            'name.required' => 'Mục Nhà thiết kế là bắt buộc. Vui lòng nhập lại.',
            'name.unique' => 'Tên Nhà thiết kế không được trùng nhau. Vui lòng nhập lại.',
            'address.required' => 'Mục địa chỉ là bắt buộc. Vui lòng nhập lại.',
        ];
    }
}
