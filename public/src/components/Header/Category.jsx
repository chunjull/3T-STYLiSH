import styled from "styled-components";

function Category() {
  return (
    <CategoryList>
      <CategoryItem>
        <CategoryLink href="/home.html?category=women">女裝</CategoryLink>
      </CategoryItem>
      <CategoryItem>
        <CategoryLink href="/home.html?category=men">男裝</CategoryLink>
      </CategoryItem>
      <CategoryItem>
        <CategoryLink href="/home.html?category=accessories">配件</CategoryLink>
      </CategoryItem>
    </CategoryList>
  );
}

const CategoryList = styled.ul`
  display: flex;
  @media screen and (max-width: 1279px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: #313538;
    width: 100%;
    justify-content: center;
    padding: 17px 0;
  }
`;

const CategoryItem = styled.li`
  position: relative;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    width: 1px;
    background: #3f3a3a;
    bottom: 3px;
  }

  &:first-child::before {
    display: none;
  }

  @media screen and (max-width: 1279px) {
    &::before {
      position: absolute;
      height: 16px;
      width: 1px;
      background: #808080;
      bottom: 0;
      left: 0;
    }
  }
`;

const CategoryLink = styled.a`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 30px;
  padding-right: 10px;
  padding-left: 40px;
  color: #3f3a3a;

  &:hover {
    color: #8b572a;
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0;
    padding: 0;
    color: #828282;
  }
`;

export default Category;
