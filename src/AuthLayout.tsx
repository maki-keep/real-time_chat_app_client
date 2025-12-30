import { useState } from 'react'
import Layout from './Layout'
import viteLogo from '/vite.svg'
import { useChatContext } from './context'
import { useNavigate } from 'react-router-dom'
import api from './api/api'

type AuthLayoutProps = {
  path: '/signup' | '/login'
  buttonContent: string
}

function AuthLayout({
  path,
  buttonContent
}: AuthLayoutProps) {
  const { setToken } = useChatContext()
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    try {
      const data = await api(path as '/signup' | '/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
      data.token && setToken(data.token)
      nav('/chat')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <Layout>
      <div className="flex gap-8 items-center">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="h-12 p-3"
            alt="Vite logo"
          />
        </a>
        <h1 className="font-semibold text-2xl">Real-Time Chat App</h1>
      </div>
      <div className="bg-app-card flex flex-col gap-8 justify-center p-8 rounded-lg shadow-md">
        <input
          className="bg-app-btn border border-app-btn-border rounded-lg"
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="bg-app-btn border border-app-btn-border rounded-lg"
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-app-accent border border-app-btn-border px-8 py-4 rounded-lg text-app-accent-text text-xl"
          onClick={submit}
        >
          {buttonContent}
        </button>
        <div
          role="alert"
          className="min-h-12 text-center text-lg text-app-error-text"
        >
          {error || ''}
        </div>
      </div>
    </Layout>
  )
}

export default AuthLayout
