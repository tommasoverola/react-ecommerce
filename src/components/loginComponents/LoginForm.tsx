import { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormType = {
    submitForm: (e: FormEvent<HTMLFormElement>, data: { email: string, password: string }) => void;
}

type Inputs = {
    email: string,
    password: string,
};
const LoginForm = (props: LoginFormType) => {
    const { submitForm } = props
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data: any, e: any) => submitForm(e, data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 pt-8">
            <div className="relative">
                <p className="text-sm font-normal pb-3" >Email</p>
                <input
                    data-test="input-username"
                    type="text"
                    placeholder="Enter your email address..."
                    className=" text-sm font-normal border w-full border-variant4 p-3 rounded dark:bg-variant2 text-variant2 font-poppins"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format"
                        }
                    })}
                />
                {errors.email && <span className="text-red-400" role="alert">{errors.email.message}</span>}
            </div>
            <div className="relative">
                <p className="text-sm font-normal pb-3" >Password</p>
                <input
                    data-test="input-password"
                    type="password"
                    placeholder="Enter your password here"
                    className="text-sm font-normal border w-full border-variant4 p-3 rounded dark:bg-variant2 text-variant2 font-poppins"
                    {...register("password", {
                        required: "required",
                        minLength: {
                            value: 3,
                            message: "min length is 3"
                        }
                    })}
                />
                {errors.password && <span className="text-red-400" role="alert">{errors.password.message}</span>}
            </div>
            <input
                data-test="input-submit"
                type="submit"
                value="LOG IN"
                className=" text-base bg-main text-white rounded-full py-3 cursor-pointer mb-6 "
            />
        </form>
    )
}

export default LoginForm