import axios from 'axios';
import { Plus, Edit, Trash2 } from 'lucide-react'; 
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; 

function Products({ onAddClick ,onEditClick }) {

const [showProduct,setShowProduct] = useState([]);


useEffect(()=>{
  fetchProduct();
},[])

const fetchProduct = async () =>{
      try{ 
           const response = await axios.get('http://localhost:8080/api/admin/showallproduct');
                setShowProduct(response.data);
      }catch(error){
        console.error(error)
      }
}


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
          const response = await axios.get('http://localhost:8080/api/admin/deleteproduct/' + id);

          if (response.data === "Product Delete successfully!!") {
              toast.success(response.data);
          } else {
              toast.error("Something went wrong!!");
          }
          fetchProduct();
      } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the category");
      }
  }
};

  return (
    <div>
      <header className="aheader">
             <h1 className="apage-title">Products</h1>
             <button className="abtn abtn-primary" onClick={onAddClick}>
               <Plus size={20} />
               Add New products
             </button>
           </header>

      <div className="atable-container">
        <table className="adata-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th> 
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>  

            {showProduct.length === 0 ?(
                <tr>
                     <td colSpan="4" style={{ textAlign: 'center' }}>
                         No product available
                     </td>
                 </tr>
              ):(
                   showProduct.map((product)=>(
                    <tr  key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img
                        src={`http://localhost:8080/uploads/${product.productImg}`} alt={product.productName} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </td>
                      <td>{product.productName}</td>
                      <td>{product.category?.catName}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stockQuantity}</td>
                      <td>
                        <button className="abtn abtn-primary" style={{ marginRight: '0.5rem' }} onClick={() => onEditClick(product.id)} >
                          <Edit size={16} />
                        </button>
                        <button className="abtn abtn-danger" onClick={() => deleteCategory(product.id)}>
                          <Trash2 size={16} /> 
                        </button>
                      </td>
                    </tr>
                 ))
              )
               
            }

          
            {/* Other rows go here... */}
          </tbody>
        </table>
      </div>

      {/* Fixed Plus Button */}
      <button 
        className="abtn abtn-primary add-btn" 
        onClick={onAddClick}
      >
        <Plus size={20} />
        Add New products
      </button>
      <ToastContainer />
    </div>
  );
}

export default Products;
