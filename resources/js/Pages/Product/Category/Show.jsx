import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Show() {
    const { shop } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Shop Details
                </h2>
            }
        >
            <Head title={`Shop: ${shop?.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Shop: {shop?.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Domain:{" "}
                            <a
                                target="_blank"
                                href={`${shop?.domain}:8000`}
                                className="text-gray-800 dark:text-gray-200"
                            >
                                {shop?.domain}
                            </a>
                        </p>

                        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                            Shops
                        </h2>
                        {/* <ul className="list-disc pl-5 space-y-2">
                            {shop?.products.map((shop) => (
                                <li
                                    key={shop.id}
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    {shop.name}
                                </li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
