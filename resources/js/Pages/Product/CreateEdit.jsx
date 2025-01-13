import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

const ProductForm = ({ product }) => {
    const { errors } = usePage().props;
    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isSubmitting },
        setValue,
    } = useForm({
        defaultValues: {
            name: product ? product.name : "",
            description: product ? product.description : "",
            price: product ? product.price : "",
        },
    });

    const onSubmit = (data) => {
        if (product) {
            router.put(route("tenant.products.update", product.id), data);
        } else {
            router.post(route("tenant.products.store"), data);
        }
    };

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
        }
    }, [product, setValue]);

    return (
        <AuthenticatedLayout>
            <Head title={product ? "Edit Product" : "Create Product"} />

            <div className="px-2 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-4 py-7">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
                            {product ? "Edit Product" : "Create Product"}
                        </h1>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Name
                                </label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: "Name is required",
                                        maxLength: {
                                            value: 255,
                                            message:
                                                "Name must be less than 255 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            id="name"
                                            {...field}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    )}
                                />
                                {errors.name ||
                                    (formErrors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.name ||
                                                formErrors.name.message}
                                        </p>
                                    ))}
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Description
                                </label>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{
                                        maxLength: {
                                            value: 1000,
                                            message:
                                                "Description must be less than 1000 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <textarea
                                            id="description"
                                            rows={4}
                                            {...field}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    )}
                                />
                                {errors.description ||
                                    (formErrors.description && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.description ||
                                                formErrors.description.message}
                                        </p>
                                    ))}
                            </div>

                            {/* Price */}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Price
                                </label>
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{
                                        required: "Price is required",
                                        pattern: {
                                            value: /^\d+(\.\d{1,2})?$/,
                                            message:
                                                "Price must be a valid number with up to 2 decimal places",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            id="price"
                                            {...field}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    )}
                                />
                                {errors.price ||
                                    (formErrors.price && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.price ||
                                                formErrors.price.message}
                                        </p>
                                    ))}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {product
                                        ? "Update Product"
                                        : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductForm;
