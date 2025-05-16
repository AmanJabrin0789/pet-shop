/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AddCategoryMenu({ onBack }) {
  const [formData, setFormData] = useState({
    catname: '',
    imgfile: null
  });
  const [imagePreview, setImagePreview] = useState(null); 

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        imgfile: file
      }));

      // Set the preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      if (file) {
        reader.readAsDataURL(file); 
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = () => {
    if (!formData.catname.trim()) {
      toast.error('Category Name cannot be empty!');
      return false;
    }
    if (!formData.imgfile) {
      toast.error('Please select an image!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Form data with file
    const formDataToSend = new FormData();
    formDataToSend.append('catName', formData.catname);
    formDataToSend.append('catImg', formData.imgfile);

    try {
      const response = await axios.post('http://localhost:8080/api/admin/addcategorymenu', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data === "Category name already registered!") {
        toast.warn("Category name already registered!");
      } else {
        toast.success("category added successfully");
         onBack(); 
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Add New Category Menu</h1>
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
            {/* Display the image preview if available */}
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img src={imagePreview} alt="Image Preview" style={{ width: '200px', height: 'auto', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <div className="aform-actions">
            <button type="button" className="abtn abtn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="abtn abtn-primary">
              Add Category Menu
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddCategoryMenu;
