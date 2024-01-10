import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import navigation from '../_nav'
import useAuthContext from '../../AuthContext/AuthContext'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { usersAuthFetch } = useAuthContext();
  const userLevel = usersAuthFetch.level;

  const filterNavigation = (items, userLevel) => {
    return items.map((item) => {
      const newItem = { ...item };
      if (newItem.name === 'User') {
        if (userLevel === 3) {
          return null; 
        }
        if (userLevel === 2) {
          newItem.items = newItem.items.filter((subItem) => subItem.name !== 'Deleted User');
        }
      }
      if (newItem.items) {
        newItem.items = filterNavigation(newItem.items, userLevel);
      }
      return newItem; 
    }).filter(Boolean);
  };
  
  
  const filteredNavigation = filterNavigation([...navigation], userLevel);


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
