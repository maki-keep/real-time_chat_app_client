import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { useChatContext } from '../context'
import AuthorLink from './AuthorLink'
import Layout from './Layout'

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
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setError(null)
    setLoading(true)

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
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex gap-8 items-center">
        <h1 className="font-semibold text-2xl">Real-Time Chat App</h1>
      </div>
      <div className="bg-app-card flex flex-col gap-8 justify-center p-8 rounded-lg shadow-md w-96">
        <input
          className="bg-app-btn border border-app-btn-border disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted px-3 py-2 rounded-lg"
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          className="bg-app-btn border border-app-btn-border disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted px-3 py-2 rounded-lg"
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          className="bg-app-accent border border-app-btn-border cursor-pointer disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted px-8 py-4 rounded-lg text-app-accent-text text-xl"
          onClick={submit}
          disabled={loading}
        >
          {buttonContent}
        </button>
        <div
          role="alert"
          className={`min-h-12 ${error && 'text-app-error-text'} ${loading && 'text-app-muted'} text-center text-lg`}
        >
          {loading ? 'Loading...' : error || ''}
        </div>
      </div>
      <AuthorLink />
    </Layout>
  )
}

export default AuthLayout
