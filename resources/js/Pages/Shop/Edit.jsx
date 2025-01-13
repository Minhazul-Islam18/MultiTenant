import React from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({ shop }) {
    const { data, setData, put, errors } = useForm({
        name: shop.name,
        domain: shop.domain,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("shops.update", shop.id));
    };

    return (
        <div>
            <h1>Edit Shop</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label>Domain</label>
                    <input
                        type="text"
                        value={data.domain}
                        onChange={(e) => setData("domain", e.target.value)}
                    />
                    {errors.domain && <div>{errors.domain}</div>}
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
