import React from 'react'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components'
import '../scss/style.scss'

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

const DefaultLayout = () => {

  // function handleView(path) {
  //   switch (path) {
  //     case '/dashboard':
  //       return <Dashboard />;
  //     case 'collection/create':
  //       return <CollectionCreate />;
  //     default:
  //       return <Dashboard />;
  //   }
  // }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
