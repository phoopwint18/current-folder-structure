import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, loginRequest, logoutRequest, type LoginPayload } from '@/core/api'
import { PATHS } from '@/core/routes/path'

export const authKeys = {
  me: ['auth', 'me'] as const,
}

export function useUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        return (await getCurrentUser()) ?? null
      } catch {
        return null
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      await loginRequest(payload)
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('Unable to load profile')
      }
      queryClient.setQueryData(authKeys.me, user)
      return user
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.setQueryData(authKeys.me, null)
      navigate(PATHS.login, { replace: true })
    },
  })

  return {
    user: query.data ?? null,
    isAuthenticated: Boolean(query.data),
    isReady: !query.isPending,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
  }
}
