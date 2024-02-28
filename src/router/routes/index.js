import { lazy } from 'react'
import DashboardRoutes from './Dashboards'
// ** Document title
const TemplateTitle = '%s - Payhub Admin Dashboard'

// ** Default Route
const DefaultRoute = '/dashboard/ecommerce'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  // {
  //   path: '/dashboard',
  //   component: lazy(() => import('../../views/Home'))
  // },
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/send-money',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/transactions',
    component: lazy(() => import('../../views/transactions')),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
