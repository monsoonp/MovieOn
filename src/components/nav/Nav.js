import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

// TODO: 메뉴 스타일 변경
const MovieNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="" color="light">
      {/* <NavbarBrand href="">HOME</NavbarBrand> */}
      {/* <NavbarToggler onClick={toggle} /> */}
      <Collapse isOpen={isOpen} navbar>
        <Nav>
          <NavItem>
            <NavLink className="" href={`boxoffice`}>
              국내 박스오피스
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="" href={`globalupcoming`}>
              글로벌 개봉 예정작
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
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
