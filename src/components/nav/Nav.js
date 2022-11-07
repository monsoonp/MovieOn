import { Link } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";

export default Nav = () => {
  return (
    <Navbar className="" color="dark" dark>
      <NavbarBrand color="white">
        <Link to={`/`}>HOME</Link>
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavLink href="/MovieOn/domestic">국내</NavLink>
      </Nav>
    </Navbar>
  );
};
