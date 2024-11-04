import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Purchase from "./pages/Purchase";
import ProductsTable from "./components/ProductsTable";
import SingleProduct from "./pages/SingleProduct";
import CreateProduct from "./pages/CreateProduct";


function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<ProtectedRoute />}>
          <Route path="/purchase" element={<Purchase />} />
        </Route>
        <Route path="/products" element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/products/:productID" element={<SingleProduct />} />
          <Route path="/products/products-create" element={<CreateProduct />} />
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Footer />
    </Provider>
  );
}

export default App;
