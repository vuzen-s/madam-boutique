<?php

namespace App\Http\Requests\Admin\Categories;

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
            'name' => 'required|unique:categories,name,' . $this->id,
            'status' => 'required',
            'parent_id' => 'required|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Mục danh mục là bắt buộc. Vui lòng nhập lại.',
            'name.unique' => 'Tên danh mục không được trùng nhau. Vui lòng nhập lại.',
            'status.required' => 'Mục status là bắt buộc. Vui lòng nhập lại.',
            'parent_id.required' => 'Mục parent_id là bắt buộc. Vui lòng nhập lại.',
            'parent_id.numeric' => 'Mục parent_id phải là kiểu số. Vui lòng nhập lại.',
        ];
    }
}
