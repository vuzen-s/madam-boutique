import React from 'react'
import CollectionCreate from './scenes/Collections/CollectionCreate'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Modules
// const CollectionCreate = React.lazy(() => import('./scenes/Collections/CollectionCreate'))
const CollectionList = React.lazy(() => import('./scenes/Collections/CollectionList'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/dashboard/collection', name: 'CollectionList', element: CollectionList },
  { path: '/dashboard/collection/create', name: 'CollectionCreate', element: CollectionCreate },
]

export default routes
