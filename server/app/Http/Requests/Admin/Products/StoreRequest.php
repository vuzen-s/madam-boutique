<?php

namespace App\Http\Requests\Admin\Products;

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
            'name' => 'required|unique:products,name,' . $this->id,
            'price' => 'required|numeric',
            'desc' => 'required',
            'avatar' => 'mimes:jpg,png,jpeg',
            'status' => 'required',
            'feature' => 'required',
            'collection_id' => 'required',
            'brand_id' => 'required',
            'designer_id' => 'required',
            'category_id' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'You must enter this field.',
            'name.unique' => 'Not allowed to have duplicate names.',
            'price.required' => 'You must enter this field..',
            'price.numeric' => 'You must enter this field..',
            'desc.required' => 'You must enter this field..',
            'avatar.mimes' => 'The avatar file must be of type: jpg, png, jpeg. Please re-enter',
            'status.required' => 'You must enter this field..',
            'feature.required' => 'You must enter this field.',
            'collection_id.required' => 'You must enter this field.',
            'brand_id.required' => 'You must enter this field.',
            'designer_id.required' => 'You must enter this field.',
            'category_id.required' => 'You must enter this field.',
        ];
    }
}
