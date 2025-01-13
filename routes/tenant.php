<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {
    Route::get('/', function () {
        return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    });
    // Product routes
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('tenant.products.index');
        Route::get('/get-products', [ProductController::class, 'products'])->name('tenant.products.api');
        Route::get('/create', [ProductController::class, 'create'])->name('tenant.products.create');
        Route::post('/create', [ProductController::class, 'store'])->name('tenant.products.store');
    });
});
