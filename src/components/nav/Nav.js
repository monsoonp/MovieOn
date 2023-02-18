import { Link } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";

// TODO: 국내 / 글로벌 박스오피스 형식으로 변경
const MovieNav = () => {
  return (
    <Navbar className="" color="dark" dark>
      <NavbarBrand color="white">
        <Link to={`/`}>HOME</Link>
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavLink href="/MovieOn/domestic">국내 박스오피스</NavLink>
      </Nav>
    </Navbar>
  );
};

export default MovieNav;
