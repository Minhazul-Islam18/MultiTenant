import React from "react";

export default function Show({ shop }) {
    return (
        <div>
            <h1>Shop Details</h1>
            <p>Name: {shop.name}</p>
            <p>Domain: {shop.domain}</p>
        </div>
    );
}
