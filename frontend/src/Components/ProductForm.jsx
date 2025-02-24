import { useState } from "react";
import axios from "axios";

const ProductForm = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);  // State for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));  // Set preview of selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("image", product.image);

    try {
      await axios.post("http://localhost:8080/api/product", formData);
      onProductAdded();
      setProduct({ title: "", description: "", price: "", stock: "", image: null });
      setImagePreview(null);  // Clear image preview after submission
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="block w-full mb-2 p-2 border"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="file"
        onChange={handleFileChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      
      {/* Image Preview */}
      {imagePreview && (
        <div className="my-2">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-20 h-20 object-cover"
          />
        </div>
      )}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
