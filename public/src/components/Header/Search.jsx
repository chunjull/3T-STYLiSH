import styled from "styled-components";
import searchIcon from "../../images/search.png";
import searchIconHover from "../../images/search-hover.png";
import PropTypes from "prop-types";
import { useState } from "react";

function Search({ isVisible }) {
  const [keyword, setKeyword] = useState("");

  if (!isVisible) return null;

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (setKeyword !== "") {
      window.location.href = `home.html?keyword=${keyword}`;
    }
  };

  return (
    <SearchBar
      onSubmit={handleSubmit}
    >
      <Input
        type="search"
        placeholder="西裝"
        value={keyword}
        onChange={handleInputChange}
      />
      <Button type="submit" />
    </SearchBar>
  );
}

Search.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

const SearchBar = styled.form`
  border: 1px solid #979797;
  background-color: #fff;
  width: 216px;
  height: 46px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  right: -1px;
  top: -1px;
  margin-right: 42px;

  @media screen and (max-width: 1279px) {
    width: 320px;
    height: 40px;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 6px;
    left: 0;
    overflow: hidden;
    z-index: 1;
  }
`;

const Input = styled.input`
  all: unset;
  height: 44px;
  width: 140px;
  padding-left: 20px;
  color: #8b572a;
  font-size: 20px;
  line-height: 24px;
  position: relative;

  &::placeholder {
    color: #8b572a;
  }

  @media screen and (max-width: 1279px) {
    width: 75%;
  }
`;

const Button = styled.button`
  background: url(${searchIcon});
  width: 44px;
  height: 44px;
  border: none;
  position: absolute;
  right: 10px;

  &:hover {
    background: url(${searchIconHover});
    cursor: pointer;
  }
`;

export default Search;
