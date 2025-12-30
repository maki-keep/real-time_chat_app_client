import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChatProvider } from './context.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>,
)
