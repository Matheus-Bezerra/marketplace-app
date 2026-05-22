import { LoginView } from '@/viewModels/Login/login.view'
import { useLoginViewModel } from '@/viewModels/Login/useLogin.viewModel'

export default function Login() {
  return <LoginView {...useLoginViewModel()} />
}