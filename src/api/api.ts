// back-end api base url
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

type ApiPath =
  | '/signup'
  | '/login'
  | `/users/${string}/memberships`
  | '/conversations'
  | `/conversations/${string}`
  | `/conversations/${string}/members`
  | `/conversations/${string}/messages`

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
  const jsonRes = await res.json()
  if (jsonRes !== null && typeof jsonRes === 'object') {
    return jsonRes
  }
  return await res.text()
}

export default api
