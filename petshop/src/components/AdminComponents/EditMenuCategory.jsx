import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function EditMenuCategory({ categoryId, onBack }) {
  const [formData, setFormData] = useState({
    catId: '',
    catname: '',
    imgfile: null,
    currentImage: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchCategorybyId(categoryId);
    }
  }, [categoryId]);

  const fetchCategorybyId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/categorymenu/${id}`);
      const category = response.data;
      setFormData({
        catId: category.id,
        catname: category.catName,
        currentImage: category.catImg
      });
      
      // Set preview to the existing image URL
      setImagePreview(`http://localhost:8080/uploads/${category.catImg}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load category data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, imgfile: file }));

      // Create preview for new image
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.catname.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('id', formData.catId);
    formDataToSend.append('catName', formData.catname);
    
    // Always include the current image path
    formDataToSend.append('currentImage', formData.currentImage);
    
    // Only append new image if selected
    if (formData.imgfile) {
      formDataToSend.append('imgUrl', formData.imgfile);  // use imgUrl to match backend
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/admin/updatecategorymenu',formDataToSend,{
         headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data === "Category Update successfully!!") {
        toast.success(response.data);
        onBack();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Edit Category Menu</h1>
      </header>

      <div className="aform-container">
        <form onSubmit={handleSubmit}>
          <div className="aform-group">
            <label className="aform-label">Category Name</label>
            <input
              type="text"
              className="aform-input"
              placeholder="Enter category name"
              name="catname"
              value={formData.catname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="aform-group">
            <label className="aform-label">Category Image</label>
            <input
              type="file"
              className="aform-input"
              name="imgfile"
              onChange={handleInputChange}
              accept="image/*"
            />
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                />
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                  {formData.imgfile ? 'New image preview' : 'Current image'}
                </p>
              </div>
            )}
          </div>

          <div className="aform-actions">
            <button type="button" className="abtn abtn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="abtn abtn-primary" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditMenuCategory;