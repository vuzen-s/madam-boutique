<?php

namespace App\Http\Requests\Admin\Collections;

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
            'name' => 'required|unique:collections,name,' . $this->id,
        ];
    }

    public function messages():array
    {
        return [
            'name.required' => 'You must enter this field.',
            'name.unique' => 'Not allowed to have duplicate names.',
        ];
    }
}
