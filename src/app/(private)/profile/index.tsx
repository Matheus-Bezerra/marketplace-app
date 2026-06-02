import { useProfileViewModel } from "@/viewModels/Profile/useProfile.viewModel";
import { ProfileView } from "@/viewModels/Profile/Profile.view";

export default function Profile() {
  const viewModel = useProfileViewModel() 

  return (
    <ProfileView {...viewModel} />  
  )
} 