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
}
