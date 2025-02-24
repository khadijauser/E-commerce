import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Stock Management</h1>
      <ProductForm onProductAdded={() => setRefresh(!refresh)} />
      <ProductList key={refresh} />
    </div>
  );
}

export default App;
