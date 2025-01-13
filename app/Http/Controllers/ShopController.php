<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index()
    {
        $shops = auth()->user()->shops; // Assuming a Merchant has many Shops
        return inertia('Shop/Index', ['shops' => $shops]);
    }

    public function create()
    {
        return inertia('Shop/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:shops,domain',
        ]);

        auth()->user()->shops()->create($request->all());

        return redirect()->route('shops.index')->with('success', 'Shop created successfully.');
    }

    public function show(Shop $shop)
    {
        return inertia('Shop/Show', ['shop' => $shop]);
    }

    public function edit(Shop $shop)
    {
        return inertia('Shop/Edit', ['shop' => $shop]);
    }

    public function update(Request $request, Shop $shop)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:shops,domain,' . $shop->id,
        ]);

        $shop->update($request->all());

        return redirect()->route('shops.index')->with('success', 'Shop updated successfully.');
    }

    public function destroy(Shop $shop)
    {
        $shop->delete();

        return redirect()->route('shops.index')->with('success', 'Shop deleted successfully.');
    }
}
