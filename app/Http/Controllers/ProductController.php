<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/Index');
    }

    public function products()
    {
        $products = Product::where('tenant_id', tenant('id'))->get();

        return response()->json([
            'message' => 'Products retrieved successfully.',
            'data' => $products,
        ]);
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
