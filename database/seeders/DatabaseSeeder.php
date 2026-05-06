<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // 1. Primero creamos las ciudades
        $this->call([
            CitySeeder::class,
        ]);

        // 2. Luego creamos 50 clientes falsos usando la fábrica
        \App\Models\Client::factory(50)->create();
    }
}
