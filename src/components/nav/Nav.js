import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";

// TODO: 메뉴 스타일 변경
const MovieNav = () => {
  const params = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const nav_items = [
    { title: "예매 순위", link: "reservation" },
    { title: "주간 박스오피스", link: "boxoffice" },
    { title: "OTT 랭킹", link: "ott" },
    { title: "글로벌 개봉 예정작", link: "globalupcoming" },
  ];

  useEffect(() => {}, []);

  return (
    <Navbar className="" color="light">
      {/* <NavbarBrand href="">HOME</NavbarBrand> */}
      {/* <NavbarToggler onClick={toggle} /> */}
      <Collapse isOpen={isOpen} navbar>
        <Nav pills>
          {nav_items.map((item, idx) => {
            const isActive = params.pathname.includes(item.link);
            return (
              <NavItem key={idx}>
                <NavLink className="fw-bold" href={item.link} active={isActive ? true : false}>
                  {item.title}
                </NavLink>
              </NavItem>
            );
          })}
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
