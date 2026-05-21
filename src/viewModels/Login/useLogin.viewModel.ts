import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../../shared/queries/auth/use-login.mutation'
import { LoginFormData, loginScheme } from './login.scheme'
import { useUserStore } from '@/shared/store/user-store'

export const useLoginViewModel = () => {

  const {user} = useUserStore()

  console.log(user)
  
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLoginMutation()

  const onSubmit = handleSubmit(async (userFormData) => {
    const userData = await loginMutation.mutate(userFormData)
    console.log(userData)
  })

  return {
    control,
    onSubmit,
  }
}