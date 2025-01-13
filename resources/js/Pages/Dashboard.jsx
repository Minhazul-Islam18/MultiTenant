import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { hasAnyRole } from "@/utils/roles";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const { auth } = usePage().props;
    const [shops, setShops] = useState([]);

    useEffect(() => {
        if (hasAnyRole(auth.user, "merchant")) {
            fetchShops();
        }
    }, [auth.user]);

    const fetchShops = async () => {
        try {
            const response = await axios.get(route("merchant.shops.api"));
            setShops(response.data.data); // Update state with API data
        } catch (error) {
            console.error("Error fetching shops:", error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {hasAnyRole(auth.user, "merchant") && (
                                <>
                                    <Link
                                        href={route("shops.create")}
                                        className="px-3 py-2 mb-4 rounded bg-blue-500 text-white"
                                    >
                                        Add Shop
                                    </Link>
                                    <div className="mt-6">
                                        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
                                            <thead>
                                                <tr className="bg-gray-200 dark:bg-gray-700">
                                                    <th className="border px-4 py-2">
                                                        #
                                                    </th>
                                                    <th className="border px-4 py-2">
                                                        Name
                                                    </th>
                                                    <th className="border px-4 py-2">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {shops.length > 0 ? (
                                                    shops.map((shop, index) => (
                                                        <tr
                                                            key={shop.id}
                                                            className="text-center"
                                                        >
                                                            <td className="border px-4 py-2">
                                                                {index + 1}
                                                            </td>
                                                            <td className="border px-4 py-2">
                                                                {shop.name}
                                                            </td>
                                                            <td className="border px-4 py-2">
                                                                <Link
                                                                    href={route(
                                                                        "shops.edit",
                                                                        shop.id
                                                                    )}
                                                                    className="px-2 py-1 rounded bg-yellow-500 text-white mr-2"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <Link
                                                                    href={route(
                                                                        "shops.show",
                                                                        shop.id
                                                                    )}
                                                                    className="px-2 py-1 rounded bg-yellow-500 text-white mr-2"
                                                                >
                                                                    Show
                                                                </Link>
                                                                <button
                                                                    className="px-2 py-1 rounded bg-red-500 text-white"
                                                                    onClick={() =>
                                                                        console.log(
                                                                            `Delete shop: ${shop.id}`
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            className="border px-4 py-2 text-center"
                                                            colSpan="3"
                                                        >
                                                            No shops found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
