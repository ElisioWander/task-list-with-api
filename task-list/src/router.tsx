import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'

import { UnauthenticatedLayout } from './pages/layout/unauthenticatedLayout'
import { AuthenticatedLayout } from './pages/layout/authenticatedLayout'
import { PasswordRecover } from './pages/passwordRecover'
import { PasswordReset } from './pages/passwordReset'
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
      {
        path: '/password-recover',
        element: <PasswordRecover />,
      },
      {
        path: '/password-reset/:token',
        element: <PasswordReset />,
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
