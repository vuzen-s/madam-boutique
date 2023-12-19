import React, { Component, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserList from '../Dashboard/scenes/Users/UserList'
import { AppFooter, AppHeader, AppSidebar } from './components'
import { default as CategoryCreate } from "./scenes/Categories/CategoryCreate"
import CategoryEdit from './scenes/Categories/CategoryEdit'
import CategoryList from './scenes/Categories/CategoryList'
import CollectionCreate from './scenes/Collections/CollectionCreate'
import CollectionEdit from './scenes/Collections/CollectionEdit'
import CollectionList from './scenes/Collections/CollectionList'
import ProductCreate from './scenes/Products/ProductCreate'
import ProductEdit from './scenes/Products/ProductEdit'
import ProductList from './scenes/Products/ProductList'
import UserCreate from './scenes/Users/UserCreate'
import UserEdit from './scenes/Users/UserEdit'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import Colors from './views/theme/colors/Colors'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))


class DashBoardMain extends Component {
  render() {
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            {/* <AppContent /> */}
            <Suspense fallback={loading}>
              <Routes>
                <Route path="*" name="Home" element={<Dashboard />} />
                <Route path="user" element={<UserList />} />
                <Route path="user/create" element={<UserCreate />} />
                <Route path="user/edit/:id" element={<UserEdit />} />
                <Route path="collection" element={<CollectionList />} />
                <Route path="collection/create" element={<CollectionCreate />} />
                <Route path="collection/edit/:id" element={<CollectionEdit />} />
                <Route path="category" element={<CategoryList />} />
                <Route path="category/create" element={<CategoryCreate />} />
                <Route path="category/edit/:id" element={<CategoryEdit />} />
                <Route path="product" element={<ProductList />} />
                <Route path="product/create" element={<ProductCreate />} />
                <Route path="product/edit/:id" element={<ProductEdit />} />
                {/* //  */}
                <Route path="theme/color" element={<Colors />} />
              </Routes>
            </Suspense>
          </div>
          <AppFooter />
        </div>
      </div>
    );
  }
}

export default DashBoardMain