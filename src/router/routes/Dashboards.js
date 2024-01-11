import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/home',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  }
]

export default DashboardRoutes
