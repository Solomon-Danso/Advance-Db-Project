<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use App\Models\PrepaidMeter;

class PrepaidMeterMiddleware
{
    public function handle(Request $request, Closure $next)
    {

        // Retrieve the first PrepaidMeter instance from the database
        $s = PrepaidMeter::first();

        // Check if the PrepaidMeter instance exists
        if (!$s) {
            return response()->json([
                'message' => 'Please set up your application to continue using the service. Your Login Was Not Recorded'
            ], 404);
        }

        $currentDate = Carbon::now()->format('Y-m-d');

        // Convert the ExpireDate to a Carbon instance for proper date comparison
        $expireDate = Carbon::parse($s->ExpireDate)->format('Y-m-d');

        // Check if the subscription has expired
        if (is_null($s->ExpireDate) || $currentDate > $expireDate) {
            return response()->json([
                "status" => "SUBSCRIPTION_EXPIRED",
                'message' => 'Your subscription has expired, please subscribe to continue using these services.'
            ], 401);
        }

        // Proceed to the next middleware/request handler
        return $next($request);
    }
}
