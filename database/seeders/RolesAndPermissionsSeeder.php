<?php

namespace Database\Seeders;

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{

    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for the 'admin' guard
        Permission::create(['name' => 'manage merchants', 'guard_name' => 'admin']);
        Permission::create(['name' => 'view reports', 'guard_name' => 'admin']);

        // Create permissions for the 'merchant' guard
        Permission::create(['name' => 'manage shops', 'guard_name' => 'merchant']);

        // Create roles and assign permissions for 'admin'
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'admin']);
        $adminRole->givePermissionTo(['manage merchants', 'view reports']);

        // Create roles and assign permissions for 'merchant'
        $merchantRole = Role::create(['name' => 'merchant', 'guard_name' => 'merchant']);
        $merchantRole->givePermissionTo(['manage shops']);
    }
}
