<?php

namespace App\Http\Requests\Admin\Products;

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
            'name' => 'required|unique:products,name,' . $this->id,
            'price' => 'required|numeric',
            'desc' => 'required',
            // 'avatar' => 'mimes:jpg,png,jpeg',
            'status' => 'required',
            'feature' => 'required',
            'collection_id' => 'required',
            'brand_id' => 'required',
            'designer_id' => 'required',
            'category_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Mục tên sản phẩm là bắt buộc. Vui lòng nhập lại.',
            'name.unique' => 'Tên sản phẩm không được trùng nhau. Vui lòng nhập lại.',
            'price.required' => 'Mục giá cả là bắt buộc. Vui lòng nhập lại.',
            'price.numeric' => 'Mục giá cả phải là kiểu số. Vui lòng nhập lại.',
            'desc.required' => 'Mục desc là bắt buộc. Vui lòng nhập lại.',
            // 'avatar.mimes' => 'Mục avatar phải là tệp thuộc loại: jpg, png, jpeg. Vui lòng nhập lại.',
            'status.required' => 'Mục status là bắt buộc. Vui lòng nhập lại.',
            'user_id.required' => 'Mục user là bắt buộc. Vui lòng nhập lại.',
            'collection_id.required' => 'Mục collection là bắt buộc. Vui lòng nhập lại.',
            'brand_id.required' => 'Mục brand là bắt buộc. Vui lòng nhập lại.',
            'designer_id.required' => 'Mục designer là bắt buộc. Vui lòng nhập lại.',
            'category_id.required' => 'Mục category là bắt buộc. Vui lòng nhập lại.',
        ];
    }
}
