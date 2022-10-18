import './header.scss';
import { StyledLink, HeaderCol   } from "../../utils/style/header";

export default function Header() {
  return (
      <HeaderCol>
          <StyledLink to="/">
            Home
          </StyledLink>
          <StyledLink to="/postOffice">
            Post Office
          </StyledLink>
          <StyledLink to="/auth">
            Login
          </StyledLink>
          <StyledLink to="/logout">
            Logout
          </StyledLink>
          <StyledLink to="/createPost">
            Create a post
          </StyledLink>
          
      </HeaderCol>
  )
}