import { Link } from 'react-router-dom'
import Layout from '../Layout'
import viteLogo from '/vite.svg'

function Home() {
  return (
    <Layout>
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
      <div className="bg-app-card flex flex-col gap-8 justify-center items-stretch p-8 rounded-lg shadow-md">
        <Link to="/login" style={{ display: 'contents'}}>
          <button className="bg-app-btn border border-app-btn-border focus:outline-none focus-visible:ring-4 font-medium hover:border-app-accent px-8 py-4 rounded-lg text-xl">
            Sign In
          </button>
        </Link>
        <Link to="/signup" style={{ display: 'contents'}}>
          <button className="bg-app-btn border border-app-btn-border focus:outline-none focus-visible:ring-4 font-medium hover:border-app-accent px-8 py-4 rounded-lg text-xl">
            Sign Up
          </button>
        </Link>
      </div>
      <p className="mt-4 text-app-muted">
        Powered by Vite.
      </p>
    </Layout>
  )
}

export default Home
