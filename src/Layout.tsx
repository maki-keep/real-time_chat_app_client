import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

function Layout({
  children
}: LayoutProps) {
  return (
    <div className="bg-app-bg flex flex-col gap-8 items-center justify-center min-h-screen text-app-text">
      {children}
    </div>
  )
}

export default Layout
