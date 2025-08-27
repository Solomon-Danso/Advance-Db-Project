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
        $dbHost = env(strtoupper($shortName) . '_DB_HOST', '127.0.0.1');
        $dbUsername = env(strtoupper($shortName) . '_DB_USERNAME', 'root');
        $dbPassword = env(strtoupper($shortName) . '_DB_PASSWORD', '');

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


        // 🔹 Set up External Storage (FTP/SFTP)
        $storageHost = env(strtoupper($shortName) . '_STORAGE_HOST', '');
        $storageUser = env(strtoupper($shortName) . '_STORAGE_USER', '');
        $storagePass = env(strtoupper($shortName) . '_STORAGE_PASS', '');
        $storageRoot = env(strtoupper($shortName) . '_STORAGE_ROOT', '');

        // Validate external storage details
        if (!$storageHost || !$storageUser || !$storagePass || !$storageRoot) {
            return response()->json(['message' => 'External storage configuration missing.'], 500);
        }

        // 🔹 Dynamically set Laravel storage configuration for FTP/SFTP
        Config::set("filesystems.disks.{$shortName}_ftp", [
            'driver' => 'ftp',
            'host' => $storageHost,
            'username' => $storageUser,
            'password' => $storagePass,
            'root' => $storageRoot, // External storage root path
            'port' => 21,
            'passive' => true,
            'ssl' => false,
            'timeout' => 30,
        ]);

        // Check if folder exists on external storage
        if (!Storage::disk("{$shortName}_ftp")->exists($shortName)) {
            Storage::disk("{$shortName}_ftp")->makeDirectory($shortName, 0777, true);
        }

        // Attach external storage folder to request
        $request->merge(['mediaFolder' => $shortName, 'storageDisk' => "{$shortName}_ftp"]);

        return $next($request);
    }
}
