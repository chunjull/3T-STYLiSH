import styled from "styled-components";

const About = () => {
  return (
    <AboutList>
      <AboutItem>
        <AboutLink>關於 STYLiSH</AboutLink>
      </AboutItem>
      <AboutItem>
        <AboutLink>服務條款</AboutLink>
      </AboutItem>
      <AboutItem>
        <AboutLink>隱私政策</AboutLink>
      </AboutItem>
      <AboutItem>
        <AboutLink>聯絡我們</AboutLink>
      </AboutItem>
      <AboutItem>
        <AboutLink>FAQ</AboutLink>
      </AboutItem>
    </AboutList>
  );
};

const AboutList = styled.ul`
  display: flex;

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 8px;
    height: 76px;
  }
`;

const AboutItem = styled.li`
  width: 134px;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    width: 1px;
    height: 16px;
    background: #828282;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &:first-child::before {
    display: none;
  }

  @media screen and (max-width: 1279px) {
    text-align: left;
    width: auto;

    &::before {
      display: none;
    }

    &:nth-child(4),
    &:nth-child(5) {
      margin-left: 28px;
    }
  }
`;

const AboutLink = styled.a`
  display: block;
  color: #f5f5f5;
  font-size: 16px;
  line-height: 22px;

  &:hover {
    color: #fff;
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 20px;
    color: #d3d3d3;
  }
`;

export default About;
