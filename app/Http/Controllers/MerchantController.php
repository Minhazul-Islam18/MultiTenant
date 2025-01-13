<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
            'domain' => 'required|string|unique:merchants,domain',
        ]);

        $tenant = Merchant::create([
            // 'id' => Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'domain' => $request->domain,
            'data' => $request->data,
        ]);

        $tenant->domains()->create([
            'domain' => $request->domain,
        ]);

        return redirect()->route('merchant-login')->with('success', 'Merchant created successfully, Please login.');
    }

    public function update(Request $request, Merchant $merchant)
    {
        // Validation for merchant update
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:merchants,email,' . $merchant->id, // Unique email but ignore the current merchant
            'password' => 'nullable|string|min:8', // Password is optional for update
            'domain' => 'required|string|unique:merchants,domain,' . $merchant->id, // Unique domain but ignore the current merchant
        ]);

        // Update existing merchant
        $merchant->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $merchant->password,
            'domain' => $request->domain,
        ]);

        return redirect()->route('merchants.index')->with('success', 'Merchant updated successfully.');
    }

    public function destroy(Merchant $merchant)
    {
        // Deleting merchant (you can also delete tenant-specific data if needed)
        $merchant->delete();
        return redirect()->route('merchants.index')->with('success', 'Merchant deleted successfully.');
    }
}
