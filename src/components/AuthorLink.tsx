import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import pkg from '../../package.json'

const REPOSITORY_URL = import.meta.env.VITE_REPOSITORY_URL ?? '/'

function AuthorLink() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="mt-4 text-app-muted">
        Made by {pkg.author}
      </p>
      <a href={REPOSITORY_URL} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
    </div>
  )
}

export default AuthorLink
