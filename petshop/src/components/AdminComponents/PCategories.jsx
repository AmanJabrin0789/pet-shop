import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';  

function PCategories({ onAddClick,onEditClick }) {

    const [categorys, setCategory] = useState([]);

    useEffect(() => {
        fetchCategory();
    }, []); 

    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/showallcategory');
            setCategory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (id) => {
      
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/deletecategory/' + id);
    
                if (response.data === "Category Delete successfully!!") {
                    toast.success(response.data);
                } else {
                    toast.error("Something went wrong!!");
                }
                fetchCategory();
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while deleting the category");
            }
        }
    };

    return (
        <div>
            <header className="aheader">
                <h1 className="apage-title">Categories</h1>
                <button className="abtn abtn-primary" onClick={onAddClick}>
                    <Plus size={20} />
                    Add New Category
                </button>
            </header>

            <div className="atable-container">
                <table className="adata-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorys.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>
                                    No categories available
                                </td>
                            </tr>
                        ) : (
                            categorys.map((category) => (
                                <tr key={category.id}> 
                                    <td>{category.id}</td>
                                    <td>{category.catName}</td>
                                    <td>
                                        <button className="abtn abtn-primary" style={{ marginRight: '0.5rem' }} onClick={() => onEditClick(category.id)}>
                                            <Edit size={16} /> 
                                        </button>
                                        <button onClick={() => deleteCategory(category.id)} className="abtn abtn-danger">
                                            <Trash2 size={16} /> 
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <button 
                className="abtn abtn-primary add-btn" 
                onClick={onAddClick}
            >
                <Plus size={20} />
                Add New Category
            </button>
            <ToastContainer />
        </div>
    );
}

export default PCategories;
