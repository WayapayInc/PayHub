import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/Home')),
    exact: true
  }
]
console.log("This page is stressing me")

export default DashboardRoutes
