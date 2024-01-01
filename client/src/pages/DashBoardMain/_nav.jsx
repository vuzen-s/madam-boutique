import {
  cilAudioDescription,
  cilCalculator,
  cilDescription,
  cilDrop,
  cilSpeedometer,
  cilStar
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Account',
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/dashboard/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Modules',
  },
  // Designer
  {
    component: CNavGroup,
    name: 'Designer',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/dashboard/designer',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/dashboard/designer/create',
      },
    ]
  },
    // Brand
    {
      component: CNavGroup,
      name: 'Brand',
      icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'List',
          to: '/dashboard/brand',
        },
        {
          component: CNavItem,
          name: 'Create',
          to: '/dashboard/brand/create',
        },
      ]
    },
  // User
  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/dashboard/user',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/dashboard/user/create',
      },
      {
        component: CNavItem,
        name: 'Deleted User',
        to: '/dashboard/user/delete/status',
      }
    ]
  },
  // Collection
  {
    component: CNavGroup,
    name: 'Collection',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/dashboard/collection',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/dashboard/collection/create',
      },
    ]
  },
  // Category
  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/dashboard/category',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/dashboard/category/create',
      },
    ]
  },
  // Products
  {
    component: CNavGroup,
    name: 'Product',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/dashboard/product',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/dashboard/product/create',
      },
      {
        component: CNavItem,
        name: 'Comment',
        to: '/dashboard/product/comment',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'Order Statistics',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    icon: <CIcon icon={cilAudioDescription} customClassName="nav-icon" />,
    to: '/404',
  },
]

export default _nav
