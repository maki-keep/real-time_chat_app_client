import { Link } from 'react-router-dom'
import AuthorLink from '../components/AuthorLink'
import Layout from '../components/Layout'

function Home() {
  return (
    <Layout>
      <div className="flex gap-8 items-center">
        <h1 className="font-semibold text-4xl">Real-Time Chat App</h1>
      </div>
      <div className="bg-app-card flex flex-col gap-8 justify-center items-stretch p-8 rounded-lg shadow-md w-72">
        <Link to="/login" style={{ display: 'contents'}}>
          <button className="bg-app-btn border border-app-btn-border cursor-pointer focus:outline-none focus-visible:ring-4 font-medium px-8 py-4 rounded-lg text-xl">
            Sign In
          </button>
        </Link>
        <Link to="/signup" style={{ display: 'contents'}}>
          <button className="bg-app-btn border border-app-btn-border cursor-pointer focus:outline-none focus-visible:ring-4 font-medium px-8 py-4 rounded-lg text-xl">
            Sign Up
          </button>
        </Link>
      </div>
      <AuthorLink />
    </Layout>
  )
}

export default Home
