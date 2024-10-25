import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { api } from '../services/api'

type TokenInfo = {
  email: string
  id: string
}

type SignInCredentials = {
  email: string
  password: string
}

type SignUpCredentials = {
  email: string
  password: string
  passwordConfirmation: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signOut: () => void
  tokenInfo?: TokenInfo
  isAuthenticated: boolean
  isAuthenticating: boolean
}

type Response = {
  data: {
    id: string
    attributes: {
      token: string
    }
  }
}

type Error = {
  error: string
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>()
  const [isAuthenticating, setAuthenticating] = useState(true)

  const isAuthenticated = !!tokenInfo
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      getInfoFromToken(storedToken)
    }

    setAuthenticating(false)
  }, [])

  function getInfoFromToken(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token)
    const tokenInforData = decodedToken as TokenInfo | undefined

    if (tokenInforData) {
      setTokenInfo({
        id: tokenInforData.id,
        email: tokenInforData.email,
      })
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setAuthenticating(true)
      const response = await api.post<Response>('/auth/sign-in', {
        user: {
          email,
          password,
        },
      })

      const token = response.data.data.attributes.token
      localStorage.setItem('token', token)

      getInfoFromToken(token)

      navigate('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError<Error>(error)) {
        toast(error.response?.data?.error)
      }
    } finally {
      setAuthenticating(false)
    }
  }

  async function signUp({
    email,
    password,
    passwordConfirmation,
  }: SignUpCredentials) {
    try {
      setAuthenticating(true)
      const response = await api.post<Response>('/auth/sign-up', {
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      })

      const token = response.data.data.attributes.token
      localStorage.setItem('token', token)

      getInfoFromToken(token)

      navigate('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError<Error>(error)) {
        toast(error.response?.data?.error)
      }
    } finally {
      setAuthenticating(false)
    }
  }

  function signOut() {
    localStorage.removeItem('token')
    setTokenInfo(undefined)
    api.defaults.headers.common.Authorization = undefined
    navigate('/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        tokenInfo,
        isAuthenticated,
        isAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
