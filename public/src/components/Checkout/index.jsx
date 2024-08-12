import styled from "styled-components";
import CartRemove from "./cart-remove.png";
import CartRemoveHover from "./cart-remove-hover.png";
import ChevronDownIcon from "./down.png";
import CheckoutOrder from "./CheckoutOrder";
import CheckoutTotal from "./CheckoutTotal";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../CartContext";

function Checkout() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [total, setTotal] = useState(0);
  const { setAmount } = useContext(CartContext);
  const { setCartQuantity } = useContext(CartContext);

  useEffect(() => {
    const cartTotal = cart.reduce(
      (sum, item) => sum + item.amount * item.price,
      0
    );
    setTotal(cartTotal);
  }, [cart]);

  function removeProducts(productId, color, size) {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.colorName === color &&
          item.size === size
        )
    );
    const deleteItem = cart.filter(
      (item) =>
        item.productId === productId &&
        item.colorName === color &&
        item.size === size
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const cartQuantity =
      parseInt(localStorage.getItem("cartQuantity"), 10) || 0;
    const deleteAmount = deleteItem.reduce(
      (total, item) => total + item.amount,
      0
    );
    const newCartQuantity = cartQuantity - deleteAmount;
    localStorage.setItem("cartQuantity", newCartQuantity.toString());

    // 更新 CartContext 的數值
    setAmount(
      updatedCart.reduce((sum, item) => sum + item.amount * item.price, 0)
    );
    setCartQuantity(newCartQuantity);
  }

  function handleQuantityChange(productId, color, size, newAmount) {
    const updatedCart = cart.map((item) => {
      if (
        item.productId === productId &&
        item.colorName === color &&
        item.size === size
      ) {
        return { ...item, amount: newAmount };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const newCartQuantity = updatedCart.reduce(
      (total, item) => total + item.amount,
      0
    );
    localStorage.setItem("cartQuantity", newCartQuantity.toString());

    // 更新 CartContext 的數值
    setAmount(
      updatedCart.reduce((sum, item) => sum + item.amount * item.price, 0)
    );
    setCartQuantity(newCartQuantity);

    alert("已更新數量");
  }

  return (
    <Container>
      <InnerContainer>
        <CartTitleContainer>
          <CartTitle>購物車</CartTitle>
          <CartTitleIndex>數量</CartTitleIndex>
          <CartTitleIndex>單價</CartTitleIndex>
          <CartTitleIndex>小計</CartTitleIndex>
        </CartTitleContainer>
        <CartDetailsContainer>
          {cart.map((item, index) => (
            <CartDetails key={index}>
              <CartDetailsProductMobile>
                <CartDetailsProduct>
                  <CartDetailsImage src={item.image} />
                  <CartDetailsText>
                    <CartDetailsTextName>{item.name}</CartDetailsTextName>
                    <CartDetailsTextId>{item.productId}</CartDetailsTextId>
                    <CartDetailsTextColor>
                      顏色｜{item.colorName}
                    </CartDetailsTextColor>
                    <CartDetailsTextSize>尺寸｜{item.size}</CartDetailsTextSize>
                  </CartDetailsText>
                </CartDetailsProduct>
                <CartRemoveButtonMobile
                  onClick={() => {
                    removeProducts(item.productId, item.colorName, item.size);
                    alert("已刪除商品");
                  }}
                />
              </CartDetailsProductMobile>
              <CartDetailsContent>
                <CartDetailsContainerMobile>
                  <CartDetailsTitle>數量</CartDetailsTitle>
                  <CartDetailsQuantitySelect
                    value={item.amount}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.productId,
                        item.colorName,
                        item.size,
                        parseInt(e.target.value, 10)
                      )
                    }
                  >
                    {Array.from({ length: item.stock }, (_, index) => (
                      <CartDetailsQuantityOption
                        key={index + 1}
                        value={index + 1}
                      >
                        {index + 1}
                      </CartDetailsQuantityOption>
                    ))}
                  </CartDetailsQuantitySelect>
                </CartDetailsContainerMobile>
                <CartDetailsContainerMobile>
                  <CartDetailsTitle>單價</CartDetailsTitle>
                  <CartDetailsPrice>TWD.{item.price}</CartDetailsPrice>
                </CartDetailsContainerMobile>
                <CartDetailsContainerMobile>
                  <CartDetailsTitle>小計</CartDetailsTitle>
                  <CartDetailsPrice>
                    TWD.{item.amount * item.price}
                  </CartDetailsPrice>
                </CartDetailsContainerMobile>
              </CartDetailsContent>
              <CartRemoveButton
                onClick={() => {
                  removeProducts(item.productId, item.colorName, item.size);
                  alert("已刪除商品");
                }}
              />
            </CartDetails>
          ))}
        </CartDetailsContainer>
        <CheckoutOrder />
      </InnerContainer>
      <CheckoutTotal total={total} />
    </Container>
  );
}

const Container = styled.div`
  padding: 51px 0 148px 0;
  margin: 140px auto 0 auto;
  width: 1160px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (max-width: 1279px) {
    margin-top: 102px;
    width: 432px;
    padding: 20px 0 28px 0;
  }

  @media screen and (max-width: 360px) {
    width: 312px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const CartTitleContainer = styled.div`
  display: flex;
  padding-bottom: 16px;

  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;

const CartTitle = styled.p`
  padding-right: 490px;
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    padding: 0;
  }
`;

const CartTitleIndex = styled.p`
  padding-right: 160px;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const CartDetailsContainer = styled.div`
  border: 1px solid #979797;
  padding: 39px 29px;

  @media screen and (max-width: 1279px) {
    border: none;
    padding: 0;
  }
`;

const CartDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    padding-top: 30px;
  }

  @media screen and (max-width: 1279px) {
    padding: 20px 0;
    border-top: 1px solid #3f3a3a;
    flex-direction: column;
    align-items: normal;

    & + & {
      padding-top: 20px;
    }
  }
`;

const CartDetailsProductMobile = styled.div`
  @media screen and (max-width: 1279px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 20px;
  }
`;

const CartDetailsProduct = styled.div`
  display: flex;
  width: 274px;
`;

const CartDetailsImage = styled.img`
  width: 114px;
  height: 152px;
`;

const CartDetailsText = styled.div`
  padding-left: 16px;

  @media screen and (max-width: 1279px) {
    padding-left: 10px;
  }
`;

const CartDetailsTextName = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  padding-bottom: 18px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    padding-bottom: 20px;
  }
`;

const CartDetailsTextId = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  padding-bottom: 22px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    padding-bottom: 24px;
  }
`;

const CartDetailsTextColor = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  padding-bottom: 10px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    padding-bottom: 12px;
  }
`;

const CartDetailsTextSize = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  padding-left: 1px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

const CartRemoveButtonMobile = styled.button`
  display: none;
  background: url(${CartRemove});
  width: 44px;
  height: 44px;
  margin-left: 52px;
  border: none;
  cursor: pointer;

  &:hover {
    background: url(${CartRemoveHover});
  }

  @media screen and (max-width: 1279px) {
    display: block;
    margin: 0;
  }
`;

const CartDetailsContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartDetailsContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartDetailsTitle = styled.p`
  font-size: 14px;
  line-height: 17px;
  padding-bottom: 12px;
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
  }
`;

const CartDetailsQuantitySelect = styled.select`
  margin: 0 56px 0 210px;
  padding: 8px 7px 8px 16px;
  border-radius: 8px;
  border: 1px solid #979797;
  width: 80px;
  height: 32px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #f3f3f3;
  background-image: url(${ChevronDownIcon});
  background-repeat: no-repeat;
  background-position: 93% 55%;

  @media screen and (max-width: 1279px) {
    margin: 0 12px;
    padding: 7px 7px 7px 16px;
    font-size: 14px;
    line-height: 16px;
  }
`;

const CartDetailsQuantityOption = styled.option`
  font-size: 14px;
  line-height: 16px;
  color: #3f3a3a;
`;

const CartDetailsPrice = styled.p`
  font-size: 16px;
  line-height: 32px;
  color: #3f3a3a;
  width: 192px;
  text-align: center;
  padding-left: 1px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 32px;
    width: 104px;
    text-align: center;
  }
`;

const CartRemoveButton = styled.button`
  background: url(${CartRemove});
  width: 44px;
  height: 44px;
  margin-left: 52px;
  border: none;
  cursor: pointer;

  &:hover {
    background: url(${CartRemoveHover});
  }

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

export default Checkout;
