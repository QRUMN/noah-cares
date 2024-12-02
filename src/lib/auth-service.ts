import { User, LoginCredentials } from '@/types/auth'

// Demo users
const DEMO_USERS = {
  client: {
    id: 'client-demo',
    email: 'demo@client.com',
    name: 'Demo Client',
    role: 'client',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  } as User,
  admin: {
    id: 'admin-demo',
    email: 'admin@noah-cares.com',
    name: 'Demo Admin',
    role: 'admin',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  } as User,
}

const DEMO_CREDENTIALS = {
  'demo@client.com': 'demo123',
  'admin@noah-cares.com': 'admin123',
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const storedPassword = DEMO_CREDENTIALS[credentials.email as keyof typeof DEMO_CREDENTIALS]
    
    if (!storedPassword || storedPassword !== credentials.password) {
      throw new Error('Invalid email or password')
    }

    const user = credentials.email === DEMO_USERS.client.email
      ? DEMO_USERS.client
      : DEMO_USERS.admin

    // Update last login
    user.lastLogin = new Date().toISOString()
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(user))
    
    return user
  },

  logout: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    localStorage.removeItem('user')
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('user')
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  },

  // Helper method to check if user has required role
  hasRole: (user: User | null, role: User['role']): boolean => {
    return user?.role === role
  },
}
