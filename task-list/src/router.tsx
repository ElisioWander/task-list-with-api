import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './Components/Dashboard'

import { UnauthenticatedLayout } from './pages/layout/unauthenticatedLayout'
import { AuthenticatedLayout } from './pages/layout/authenticatedLayout'
import { SignIn } from './pages/signIn'
import { SignUp } from './pages/signUp'

export const router = createBrowserRouter([
  {
    element: <UnauthenticatedLayout />,
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
    element: <AuthenticatedLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
])
