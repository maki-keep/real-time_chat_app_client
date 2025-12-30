import { createContext, createElement, useContext, useEffect, useState } from 'react'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { jwtDecode } from 'jwt-decode'

type Session = {
  exp?: number
  sub: string
  username: string
}

// read-only session to children components
type ChatContextValue = {
  session?: Session
  setToken: Dispatch<SetStateAction<string | undefined>>
  token?: string
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined)

const ChatProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>()
  const [session, setSession] = useState<Session | undefined>()

  useEffect(() => {
    if (!token) {
      setSession(undefined)
      return
    }

    try {
      const decoded = jwtDecode<Session>(token)

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        setSession(undefined)
        setToken(undefined)
        return
      }

      setSession(decoded)
    } catch {
      setSession(undefined)
    }
  }, [token])

  return createElement(
    ChatContext.Provider,
    { value: { session, setToken, token } },
    props.children
  )
}

const useChatContext = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }

  return context
}

export { ChatProvider, useChatContext }
