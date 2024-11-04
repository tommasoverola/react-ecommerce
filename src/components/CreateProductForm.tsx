import { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditProductFormType = {
    submitForm: (e: FormEvent<HTMLFormElement>, data: { title: string, price: string, imgurl: string }) => void;
};

type Inputs = {
    title: string;
    price: string;
    imgurl: string;
};

const CreateProductForm = (props: EditProductFormType) => {
    const { submitForm } = props;
    const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: any, e: any) => submitForm(e, data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-8">
            <div className="relative">
                <p className="text-lg font-semibold pb-2">Product Picture</p>
                <div className="flex items-center gap-4">

                    <img
                        src={"https://picsum.photos/200/300"}
                        alt="Product"
                        className="w-24 h-24 rounded object-cover border border-gray-200"
                    />
                    <input
                        type="text"
                        placeholder="Enter image url"
                        className="w-96 text-sm border p-3 rounded text-variant2 font-poppins"
                        {...register("imgurl", {
                            required: true,
                            minLength: {
                                value: 5,
                                message: "min length is 5"
                            },
                            value: "https://picsum.photos/200/300"
                        })}
                    />
                </div>
            </div>

            <div className="relative">
                <p className="text-sm font-semibold pb-2">Product Name</p>
                <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-96 text-sm border p-3 rounded text-variant2 font-poppins"
                    {...register("title", {
                        required: "Title is required",
                        minLength: {
                            value: 5,
                            message: "min length is 5"
                        },
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
                    onClick={() => {
                        resetField("title")
                        resetField("price")
                    }}
                >
                    CANCEL
                </button>
            </div>
        </form>
    );
};

export default CreateProductForm;
