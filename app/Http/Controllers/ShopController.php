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
        $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:shops,domain,' . $shop->id,
        ]);

        $shop->update([
            'name' => $request->name,
            'domain' => $request->domain,
        ]);

        return redirect()->route('dashboard')->with('success', 'Shop updated successfully.');
    }

    public function destroy(Shop $shop)
    {
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
                ], 401);
            }

            $shops = $user->shops()->get();

            if ($shops->isEmpty()) {
                return response()->json([
                    'message' => 'No shops found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'message' => 'Shops retrieved successfully.',
                'data' => $shops,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error in Shop API: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while retrieving shops.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
