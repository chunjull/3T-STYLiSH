import styled from "styled-components";

const Copyright = () => {
  return <CopyrightText>&copy; 2018. All rights reserved.</CopyrightText>;
};

const CopyrightText = styled.div`
  color: #828282;
  font-size: 12px;
  white-space: nowrap;

  @media screen and (max-width: 1279px) {
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #828282;
    padding-top: 13px;
  }
`;

export default Copyright;
