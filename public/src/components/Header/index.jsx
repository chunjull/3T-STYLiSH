import styled from "styled-components";
import Logo from "./Logo";
import Category from "./Category";
import Search from "./Search";
import Menu from "./Menu";
import UserSetting from "./UserSetting";
import { useState, useEffect } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Navigation>
        <Logo />
        <Category />
        <UserSetting />
      </Navigation>
      <UserActions>
        <Search isVisible={isVisible} />
        <Menu />
      </UserActions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 40px solid #313538;
  padding: 26px 54px 26px 60px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;

  @media screen and (max-width: 1279px) {
    padding: 0;
    border: 0;
    justify-content: center;
    flex-direction: column;
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 57px;

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    position: relative;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
