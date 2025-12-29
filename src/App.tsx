import viteLogo from '/vite.svg'

function App() {
  return (
    <div className="bg-app-bg flex flex-col gap-8 items-center justify-center min-h-screen text-app-text">
      <div className="flex gap-8 items-center">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            className="h-24 p-6"
            alt="Vite logo"
          />
        </a>
      </div>
      <h1 className="font-semibold text-4xl">Real-Time Chat App</h1>
      <div className="bg-app-card flex flex-col gap-8 justify-center p-8 rounded-lg shadow-md">
        <button className="bg-app-btn border border-app-btn-border focus:outline-none focus-visible:ring-4 focus-visible:ring-app-accent/30 font-medium hover:border-app-accent px-8 py-4 rounded-lg text-xl">
          Sign In
        </button>
        <button className="bg-app-btn border border-app-btn-border focus:outline-none focus-visible:ring-4 focus-visible:ring-app-accent/30 font-medium hover:border-app-accent px-8 py-4 rounded-lg text-xl">
          Sign Up
        </button>
      </div>
      <p className="mt-4 text-app-muted">
        Powered by Vite.
      </p>
    </div>
  )
}

export default App
