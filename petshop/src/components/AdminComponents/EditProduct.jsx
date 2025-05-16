import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProduct({ productId, onBack }) {
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    brandName: '',
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    fetchCategory();
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/showallcategory');
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories.');
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/product/${id}`);
      const data = response.data;

      setFormData({
        brandName: data.brandName,
        name: data.productName,
        category: data.category.id,
        price: data.price,
        stockQuantity: data.stockQuantity,
        description: data.description,
        image: null,
      });

      if (data.productImg) {
        setImagePreview(`http://localhost:8080/uploads/${data.productImg}`);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { brandName , name, category, price, stockQuantity, description } = formData;

    if (!brandName || !name || !category || !price || !stockQuantity || !description) {
      toast.error('All fields are required.');
      return false;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.error('Please enter a valid price!');
      return false;
    }

    if (isNaN(stockQuantity) || parseInt(stockQuantity) <= 0) {
      toast.error('Please enter a valid stock quantity!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append('id', productId);
    data.append('catId', formData.category);
    data.append('brandName', formData.brandName);
    data.append('productName', formData.name);
    data.append('price', formData.price);
    data.append('sqstockQuantity', formData.stockQuantity);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('productImg', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/admin/updateproduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data || 'Product updated successfully!');
      onBack();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Edit Product</h1>
      </header>

      <div className="aform-container">
        <form onSubmit={handleSubmit}>
         
        <div className="aform-group">
            <label className="aform-label">Product Brand Name</label>
            <input
              type="text"
              className="aform-input"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="aform-group">
            <label className="aform-label">Product Name</label>
            <input
              type="text"
              className="aform-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="aform-group">
            <label className="aform-label">Category</label>
            <select
              className="aform-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select A Category</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.catName}
                </option>
              ))}
            </select>
          </div>

          <div className="aform-group">
            <label className="aform-label">Price</label>
            <input
              type="text"
              className="aform-input"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              step="0.01"
            />
          </div>

          <div className="aform-group">
            <label className="aform-label">Stock Quantity</label>
            <input
              type="text"
              className="aform-input"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
            />
          </div>

          <div className="aform-group">
            <label className="aform-label">Description</label>
            <textarea
              className="aform-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="aform-group">
            <label className="aform-label">Product Image</label>
            <div className="aimage-preview">
              {imagePreview ? <img src={imagePreview} alt="Preview" /> : <span>No image selected</span>}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="aform-input" />
          </div>

          <div className="aform-actions">
            <button type="button" className="abtn abtn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Edit Product
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditProduct;
