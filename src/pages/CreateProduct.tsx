import { useNavigate } from "react-router-dom";
import { useCreateSingleProductMutation } from "../services/products";
import { FormEvent } from "react";
import CreateProductForm from "../components/CreateProductForm";


function CreateProduct() {
    const navigate = useNavigate();

    const [createProduct] = useCreateSingleProductMutation()
    const submitForm = (e: FormEvent<HTMLFormElement>, data: { title: string; price: string; imgurl: string }) => {
        e.preventDefault();
        createProduct({ title: data.title, price: data.price, img: data.imgurl })
    };


    return (
        <div className="p-10">
            <span onClick={() => { navigate(-1) }} className=" cursor-pointer text-base font-poppins text-main" >Go back to Products</span>
            <h2 className="font-semibold pl-4">Create product</h2>

            <CreateProductForm
                submitForm={submitForm} />
        </div>
    );
}

export default CreateProduct;
