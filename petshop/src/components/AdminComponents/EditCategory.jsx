import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function EditCategory({ categoryId, onBack }) {
  const [formData, setFormData] = useState({
    catId: '',
    catname: '',
  });
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (categoryId) {
      fetchCategorybyId(categoryId);
    }
  }, [categoryId]);

  const fetchCategorybyId = async (id) => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/category/'+id);
      const category = response.data;
      setFormData({
        catId: category.id,
        catname: category.catName,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load category data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    if (!formData.catname.trim()) {
      toast.error('Category name cannot be empty');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/admin/updatecategory', null, {
          params: {
            id: formData.catId,
            catName: formData.catname
          }
        }
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
        <h1 className="apage-title">Edit Category</h1>
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

          <div className="aform-actions">
            <button 
              type="button" 
              className="abtn abtn-secondary" 
              onClick={onBack}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="abtn abtn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditCategory;