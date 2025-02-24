const Product = require('../models/productModel'); 
// or

const createProduct = async (req, res) => {
    const { title, description, price, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ""; 

    try {
        const newProduct = new Product({
            title,
            description,
            price,
            stock,
            imageUrl, 
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { title, description, price, stock } = req.body;
        let imageUrl = req.body.imageUrl;

        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, description, price, stock, image: imageUrl, updatedAt: Date.now() },
            { new: true }
    
            
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Save the updated product explicitly
        await updatedProduct.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: error.message });
    }
};



const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};
