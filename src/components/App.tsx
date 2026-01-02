import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import Chat from '../chat/Chat'

function App() {
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
          element={<Chat />}
        />
      </Routes>
    </Router>
  )
}

export default App
