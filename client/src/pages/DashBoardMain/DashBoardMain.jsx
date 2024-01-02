import React, {Component, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import {AppFooter, AppHeader, AppSidebar} from './components'
import BrandCreate from './scenes/Brands/BrandCreate'
import BrandEdit from './scenes/Brands/BrandEdit'
import BrandList from './scenes/Brands/BrandList'
import {default as CategoryCreate} from "./scenes/Categories/CategoryCreate"
import CategoryEdit from './scenes/Categories/CategoryEdit'
import CategoryList from './scenes/Categories/CategoryList'
import CollectionCreate from './scenes/Collections/CollectionCreate'
import CollectionEdit from './scenes/Collections/CollectionEdit'
import CollectionList from './scenes/Collections/CollectionList'
import DesignerCreate from './scenes/Designers/DesignerCreate'
import DesignerEdit from './scenes/Designers/DesignerEdit'
import DesignerList from './scenes/Designers/DesignerList'
import CommentByProduct from './scenes/Products/CommentByProduct/CommentByProduct'
import Details from './scenes/Products/CommentByProduct/Details'
import ProductCreate from "./scenes/Products/ProductCreate"
import ProductEdit from './scenes/Products/ProductEdit'
import ProductList from './scenes/Products/ProductList'
import UserCreate from './scenes/Users/UserCreate'
import UserEdit from './scenes/Users/UserEdit'
import UserList from './scenes/Users/UserList'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import Colors from './views/theme/colors/Colors'
import BlogList from "./scenes/Blogs/BlogList";
import BlogCreate from "./scenes/Blogs/BlogCreate";
import BlogEdit from "./scenes/Blogs/BlogEdit";
import UserStatusDetail from './scenes/Users/UserStatusDetail'

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
                <AppSidebar/>
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader/>
                    <div className="body flex-grow-1 px-3">
                        {/* <AppContent /> */}
                        <Suspense fallback={loading}>
                            <Routes>
                                {/* <Route path="/*" element={<MainLayout />} /> */}
                                <Route path="*" name="Home" element={<Dashboard/>}/>
                                <Route path="blog" element={<BlogList/>}/>
                                <Route path="blog/create" element={<BlogCreate/>}/>
                                <Route path="blog/edit/:id" element={<BlogEdit/>}/>
                                <Route path="designer" element={<DesignerList/>}/>
                                <Route path="designer/create" element={<DesignerCreate/>}/>
                                <Route path="designer/edit/:id" element={<DesignerEdit/>}/>
                                <Route path="brand" element={<BrandList/>}/>
                                <Route path="brand/create" element={<BrandCreate/>}/>
                                <Route path="brand/edit/:id" element={<BrandEdit/>}/>
                                <Route path="user" element={<UserList/>}/>
                                <Route path="user/create" element={<UserCreate/>}/>
                                <Route path="user/edit/:id" element={<UserEdit/>}/> UserStatusDetail
                                <Route path="user/delete/status" element={<UserStatusDetail/>}/>
                                <Route path="collection" element={<CollectionList/>}/>
                                <Route path="collection/create" element={<CollectionCreate/>}/>
                                <Route path="collection/edit/:id" element={<CollectionEdit/>}/>
                                <Route path="category" element={<CategoryList/>}/>
                                <Route path="category/create" element={<CategoryCreate/>}/>
                                <Route path="category/edit/:id" element={<CategoryEdit/>}/>
                                <Route path="product" element={<ProductList/>}/>
                                <Route path="product/create" element={<ProductCreate/>}/>
                                <Route path="product/edit/:id" element={<ProductEdit/>}/>
                                <Route path="product/comment/" element={<CommentByProduct/>}/>
                                <Route path="product/comment/detail/:id" element={< Details/>}/>
                                {/* //  */}
                                <Route path="theme/color" element={<Colors/>}/>
                            </Routes>
                        </Suspense>
                    </div>
                    <AppFooter/>
                </div>
            </div>
        );
    }


    // render() {
    //   return (
    //     <div>
    //       <AppSidebar />
    //       <div className="wrapper d-flex flex-column min-vh-100 bg-light">
    //         <AppHeader />
    //         <div className="body flex-grow-1 px-3">
    //           {/* <AppContent /> */}
    //           <Suspense fallback={loading}>
    //             <Routes>
    //               {/* <Route path="/*" element={<MainLayout />} /> */}
    //               <Route path="*" name="Home" element={<Dashboard />} />
    //               <Route path="designer" element={<DesignerList />} />
    //               <Route path="designer/create" element={<DesignerCreate />} />
    //               <Route path="designer/edit/:id" element={<DesignerEdit />} />
    //               <Route path="brand" element={<BrandList />} />
    //               <Route path="brand/create" element={<BrandCreate />} />
    //               <Route path="brand/edit/:id" element={<BrandEdit />} />
    //               <Route path="user" element={<UserList />} />
    //               <Route path="user/create" element={<UserCreate />} />
    //               <Route path="user/edit/:id" element={<UserEdit />} /> UserStatusDetail
    //               <Route path="user/delete/status" element={<UserStatusDetail />} />
    //               <Route path="collection" element={<CollectionList />} />
    //               <Route path="collection/create" element={<CollectionCreate />} />
    //               <Route path="collection/edit/:id" element={<CollectionEdit />} />
    //               <Route path="category" element={<CategoryList />} />
    //               <Route path="category/create" element={<CategoryCreate />} />
    //               <Route path="category/edit/:id" element={<CategoryEdit />} />
    //               <Route path="product" element={<ProductList />} />
    //               <Route path="product/create" element={<ProductCreate />} />
    //               <Route path="product/edit/:id" element={<ProductEdit />} />
    //               <Route path="product/comment/" element={<CommentByProduct />} />
    //               <Route path="product/comment/detail/:id" element={< Details />} />
    //               {/* //  */}
    //               <Route path="theme/color" element={<Colors />} />
    //             </Routes>
    //           </Suspense>
    //         </div>
    //         <AppFooter />
    //       </div>
    //     </div>
    //   );
    // }
}

export default DashBoardMain
