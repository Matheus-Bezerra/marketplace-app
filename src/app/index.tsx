import { Redirect } from 'expo-router';

export default function App() {

  // const userData = {
  //   token: '1234567890',
  //   name: 'John Doe',
  // }

  const userData = null;

  if(userData) {
    return <Redirect href={"/(private)/home"} />;
  }

  return <Redirect href="/login" />;
}
