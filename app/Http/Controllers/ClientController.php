<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Importante para registrar el error

class ClientController extends Controller
{
    


    public function index(Request $request)
    {
        // with('city') evita el problema de N+1 consultas
        $clients = Client::with('city')
            ->when($request->search, function ($query, $search) {
                // Buscador: filtra por nombre o correo
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10); // Paginamos de 10 en 10

        return response()->json($clients, 200);
    }





    public function store(StoreClientRequest $request)
    {
        try {
            // Intentamos guardar
            $client = Client::create($request->validated());

            return response()->json([
                'message' => 'Cliente creado con éxito',
                'data' => $client
            ], 201); 

        } catch (\Exception $e) {
            // Si algo falla, guardamos el error real en los logs del servidor
            Log::error('Error al crear cliente: ' . $e->getMessage());

            // Y le devolvemos al frontend un mensaje amigable y un código 500
            return response()->json([
                'message' => 'Ocurrió un error interno al crear el cliente. Intente de nuevo.'
            ], 500);
        }
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        try {
            $client->update($request->validated());

            return response()->json([
                'message' => 'Cliente actualizado con éxito',
                'data' => $client
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al actualizar cliente ID ' . $client->id . ': ' . $e->getMessage());

            return response()->json([
                'message' => 'Ocurrió un error al actualizar el cliente.'
            ], 500);
        }
    }

    public function destroy(Client $client)
    {
        try {
            $client->delete();

            return response()->json([
                'message' => 'Cliente eliminado con éxito'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al eliminar cliente ID ' . $client->id . ': ' . $e->getMessage());

            return response()->json([
                'message' => 'Ocurrió un error al eliminar el cliente.'
            ], 500);
        }
    }
}