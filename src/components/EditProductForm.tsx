import { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditProductFormType = {
    submitForm: (e: FormEvent<HTMLFormElement>, data: { title: string, price: string, image: string }) => void;
    title: string,
    price: number,
    image: string
};

type Inputs = {
    title: string;
    price: string;
};

const EditProductForm = (props: EditProductFormType) => {
    const { submitForm, title, price, image } = props;
    const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: any, e: any) => submitForm(e, data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-8">
            <div className="relative">
                <p className="text-lg font-semibold pb-2">Product Picture</p>
                <div className="flex items-center gap-4">
                    <img
                        src={image}
                        alt="Product"
                        className="w-24 h-24 rounded object-cover border border-gray-200"
                    />
                    <button
                        type="button"
                        className="text-base bg-main text-white rounded-full py-3 cursor-pointer mb-6 p-4"
                    >
                        MODIFY
                    </button>
                </div>
            </div>

            <div className="relative">
                <p className="text-sm font-semibold pb-2">Product Name</p>
                <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-96 text-sm border p-3 rounded text-variant2 font-poppins"
                    {...register("title", {
                        required: true,
                        minLength: {
                            value: 5,
                            message: "min length is 5"
                        },
                        value: title
                    })}
                />
                {errors.title && (
                    <span className="text-red-400" role="alert">{errors.title.message}</span>
                )}
            </div>

            <div className="relative">
                <p className="text-sm font-semibold pb-2">Price (€)</p>
                <input
                    type="text"
                    placeholder="Enter price"
                    className="w-56 text-sm border p-3 rounded dark:bg-variant2 text-variant2 font-poppins"
                    {...register("price", {
                        required: "Price is required",
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Enter a valid price",
                        },
                        value: price.toString()
                    })}
                />
                {errors.price && (
                    <span className="text-red-400" role="alert">{errors.price.message}</span>
                )}
            </div>

            <div className="flex gap-4 mt-6">
                <input
                    type="submit"
                    value="SAVE"
                    className="text-base bg-main text-white rounded-full py-3 cursor-pointer mb-6 p-4 w-[100px]"
                />
                <button
                    type="button"
                    className="text-base bg-white text-main rounded-full py-3 cursor-pointer mb-6 p-4 border-main border"
                    onClick={() => resetField("title")}
                >
                    CANCEL
                </button>
            </div>
        </form>
    );
};

export default EditProductForm;
