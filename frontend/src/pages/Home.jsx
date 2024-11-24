import { useEffect, useState } from "react";
import LatestProduct from "../components/LatestProduct";
import Banner from "../components/Banner";
import OnSaleProduct from "./OnSaleProduct";


const HomePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        setLatestProducts(data.products.slice(0, 4));
        setOnSaleProducts(data.products.reverse().filter((product) => product.discountPercentage > 0).slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Banner/>
      {/* Latest Products Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">Latest Products</h2>
        <LatestProduct products={latestProducts} />
      </section>

      {/* On Sale Products Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">On Sale Products</h2>
        <OnSaleProduct products={onSaleProducts} />
      </section>
    </div>
  );
};

export default HomePage;
