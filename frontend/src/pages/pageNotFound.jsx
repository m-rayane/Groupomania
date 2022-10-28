import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="pageNotFound">
        <img src="" alt="" className="pageNotFound__image" />
        Page Not Found
      <Link to="/" className="pageNotFound__link">
        Back to home page
      </Link>
    </div>
  )
}