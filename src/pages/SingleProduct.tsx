import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery, useUpdateSingleProductMutation } from "../services/products";
import { FormEvent } from "react";
import EditProductForm from "../components/EditProductForm";


function SingleProduct() {
    const { productID } = useParams<{ productID: string }>();
    const navigate = useNavigate();
    const { data: product, isLoading } = useGetSingleProductQuery(productID || 0);
    const [updateProduct] = useUpdateSingleProductMutation()
    const submitForm = (e: FormEvent<HTMLFormElement>, data: { title: string; price: string; image: string }) => {
        e.preventDefault();
        updateProduct({ id: Number(productID) || 0, title: data.title, price: data.price })
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="p-10">
            <span onClick={() => { navigate(-1) }} className=" cursor-pointer text-base font-poppins text-main" >Go back to Products</span>
            <h2 className="font-semibold pl-4">Edit product</h2>

            <EditProductForm
                image={product.thumbnail}
                price={product.price}
                submitForm={submitForm}
                title={product.title} />
        </div>
    );
}

export default SingleProduct;
