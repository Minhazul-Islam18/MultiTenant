import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

const MerchantForm = ({ merchant }) => {
    const { errors } = usePage().props;
    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isSubmitting },
        setValue,
    } = useForm({
        defaultValues: {
            name: merchant ? merchant.name : "",
            email: merchant ? merchant.email : "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        if (merchant) {
            router.put(route("merchants.update", merchant.id), { data });
        } else {
            router.post(route("merchants.store"), data);
        }
    };

    useEffect(() => {
        if (merchant) {
            setValue("name", merchant.name);
            setValue("email", merchant.email);
        }
    }, [merchant, setValue]);

    return (
        <GuestLayout>
            <Head title={merchant ? "Edit Merchant" : "Create Merchant"} />

            <div className="px-2 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
                            {merchant ? "Edit Merchant" : "Create Merchant"}
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
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Email
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message:
                                                "Enter a valid email address",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="email"
                                            id="email"
                                            {...field}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    )}
                                />
                                {errors.email ||
                                    (formErrors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.email ||
                                                formErrors.email.message}
                                        </p>
                                    ))}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-white"
                                >
                                    Password
                                </label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: merchant
                                            ? false
                                            : "Password is required",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be at least 8 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="password"
                                            id="password"
                                            {...field}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    )}
                                />
                                {errors.password ||
                                    (formErrors.password && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.password ||
                                                formErrors.password.message}
                                        </p>
                                    ))}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {merchant
                                        ? "Update Merchant"
                                        : "Create Merchant"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default MerchantForm;
