import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

const MerchantForm = ({ shop }) => {
    const { errors } = usePage().props;
    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isSubmitting },
        setValue,
    } = useForm({
        defaultValues: {
            name: shop ? shop.name : "",
            domain: shop ? shop.domain : "",
        },
    });

    const onSubmit = (data) => {
        if (shop) {
            router.put(route("shops.update", shop.id), { data });
        } else {
            router.post(route("shops.store"), data);
        }
    };

    useEffect(() => {
        if (shop) {
            setValue("name", shop.name);
            setValue("domain", shop.domain);
        }
    }, [shop, setValue]);

    return (
        <AuthenticatedLayout>
            <Head title={shop ? "Edit Shop" : "Create Shop"} />

            <div className="px-2 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-red-500 px-4 py-7">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
                            {shop ? "Edit Shop" : "Create Shop"}
                        </h1>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
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

                            <div>
                                <label
                                    htmlFor="domain"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Domain
                                </label>
                                <Controller
                                    name="domain"
                                    control={control}
                                    rules={{
                                        required: "Domain is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/,
                                            message: "Enter a valid domain",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            id="domain"
                                            {...field}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    )}
                                />
                                {errors.domain ||
                                    (formErrors.domain && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.domain ||
                                                formErrors.domain.message}
                                        </p>
                                    ))}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {shop ? "Update Shop" : "Create Shop"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default MerchantForm;
