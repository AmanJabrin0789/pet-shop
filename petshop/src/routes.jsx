import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DogShop from "./pages/DogShop";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import Userlogin from "./pages/Userlogin";
import Userregistration from "./pages/Userregistration";
import Toyshop from "./pages/Toyshop";
import Foodshop from "./pages/Foodshop";
import ShopingCart from "./pages/ShopingCart";
import SingleProductPage from "./pages/SingleProductPage";
import AdminDeshboard from "./pages/AdminPage/AdminDeshboard";
import Products from "./components/AdminComponents/Products"; // Adjust path accordingly
import PCategories from "./components/AdminComponents/PCategories"; // Adjust path accordingly
import Orders from "./components/AdminComponents/Orders"; // Adjust path accordingly
import AddProduct from "./components/AdminComponents/AddProduct"; // Adjust path accordingly
import AddCategory from "./components/AdminComponents/AddCategory"; // Adjust path accordingly
import Dashboard from "./components/AdminComponents/Dashboard";
import UsersPage from "./components/AdminComponents/UsersPage";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist";
import Contect from "./pages/Contect";
import AdminLogin from "./pages/AdminPage/AdminLogin";
import ContactAdmin from "./components/AdminComponents/ContactAdmin";
import Shop from "./pages/Shop";
import EditCategory from "./components/AdminComponents/EditCategory";
import AddCategoryMenu from "./components/AdminComponents/AddCategoryMenu";
import MenuCategory from "./components/AdminComponents/MenuCategory";
import EditMenuCategory from "./components/AdminComponents/EditMenuCategory";
import EditProduct from "./components/AdminComponents/EditProduct";
import ProtectedAdminRoute from "./pages/AdminPage/ProtectedAdminRoute";
import ProtectedUserRoute from "./pages/protectedRoutse/ProtectedUserRoute";
import CheckoutForm from "./pages/CheckoutForm";
import OrderSummary from "./pages/OrderSummary";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderPrint from "./components/AdminComponents/OrderPrint";
import ViewOrders from "./pages/ViewOrder";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopApplicationWrapper />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/dog",
        element: <DogShop />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/login",
        element: <Userlogin />,
      },
      {
        path: "/registration",
        element: <Userregistration />,
      },
      {
        path: "/toy",
        element: <Toyshop />,
      },
      {
        path: "/food",
        element: <Foodshop />,
      },
      {
        path: "/contact",
         element : <Contect />
      },
      {
        path : "/wishlist",
        element: (
          <ProtectedUserRoute>
          <Wishlist />
          </ProtectedUserRoute>
      )
      },
      {
        path: "/cart",
        element: (
            <ProtectedUserRoute>
               <ShopingCart />
            </ProtectedUserRoute>
        )
      },
      {
        path:"/checkout",
        element: (
          <ProtectedUserRoute>
           <CheckoutForm />
          </ProtectedUserRoute>
      )

      },
      {
        path:"/payment",
        element: (
          <ProtectedUserRoute>
           <Payment />
          </ProtectedUserRoute>
      )

      },
      {
        path:"order-summary",
        element: (
          <ProtectedUserRoute>
           <OrderSummary />
          </ProtectedUserRoute>
      )
      },
      {
        path: "/product/:id",
        element: <SingleProductPage />,
      },
      {
        path:"/forgot-password",
        element: <ForgotPassword />
      },
      {
          path:"/order-confirmation",
          element:<OrderConfirmation />
      },
      {
        path:"view-order",
        element: (
          <ProtectedUserRoute>
             <ViewOrders />
          </ProtectedUserRoute>
      )

      },
    
     
    ],
  },
  {
      path:"/adminlogin",
      element:<AdminLogin />
  },
  {
    path: "/admin",
    element: (
       <ProtectedAdminRoute>
          <AdminDeshboard />
       </ProtectedAdminRoute>
    ),
    children: [
      {
        path: "dashboard", 
        element: <Dashboard />, 
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories", 
        element: <PCategories />,
      },
      {
        path: "categorymenu",
        element: <MenuCategory />
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <UsersPage />
      },
      {
         path:"contact",
         element: <ContactAdmin />

      },
      {
        path: "add-product", 
        element: <AddProduct />,
      },
      {
        path: "add-category", 
        element: <AddCategory />,
      },
      {
        path: "edit-category", 
        element: <EditCategory />,
      },
      {
        path: "add-category-menu",
        element:<AddCategoryMenu />
      },
      {
        path: 'edit-category-menu',
        element:<EditMenuCategory />

      },
      {
        path: 'edit-product',
        element:<EditProduct />
      },
      {
        path: 'order/print/:orderId',
        element: <OrderPrint />
      },
    ],
  },
]);
