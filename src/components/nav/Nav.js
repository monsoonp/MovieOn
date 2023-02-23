import { Link } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

// TODO: 메뉴 스타일 변경
const MovieNav = () => {
  return (
    <Navbar className="" color="dark" dark>
      <NavbarBrand color="white">
        {/* <Link to={`/`}>HOME</Link> */}
        <Link className="mx-5" to={`/domesticboxoffice`}>
          국내 박스오피스
        </Link>
        <Link className="mx-5" to={`/globalboxoffice`}>
          글로벌 박스오피스
        </Link>
      </NavbarBrand>

      {/* 
      <Nav className="mx-5" navbar>
        <NavLink href="/MovieOn/domesticboxofficce">국내 박스오피스</NavLink>
      </Nav>
      <Nav className="me-auto" navbar>
        <NavLink href="/MovieOn/globalboxoffice">글로벌 박스오피스</NavLink>
      </Nav>
       */}
    </Navbar>
  );
};

export default MovieNav;
