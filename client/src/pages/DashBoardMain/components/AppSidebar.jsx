import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'


import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import useAuthContext from '../../AuthContext/AuthContext'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { usersAuthFetch } = useAuthContext();

  console.log(usersAuthFetch.level)
  console.log(usersAuthFetch)

  const filterNavigation = (items) => {
    return items.map((item) => {
      const newItem = { ...item }; // Sao chép item
      if (newItem.name === 'Deleted User' && usersAuthFetch.level !== 1) {
        return null; // Loại bỏ mục 'Deleted User' nếu không phải là Admin Master = level 1
      }
      if (newItem.items) {
        newItem.items = filterNavigation(newItem.items); // Lọc các mục con
      }
      return newItem; // Trả về item mới
    }).filter(Boolean); // Loại bỏ các item null sau khi lọc
  };
    
  const filteredNavigation = filterNavigation([...navigation]); // Sao chép mảng navigation trước khi lọc
  
  

  console.log(filteredNavigation);


  return (
    <CSidebar
      position="fixed"
      style={{background: '#262626'}}
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <h2 style={{fontWeight: '700'}}>MADAM BOUTIQUE</h2>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={filteredNavigation}/>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
