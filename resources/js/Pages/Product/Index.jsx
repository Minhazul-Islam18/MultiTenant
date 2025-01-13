import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const response = await axios.get(route("tenant.products.api"));
            console.log(response.data); // Update state with API data
            setProducts(response.data.data); // Update state with API data
        } catch (error) {
            console.error("Error fetching shops:", error);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Products
                </h2>
            }
        >
            <Head title={"Products"} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                Products
                            </h1>
                            <Link
                                href={route("tenant.products.create")}
                                method="post"
                                as="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                Add Product
                            </Link>
                        </div>

                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {products.length > 0 &&
                                    products.map((merchant) => (
                                        <tr key={merchant.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                                {merchant.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                                {merchant.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Link
                                                    href={route(
                                                        "merchants.show",
                                                        merchant.id
                                                    )}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline mr-3"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "merchants.destroy",
                                                        merchant.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 dark:text-red-400 hover:underline"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
