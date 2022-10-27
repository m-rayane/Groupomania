import './header.scss';
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <>
      <Link to="/">
        Home
      </Link>
      <Link to="/login">
        Login
      </Link>
      <Link to="/logout">
        Logout
      </Link>
      <Link to="/createPost">
        Create a post
      </Link>
    </>
  )
}