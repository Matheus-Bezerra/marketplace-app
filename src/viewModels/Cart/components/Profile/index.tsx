import { ProfileView } from '../../../Profile/Profile.view'
import { useProfileViewModel } from '../../../Profile/useProfile.viewModel'

export default function Profile() {
  const viewModel = useProfileViewModel()

  return <ProfileView {...viewModel} />
}