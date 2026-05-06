<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ciudades = ['Bogotá', 'Medellín', 'Cali', 'Neiva', 'Barranquilla'];

        foreach ($ciudades as $ciudad) {
            City::create(['name' => $ciudad]);
        }
    }
}
