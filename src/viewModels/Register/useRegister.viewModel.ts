import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '../../shared/queries/auth/use-register.mutation'
import { RegisterFormData, registerScheme } from './register.scheme'
import { useUserStore } from '@/shared/store/user-store'

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation()
  const {setSession} = useUserStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123123123',
      confirmPassword: '123123123',
      phone: '11111111111',
    },
  })

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData

    const mutationResponse = await userRegisterMutation.mutateAsync(registerData)
    setSession({
      user: mutationResponse.user,
      token: mutationResponse.token,
      refreshToken: mutationResponse.refreshToken,
    })
  })

  return {
    control,
    errors,
    onSubmit,
  }
}