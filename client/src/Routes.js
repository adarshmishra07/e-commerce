import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import Profile from './user/Profile'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import AdminRoutes from './auth/helper/AdminRoutes'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageCategories from './admin/ManageCategories'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Orders from './admin/Orders'
import Cart from './core/Cart'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/cart" exact component={Cart}/>
                <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard}/>
                <PrivateRoutes path="/user/profile" exact component={Profile}/>
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard}/>
                <AdminRoutes path="/admin/create/category" exact component={AddCategory}/>
                <AdminRoutes path="/admin/categories" exact component={ManageCategories}/>
                <AdminRoutes path="/admin/create/product" exact component={AddProduct}/>
                <AdminRoutes path="/admin/products" exact component={ManageProducts}/>
                <AdminRoutes path="/admin/update/product/:productId" exact component={UpdateProduct}/>
                <AdminRoutes path="/admin/update/category/:categoryId" exact component={UpdateCategory}/>
                <AdminRoutes path="/admin/orders" exact component={Orders}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
