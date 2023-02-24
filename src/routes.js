import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'

import DashboardLayout from './layouts/dashboard'
import SimpleLayout from './layouts/simple'

import { ProtectedRoute } from './components/protected-route'
import { Loading } from './components/loading'

const AdminsPage = lazy(() => import('./pages/AdminsPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const FeedbacksPage = lazy(() => import('./pages/FeedbacksPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const MagicLoginPage = lazy(() => import('./pages/MagicLoginPage'))
const Page404 = lazy(() => import('./pages/Page404'))

export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: (
				<Loading>
					<ProtectedRoute>
						<DashboardLayout />
					</ProtectedRoute>
				</Loading>
			),
			children: [
				{ element: <Navigate to='/admins' />, index: true },
				{
					path: '/admins',
					element: (
						<Loading>
							<AdminsPage />
						</Loading>
					)
				},
				{
					path: '/orders',
					element: (
						<Loading>
							<OrdersPage />
						</Loading>
					)
				},
				{
					path: '/feedbacks',
					element: (
						<Loading>
							<FeedbacksPage />
						</Loading>
					)
				}
			]
		},
		{
			path: 'login',
			element: (
				<Loading>
					<LoginPage />
				</Loading>
			)
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to='/admin' />, index: true },
				{
					path: '404',
					element: (
						<Loading>
							<Page404 />
						</Loading>
					)
				},
				{
					path: 'magic-login',
					element: (
						<Loading>
							<MagicLoginPage />
						</Loading>
					)
				},
				{ path: '*', element: <Navigate to='/404' /> }
			]
		},
		{
			path: '*',
			element: <Navigate to='/404' replace />
		}
	])
}
