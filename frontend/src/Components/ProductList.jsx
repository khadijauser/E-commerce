import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);  

  useEffect(() => {
    fetchProducts();

    
    return () => setProducts([]);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(res.data);
    } catch (error) {
      setError("Error fetching products.");
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      fetchProducts();
    } catch (error) {
      setError("Error deleting product.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Product List</h2>
      {error && <p className="text-red-500">{error}</p>}  
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="border p-2 mb-2 flex justify-between items-center">
              <div>
                <p><strong>{product.title}</strong></p>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                {product.image && (
                  <img
                    src={`http://localhost:8080/uploads/${product.image}`}
                    alt={product.title}
                    // className="w-20 h-20 object-cover"
                    // onError={(e) => e.target.style.display = "none"}
                  />
                )}
              </div>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
