Gestión de Clientes API - Backend (Telcos Ingeniería)Este es el núcleo del sistema de gestión de clientes desarrollado con Laravel 11. Proporciona una API RESTful para administrar clientes y sus ciudades, incluyendo validaciones robustas, manejo de errores y datos de prueba.🛠️ Tecnologías UtilizadasFramework: Laravel 11Lenguaje: PHP 8.2+Base de Datos: MySQL (XAMPP)Herramientas: Eloquent ORM, Form Requests, Seeders & Factories.📋 Requisitos PreviosAsegúrate de tener instalado lo siguiente en tu entorno Windows:XAMPP (Con PHP 8.2 o superior).Composer.Git.⚙️ Instalación y ConfiguraciónSigue estos pasos para poner en marcha el servidor:Clonar el repositorio:Bashgit clone https://github.com/julianmarinxp/testTelcosBack.git


cd testTelcosBack

Instalar dependencias:Bashcomposer install

Configurar variables de entorno:Copia el archivo de ejemplo: cp .env.example .envGenera la llave de la aplicación: php artisan key:generateConfigurar Base de Datos:Abre XAMPP y activa Apache y MySQL.Crea una base de datos llamada prueba_telcos en phpMyAdmin.En tu archivo .env, asegúrate de tener estas credenciales:Fragmento de códigoDB_CONNECTION=mysql


DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=prueba_telcos
DB_USERNAME=root
DB_PASSWORD=


Ejecutar Migraciones y Seeders:Este comando creará las tablas y poblará la base de datos con 5 ciudades y 50 clientes de prueba:Bashphp artisan migrate:fresh --seed
Iniciar el servidor:Bashphp artisan serve


La API estará disponible en: http://127.0.0.1:8000/api📡 Endpoints de la APIMétodoEndpointDescripciónGET/api/clientsObtiene todos los clientes (Paginados y con buscador ?search=).GET/api/clients/{id}Obtiene el detalle de un cliente específico.POST/api/clientsRegistra un nuevo cliente (Validado con Form Request).PUT/api/clients/{id}Actualiza los datos de un cliente.DELETE/api/clients/{id}Elimina un cliente de la base de datos.GET/api/citiesLista de ciudades para cargar en formularios.💡 Detalles Técnicos RelevantesValidaciones: Se utilizaron FormRequests (StoreClientRequest y UpdateClientRequest) para separar la lógica de validación del controlador.Manejo de Errores: Se implementaron bloques try-catch con respuestas JSON estandarizadas y registro de errores mediante Log::error().Optimización: Uso de with('city') en las consultas para evitar el problema de consultas N+1.CORS: Configurado para permitir peticiones desde el frontend en React.