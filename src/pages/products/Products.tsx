import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { useProductStore } from "../../app/productStore";

const Products = () => {
  const { loading, products, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {products.length > 0 && (
        <div>
          {products.map((product: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined; }, i: number) => (
            <div key={product.id}>
              {i + 1}. {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
