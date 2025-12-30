import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useChatContext } from './context'
import Home from './home/Home'
import Login from './login/Login'
import Signup from './signup/Signup'
import Chat from './chat/Chat'

function App() {
  const { session } = useChatContext()
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/chat"
          element={session
            ? <Chat />
            : <Login />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
