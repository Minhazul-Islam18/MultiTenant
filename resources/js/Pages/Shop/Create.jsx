import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: "",
        domain: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("shops.store"));
    };

    return (
        <div>
            <h1>Add Shop</h1>
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
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
