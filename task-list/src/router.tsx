import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

import { UnauthenticatedLayout } from './pages/layout/unauthenticatedLayout'
import { AuthenticatedLayout } from './pages/layout/authenticatedLayout'
import { Dashboard } from './pages/dashboard'
import { SignIn } from './pages/signIn'
import { SignUp } from './pages/signUp'

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <UnauthenticatedLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '*',
        element: <h1>Page Not Found</h1>,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <AuthenticatedLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
])
