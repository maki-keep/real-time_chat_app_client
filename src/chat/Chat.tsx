import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChatContext } from '../context'
import api from '../api/api'
import Layout from '../components/Layout'

type Member = {
  id: string
  conversation_id: string
}

type Conversation = {
  id: string
  title: string
}

type User = {
  sub: string
  username: string
}

type Message = {
  id: string
  author_id: string
  content: string
}

function Chat() {
  const { session, token } = useChatContext()

  const navigate = useNavigate()

  // run on session or token change
  useEffect(() => {
    // redirect to login if not authenticated
    if (!session || !token) {
      navigate('/login')
    }
  }, [session, token])

  const bearerTokenHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const [formConversationTitle, setFormConversationTitle] = useState('')
  const [formMessageContent, setFormMessageContent] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>()
  const [messages, setMessages] = useState<Message[]>([])
  const [loadingConversations, setLoadingConversations] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [creatingConversation, setCreatingConversation] = useState(false)
  const [addingMember, setAddingMember] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)

  // run on session or token change
  useEffect(() => {
    // async self-running function
    const fetchConversations = async () => {
      setLoadingConversations(true)

      try {
        const membershipsRes = await api(`/users/${session!.sub}/memberships`, {
          headers: bearerTokenHeaders
        })

        const memberships: Member[] = membershipsRes.items
          ? membershipsRes.items
          : []

        // load all conversations concurrently
        const newConversations: Conversation[] = await Promise.all(
          memberships.map(async membership => {
            const conversationRes = await api(`/conversations/${membership.conversation_id}`, {
              headers: bearerTokenHeaders
            })
            const conversation: Conversation = conversationRes
            return conversation
          })
        )

        setConversations(newConversations)

        // select the first conversation
        if (!activeConversation && newConversations.length > 0) {
          setActiveConversation(newConversations[0])
        }
      } catch (err) {
        console.error('Failed to load conversations', err)
      } finally {
        setLoadingConversations(false)
      }
    }

    fetchConversations()
  }, [session, token])

  // run on activeConversation change
  useEffect(() => {
    // clear messages if no active conversation
    if (!activeConversation) {
      setMessages([])
      return
    }

    // async self-running function
    const fetchMessages = async () => {
      setLoadingMessages(true)

      try {
        const messagesRes = await api(`/conversations/${activeConversation.id}/messages`, {
          headers: bearerTokenHeaders
        })

        const messages: Message[] = messagesRes.items
          ? messagesRes.items
          : []

        setMessages(messages)
      } catch (err) {
        console.error('Failed to load messages', err)
      } finally {
        setLoadingMessages(false)
      }
    }

    fetchMessages()
  }, [activeConversation])

  const addMember = async (conversation: Conversation, user: User) => {
    if (addingMember) return

    setAddingMember(true)

    try {
      await api(`/conversations/${conversation.id}/members`, {
        method: 'POST',
        headers: bearerTokenHeaders,
        body: JSON.stringify({ userId: user.sub })
      })
    } catch (err) {
      console.error('Failed to add member to conversation', err)
    } finally {
      setAddingMember(false)
    }
  }

  const submitCreateConversation = async () => {
    if (!formConversationTitle) return

    setCreatingConversation(true)

    try {
      const createdConversationRes = await api('/conversations', {
        method: 'POST',
        headers: bearerTokenHeaders,
        body: JSON.stringify({ title: formConversationTitle })
      })
      const createdConversation: Conversation = createdConversationRes

      // add member from current session user
      await addMember(createdConversation, session!)

      setFormConversationTitle('')
      setConversations(prevConversations => [...prevConversations, createdConversation])

      // select the created conversation
      setActiveConversation(createdConversation)
    } catch (err) {
      console.error('Failed to create conversation', err)
    } finally {
      setCreatingConversation(false)
    }
  }

  const submitSendMessage = async () => {
    if (!activeConversation || !formMessageContent) return

    setSendingMessage(true)

    try {
      const createdMessageRes = await api(`/conversations/${activeConversation.id}/messages`, {
        method: 'POST',
        headers: bearerTokenHeaders,
        body: JSON.stringify({ content: formMessageContent })
      })
      const createdMessage: Message = createdMessageRes

      setFormMessageContent('')
      setMessages(prevMessages => [...prevMessages, createdMessage])
    } catch (err) {
      console.error('Failed to send message', err)
    } finally {
      setSendingMessage(false)
    }
  }

  return (
    <Layout>
      <div className="flex flex-1 flex-row grid-cols-3 overflow-auto w-full">
        <div className="border-app-card border-r col-span-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            {conversations.length === 0 && (
              <div className="text-app-muted text-sm">{loadingConversations
                ? 'Loading conversations...'
                : 'No conversations'
              }</div>
            )}
            <ul className="flex flex-col gap-4">
              {conversations.map(conversation => (
                <li key={conversation.id}>
                  <button
                    className={`bg-app-btn border cursor-pointer ${activeConversation === conversation ? 'border-app-text' : 'border-app-btn-border'} p-3 rounded w-full`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    {conversation.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-app-card flex gap-2 items-center p-4">
            <input
              className="bg-app-btn border border-app-btn-border disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted flex-1 px-3 py-2 rounded-lg"
              placeholder="New conversation title"
              value={formConversationTitle}
              onChange={e => setFormConversationTitle(e.target.value)}
              disabled={creatingConversation}
            />
            <button
              className="bg-app-accent cursor-pointer disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted px-3 py-2 rounded-lg text-app-accent-text"
              onClick={submitCreateConversation}
              disabled={creatingConversation}
            >
              Create
            </button>
          </div>
        </div>
        <div className="col-span-2 flex flex-1 flex-col">
          <div className="flex-1 overflow-auto p-4">
            {!activeConversation && (
              <div className="text-app-muted text-sm">{loadingMessages
                ? 'Loading messages...'
                : 'Select a conversation'
              }</div>
            )}
            <ul className="flex flex-col gap-4">
              {activeConversation && messages.map(message => (
                <li key={message.id}>
                  <div className="text-xs">{message.author_id}</div>
                  <div>{message.content}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-app-card border-app-card border-t flex gap-2 items-center p-4">
            <input
              className="bg-app-btn border border-app-btn-border disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted flex-1 px-3 py-2 rounded-lg"
              placeholder="Type a message"
              value={formMessageContent}
              onChange={e => setFormMessageContent(e.target.value)}
              disabled={!activeConversation || sendingMessage}
            />
            <button
              className="bg-app-accent cursor-pointer disabled:bg-app-muted-bg disabled:cursor-not-allowed disabled:text-app-muted px-3 py-2 rounded-lg text-app-accent-text"
              onClick={submitSendMessage}
              disabled={!activeConversation || sendingMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Chat
