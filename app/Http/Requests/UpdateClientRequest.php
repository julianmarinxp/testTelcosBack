<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Muy importante cambiar esto a true
    }

    public function rules(): array
    {
        // Rescatamos el ID del cliente que estamos editando desde la URL
        $clientId = $this->route('client')->id;

        return [
            'name' => 'required|string|max:255',
            // La regla unique necesita ignorar el email actual del cliente para no dar error
            'email' => 'required|email|unique:clients,email,' . $clientId,
            'phone' => 'nullable|string|max:20',
            'city_id' => 'required|exists:cities,id',
        ];
    }
}