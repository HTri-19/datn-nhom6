<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
<<<<<<< HEAD
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:50',
            'role' => 'in:user,admin',
=======
            'email' => 'required|email|unique:users,email,' . $this->id,
            'password' => $this->isMethod('post') ? 'required|min:6' : 'nullable|min:6',
            'phone' => 'nullable|string|max:50',
            'role' => 'in:user,admin',
            'register_date' => 'required|date',
>>>>>>> 37a6b765b36580278b52e4f2d4a1ba3732d81850
            'status' => 'in:active,unactive',
        ];
    }
}
