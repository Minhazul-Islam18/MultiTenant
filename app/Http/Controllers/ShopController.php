<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::all();
        return inertia('Shop/Index', ['shops' => $shops]);
    }

    public function create()
    {
        return inertia('Shop/CreateEdit', ['shop' => null]);
    }

    public function edit(Shop $shop)
    {
        return inertia('Shop/CreateEdit', ['shop' => $shop]);
    }

    public function show(Shop $shop)
    {
        return inertia('Shop/Show', ['shop' => $shop]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:shops,domain',
        ]);

        $tenant = Shop::create([
            // 'id' => Str::uuid(),
            'name' => $request->name,
            'domain' => $request->domain,
            'user_id' => Auth::id(),
        ]);

        $tenant->domains()->create([
            'domain' => $request->domain,
        ]);

        return redirect()->route('dashboard')->with('success', 'Shop created successfully, Please login.');
    }

    public function update(Request $request, Shop $shop)
    {
        // Validation for shop update
        $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:shops,domain,' . $shop->id, // Unique domain but ignore the current shop
        ]);

        // Update existing shop
        $shop->update([
            'name' => $request->name,
            'domain' => $request->domain,
        ]);

        return redirect()->route('dashboard')->with('success', 'Shop updated successfully.');
    }

    public function destroy(Shop $shop)
    {
        // Deleting shop (you can also delete tenant-specific data if needed)
        $shop->delete();
        return redirect()->route('shops.index')->with('success', 'Shop deleted successfully.');
    }

    public function apiShops()
    {
        try {
            $user = auth('merchant')->user();

            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized access.',
                ], 401); // Unauthorized status code
            }

            $shops = $user->shops()->get(); // Retrieve all shops associated with the user

            if ($shops->isEmpty()) {
                return response()->json([
                    'message' => 'No shops found.',
                    'data' => [],
                ], 404); // Not Found status code
            }

            return response()->json([
                'message' => 'Shops retrieved successfully.',
                'data' => $shops,
            ], 200); // Success status code
        } catch (\Exception $e) {
            // Log the exception for debugging purposes
            \Log::error('Error in Shop API: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while retrieving shops.',
                'error' => $e->getMessage(),
            ], 500); // Internal Server Error status code
        }
    }
}
