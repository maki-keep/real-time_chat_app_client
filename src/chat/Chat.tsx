import { useChatContext } from '../context'
import Layout from '../Layout'

function Chat() {
  const { session } = useChatContext()

  console.log(session)

  return (
    <Layout>
      <h1>Welcome to Real-Time Chat App</h1>
    </Layout>
  )
}

export default Chat
