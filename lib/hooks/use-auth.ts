"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'PM' | 'EM' | 'TECH_LEAD' | 'STAKEHOLDER'
  organization: {
    id: string
    name: string
    slug: string
  }
  team?: {
    id: string
    name: string
  } | null
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Verificar si hay sesión activa
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } catch {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Login
  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión')
    }

    setState({
      user: data.user,
      isLoading: false,
      isAuthenticated: true,
    })

    return data.user
  }

  // Logout
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
    router.push('/login')
  }

  // Register
  const register = async (data: {
    email: string
    password: string
    name: string
    role?: string
    organizationName?: string
  }) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.error || 'Error al registrar')
    }

    setState({
      user: result.user,
      isLoading: false,
      isAuthenticated: true,
    })

    return result.user
  }

  return {
    ...state,
    login,
    logout,
    register,
    checkAuth,
  }
}

