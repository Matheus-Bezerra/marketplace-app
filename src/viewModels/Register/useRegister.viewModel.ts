import { useState } from 'react'

export const useRegisterViewModel = () => {
  const [userData, setUserData] = useState({
    name: 'Matheus',
  })
  
  return {
    userData,
    setUserData,
  }
}