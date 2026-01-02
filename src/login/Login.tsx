import AuthLayout from '../components/AuthLayout'

function Login() {
  return <AuthLayout
    path="/login"
    autoCompletePassword="current-password"
    buttonContent="Log In"
  />
}

export default Login
