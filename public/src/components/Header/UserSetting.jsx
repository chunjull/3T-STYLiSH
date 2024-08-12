// UserSetting.jsx
import styled from "styled-components";
import searchIcon from "../../images/search.png";
import Search from "./Search";
import { useState } from 'react';

function UserSetting() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  
  return (
    <>
      <SearchMobile onClick={toggleSearch}/>
      <Search isVisible={isSearchVisible} />
    </>
  );
}

const SearchMobile = styled.button`
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
    background: url(${searchIcon});
    width: 40px;
    height: 40px;
    background-size: cover;
    position: absolute;
    top: 6px;
    right: 16px;
    border: 0;
  }
`;

export default UserSetting;