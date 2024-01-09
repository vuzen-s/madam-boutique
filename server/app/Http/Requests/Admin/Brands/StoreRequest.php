<?php

namespace App\Http\Requests\Admin\Brands;

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
        ];
    }

    public function messages():array
    {
        return [
            'name.required' => 'The brand name field is mandatory. Please re-enter. ',
            'name.unique' => 'The brand name must be unique. Please enter a different name..',
        ];
    }
}
