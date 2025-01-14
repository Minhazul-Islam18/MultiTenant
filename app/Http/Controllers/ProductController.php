<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/Index');
    }

    public function products()
    {
        try {
            if (!tenant()) {
                return response()->json([
                    'message' => 'No tenant context found. Ensure you are within a tenant.',
                ], 400);
            }

            $products = Product::with('category:id,name')
                ->get();
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No products found.',
                    'data' => [],
                ], 404);
            }

            return response()->json([
                'message' => 'Products retrieved successfully.',
                'data' => $products,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error in Products API: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while retrieving products.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function create()
    {
        return Inertia::render('Product/CreateEdit');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'tenant_id' => tenant('id'),
        ]);

        return to_route('tenant.products.index');
    }
}
