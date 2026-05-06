<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientController;
use App\Models\City;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Rutas completas del CRUD para clientes
Route::apiResource('clients', ClientController::class);

// Ruta extra: El frontend va a necesitar la lista de ciudades para el menú desplegable (Select) del formulario
Route::get('cities', function () {
    return response()->json(City::orderBy('name')->get(), 200);
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



