import React from "react";
import { Link } from "@inertiajs/react";

export default function Index({ shops }) {
    return (
        <div>
            <h1>Your Shops</h1>
            <Link href={route("shops.create")} as="button">
                Add Shop
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Domain</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shops.map((shop) => (
                        <tr key={shop.id}>
                            <td>{shop.name}</td>
                            <td>{shop.domain}</td>
                            <td>
                                <Link
                                    href={route("shops.edit", shop.id)}
                                    as="button"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route("shops.destroy", shop.id)}
                                    method="delete"
                                    as="button"
                                >
                                    Delete
                                </Link>
                                <Link href={route("shops.show", shop.id)}>
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
