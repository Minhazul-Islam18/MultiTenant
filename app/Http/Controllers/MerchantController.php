<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Merchant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use Illuminate\Support\Facades\Hash;

class MerchantController extends Controller
{
    public function index()
    {
        $merchants = Merchant::all();
        return inertia('Merchant/Index', ['merchants' => $merchants]);
    }

    public function create()
    {
        return inertia('Merchant/CreateEdit', ['merchant' => null]);
    }

    public function edit(Merchant $merchant)
    {
        return inertia('Merchant/CreateEdit', ['merchant' => $merchant]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:merchants,email',
            'password' => 'required|string|min:8',
        ]);

        $merchant = Merchant::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $merchant->assignRole('merchant');
        return redirect()->route('merchant-login')->with('success', 'Merchant created successfully, Please login.');
    }

    public function update(Request $request, Merchant $merchant)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:merchants,email,' . $merchant->id,
            'password' => 'nullable|string|min:8',
        ]);

        $merchant->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $merchant->password,
        ]);

        return redirect()->route('merchants.index')->with('success', 'Merchant updated successfully.');
    }

    public function destroy(Merchant $merchant)
    {
        $merchant->delete();
        return redirect()->route('merchants.index')->with('success', 'Merchant deleted successfully.');
    }

    public function getAllProducts()
    {
        try {
            // Retrieve all tenants
            $tenants = Shop::all();
            $allProducts = [];

            foreach ($tenants as $tenant) {
                // Use the tenant's database connection
                tenancy()->initialize($tenant);

                // Fetch products from this tenant's database
                $products = Product::with(['category:id,name', 'shop'])
                    ->get();

                $allProducts = array_merge($allProducts, $products->toArray());

                // End tenant context to avoid conflicts
                tenancy()->end();
            }

            return response()->json([
                'message' => 'Products retrieved successfully from all tenants.',
                'data' => $allProducts,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving products from all tenants: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while retrieving products.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
