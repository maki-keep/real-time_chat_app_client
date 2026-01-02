import AuthLayout from '../components/AuthLayout'

function Signup() {
  return <AuthLayout
    path="/signup"
    autoCompletePassword="new-password"
    buttonContent="Sign Up"
  />
}

export default Signup
