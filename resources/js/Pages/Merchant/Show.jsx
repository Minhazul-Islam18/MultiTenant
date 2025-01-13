import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ merchant }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Merchant Details
                </h2>
            }
        >
            <Head title={`Merchant: ${merchant.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Merchant: {merchant.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Email:{" "}
                            <span className="text-gray-800 dark:text-gray-200">
                                {merchant.email}
                            </span>
                        </p>

                        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                            Shops
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            {merchant.shops.map((shop) => (
                                <li
                                    key={shop.id}
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    {shop.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
