import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AddCategory({ onBack }) {
  const [formData, setFormData] = useState({
    catname: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

 

  const validate = () => {

    if (!formData.catname.trim()) {
      toast.error('Category Name cannot be empty!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      
      const response = await axios.post('http://localhost:8080/api/admin/addcategory', null, {
        params: {
          catName: formData.catname
        },
      });

       
      if (response.data === "Category Name Already Registered!") {
        toast.warn(response.data);
      } else if (response.data === "Category Added Successfully") {
        toast.success(response.data);
        onBack();
      }

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <header className="aheader">
        <h1 className="apage-title">Add New Category</h1>
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

          <div className="aform-actions">
            <button type="button" className="abtn abtn-secondary" onClick={onBack}>
              Cancel
            </button>
            <button type="submit" className="abtn abtn-primary">
              Add Category
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddCategory;
