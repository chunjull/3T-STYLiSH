import styled from "styled-components";
import line from "./line.png";
import twitter from "./twitter.png";
import facebook from "./facebook.png";

const Contact = () => {
  return (
    <ContactList>
      <ContactItem>
        <ContactImg src={line} alt="line" />
      </ContactItem>
      <ContactItem>
        <ContactImg src={twitter} alt="twitter" />
      </ContactItem>
      <ContactItem>
        <ContactImg src={facebook} alt="facebook" />
      </ContactItem>
    </ContactList>
  );
};

const ContactList = styled.ul`
  display: flex;
  gap: 30px;

  @media screen and (max-width: 1279px) {
    gap: 14px;
  }
`;

const ContactItem = styled.li`
  border-image-width: 0;
`;

const ContactImg = styled.img`
  width: 50px;
  height: 50px;

  @media screen and (max-width: 1279px) {
    width: 20px;
    height: 20px;
  }
`;

export default Contact;
