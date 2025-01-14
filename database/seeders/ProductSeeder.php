<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Ensure the tenant context is correctly initialized
        $tenantId = tenant('id'); // Retrieve the current tenant ID

        if (!$tenantId) {
            $this->command->error('No tenant ID found. Ensure you are running this seeder in a tenant context.');
            return;
        }

        // Fetch existing categories
        $categories = Category::all();

        if ($categories->isEmpty()) {
            // Run the CategorySeeder if no categories are present
            Artisan::call('tenants:seed --class=CategorySeeder');
            $this->command->info('CategorySeeder executed. Reloading categories...');
            $categories = Category::all(); // Reload categories after seeding
        }

        if ($categories->isEmpty()) {
            $this->command->error('Categories are still empty after seeding. Check the CategorySeeder.');
            return;
        }

        // Generate sample products
        $products = [
            [
                'name' => 'Smartphone',
                'description' => 'Latest model smartphone with amazing features.',
                'price' => 699.99,
                'category_id' => $categories->random()->id,
                'tenant_id' => $tenantId,
            ],
            [
                'name' => 'Laptop',
                'description' => 'High-performance laptop for work and gaming.',
                'price' => 1299.99,
                'category_id' => $categories->random()->id,
                'tenant_id' => $tenantId,
            ],
            [
                'name' => 'Headphones',
                'description' => 'Noise-cancelling wireless headphones.',
                'price' => 199.99,
                'category_id' => $categories->random()->id,
                'tenant_id' => $tenantId,
            ],
            [
                'name' => 'Coffee Maker',
                'description' => 'Automatic coffee maker with timer.',
                'price' => 49.99,
                'category_id' => $categories->random()->id,
                'tenant_id' => $tenantId,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product); // Explicitly include the tenant_id
        }

        $this->command->info('Products seeded successfully for tenant ID: ' . $tenantId);
    }
}
