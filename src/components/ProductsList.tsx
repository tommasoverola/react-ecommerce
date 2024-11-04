import ProductList from "./ProductList";
import { useGetProductsQuery } from "../services/products";

const ProductsList = () => {
  const { data, error, isLoading } = useGetProductsQuery({ limit: "10" })
  if (isLoading) return 'Loading...';
  if (error) console.log('An error occurred while fetching the user data ', error);
  if (!data) {
    return null
  }

  return <ProductList title="Our Products" products={data} />;
};

export default ProductsList;
