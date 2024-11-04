import SearchIcon from "../assets/icons/SearchIcon";
import { Product } from "../models/Product";
import ProductCard from "./ProductCard";

interface IProductList {
  title: string;
  products: Product[];
}

const ProductList = (props: IProductList) => {
  const { title = '', products } = props;

  return (
    <div className="container mt-8 mx-auto px-8 dark:bg-slate-800">
      <div className="sm:flex items-center justify-between">
        <h2 className="text-4xl font-medium dark:text-white">
          {title}
        </h2>
      </div>
      <div className="flex w-full justify-between">
        <div className="grid grid-cols-3 " >
          <p className="p-3 font-poppins text-main" >News</p>
          <p className="p-3 font-poppins" >Trandy</p>
          <p className="p-3 font-poppins" >Sales</p>
        </div>
        <div className="flex flex-row items-center border border-variant4 rounded-lg pl-4 pr-4 w-full max-w-sm">
          <span className="text-variant2 flex items-center justify-center mr-2 ">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search a product"
            className="text-variant2 w-full focus:outline-none"
          />
        </div>

      </div>
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-4"
      >
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            description={product.description}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList;
