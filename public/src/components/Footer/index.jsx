import styled from "styled-components";
import About from "./About";
import Contact from "./Contact";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <FooterBackground>
      <Container>
        <FooterContent>
          <About />
          <Contact />
        </FooterContent>
        <Copyright />
      </Container>
    </FooterBackground>
  );
};

const FooterBackground = styled.div`
  background-color: #313538;
  color: #f5f5f5;
  padding-top: 33px;
  padding-bottom: 32px;
  margin-top: auto;

  @media screen and (max-width: 1279px) {
    padding: 0;
  }
`;

const Container = styled.div`
  max-width: 1160px;
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 0 auto;

  @media screen and (max-width: 1279px) {
    display: block;
    width: 296px;
    padding: 23px 0 20px 0;
    margin-bottom: 61px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 101px;

  @media screen and (max-width: 1279px) {
    gap: 31px;
    width: 100%;
  }
`;

export default Footer;
