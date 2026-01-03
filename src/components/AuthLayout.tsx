import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { useChatContext } from '../context'
import AuthorLink from './AuthorLink'
import Layout from './Layout'

type AuthLayoutProps = {
  path: '/signup' | '/login'
  autoCompletePassword: string
  buttonContent: string
}

function AuthLayout({
  path,
  autoCompletePassword,
  buttonContent
}: AuthLayoutProps) {
  const { setToken } = useChatContext()
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    // prevent page reload
    e.preventDefault()

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
      <div className="flex gap-8 items-center text-center">
        <h1 className="font-semibold text-2xl">
          Real-Time Chat App
        </h1>
      </div>
      <div className="bg-app-card flex flex-col gap-8 justify-center max-w-96 overflow-auto p-8 rounded-lg shadow-md w-full">
        <form
          action="#"
          aria-busy={loading}
          className="flex flex-col gap-8"
          onSubmit={submit}
        >
          <label
            className="sr-only"
            htmlFor="username"
          >
            Username
          </label>
          <input
            autoComplete="username"
            className="bg-app-btn border border-app-btn-border disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted min-w-32 px-3 py-2 rounded-lg"
            disabled={loading}
            id="username"
            name="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
            required
            type="text"
            value={username}
          />
          <label
            className="sr-only"
            htmlFor="password"
          >
            Password
          </label>
          <input
            autoComplete={autoCompletePassword}
            className="bg-app-btn border border-app-btn-border disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted min-w-32 px-3 py-2 rounded-lg"
            disabled={loading}
            id="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            required
            type="password"
            value={password}
          />
          <button
            className="bg-app-accent border border-app-btn-border cursor-pointer disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted px-8 py-4 rounded-lg text-app-accent-text text-xl"
            disabled={loading}
            type="submit"
          >
            {buttonContent}
          </button>
        </form>
        <div
          className={`min-h-12 ${error && 'text-app-error-text'} ${loading && 'text-app-muted'} text-center text-lg`}
          role="alert"
        >
          {loading
            ? 'Loading...'
            : error || ''
          }
        </div>
      </div>
      <AuthorLink />
    </Layout>
  )
}

export default AuthLayout
