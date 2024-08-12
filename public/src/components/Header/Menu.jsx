import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";
import cartIcon from "../../images/cart.png";
import memberIcon from "../../images/member.png";
import cartIconHover from "../../images/cart-hover.png";
import memberIconHover from "../../images/member-hover.png";
import cartIconMobile from "../../images/cart-mobile.png";
import memberIconMobile from "../../images/member-mobile.png";
import { Link } from "react-router-dom";

function Menu() {
  const { cartQuantity } = useContext(CartContext);
  const [localCartQuantity, setLocalCartQuantity] = useState(cartQuantity);

  useEffect(() => {
    setLocalCartQuantity(cartQuantity);
  }, [cartQuantity]);

  return (
    <>
      <MenuList>
        <MenuItem>
          <Link to="/checkout">
            <CartLink>
              <CartBadge>{localCartQuantity}</CartBadge>
            </CartLink>
          </Link>
          <CartLinkText>購物車</CartLinkText>
        </MenuItem>
        <MenuItem>
          <MemberLink />
          <MemberLinkText>會員</MemberLinkText>
        </MenuItem>
      </MenuList>
    </>
  );
}

const MenuList = styled.ul`
  display: flex;
  gap: 42px;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1279px) {
    background-color: #313538;
    padding: 8px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    gap: 0;
  }
`;

const MenuItem = styled.li`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1279px) {
    &::before {
      content: "";
      position: absolute;
      width: 1px;
      height: 24px;
      background: #828282;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }

    &:first-child::before {
      display: none;
    }
  }
`;

const CartLink = styled.div`
  background: url(${cartIcon});
  width: 44px;
  height: 44px;
  background-size: cover;
  position: relative;

  &:hover {
    background: url(${cartIconHover});
  }

  @media screen and (max-width: 1279px) {
    display: block;
    background: url(${cartIconMobile});
    width: 44px;
    height: 44px;
    background-size: cover;
  }
`;

const CartBadge = styled.span`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  display: block;
  width: 24px;
  background-color: #8b572a;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const CartLinkText = styled.div`
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
    color: #fff;
    font-size: 16px;
    line-height: 16px;
  }
`;

const MemberLink = styled.a`
  background: url(${memberIcon});
  width: 44px;
  height: 44px;
  background-size: cover;

  &:hover {
    background: url(${memberIconHover});
  }

  @media screen and (max-width: 1279px) {
    display: block;
    background: url(${memberIconMobile});
    width: 44px;
    height: 44px;
    background-size: cover;
  }
`;

const MemberLinkText = styled.div`
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
    color: #fff;
    font-size: 16px;
    line-height: 16px;
  }
`;

export default Menu;
