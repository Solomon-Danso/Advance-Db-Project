<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\PrepaidMeter;
use Illuminate\Support\Facades\Session; // Add this at the top


class ChampionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Retrieve ShortName from the header or URL
        $shortName = $request->header('ShortName') ?? last(explode('/', $request->path()));

        if (empty($shortName)) {
            return response()->json(['message' => 'ShortName not found in headers or URL.'], 400);
        }

        // 🔹 Construct dynamic environment variables for the site's database
        $dbHost = env($shortName . '_DB_HOST', '127.0.0.1');
        $dbUsername = env($shortName . '_DB_USERNAME', 'root');
        $dbPassword = env($shortName . '_DB_PASSWORD', '');

        // 🔹 Set the dynamic database connection
        Config::set('database.connections.dynamic', [
            'driver' => 'mysql',
            'host' => $dbHost,
            'port' => env('DB_PORT', '3306'),
            'database' => $shortName,
            'username' => $dbUsername,
            'password' => $dbPassword,
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]);
        Config::set('database.default', 'dynamic');
        Config::set('dynamic.shortName', $shortName);
        Session::put('shortName', $shortName);


        $request->merge(['shortName' => $shortName]);



        return $next($request);
    }
}

