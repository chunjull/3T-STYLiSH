import styled from "styled-components";
import logo from "../../images/logo.png";

function Logo() {
  return <BrandLogo href="/home.html" />;
}

const BrandLogo = styled.a`
  display: block;
  width: 258px;
  height: 48px;
  background-image: url(${logo});
  background-size: contain;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    width: 129px;
    height: 24px;
    margin: 14px 0;
  }
`;

export default Logo;
