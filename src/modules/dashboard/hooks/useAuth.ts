interface User {
  role: 'super' | 'admin' | 'manager' | 'professional' | 'assistant' | 'client'
}

export const useAuth = () => {
  // TODO: Implement actual authentication logic
  const user: User = {
    role: 'admin' // This is just a placeholder. Should be replaced with actual auth logic
  }

  return { user }
}