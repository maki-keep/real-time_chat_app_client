// back-end api base url
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

type ApiPath =
  | '/login'
  | '/signup'

async function api(path: ApiPath, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include',
    ...options
  })
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return await res.json()
}

export default api
