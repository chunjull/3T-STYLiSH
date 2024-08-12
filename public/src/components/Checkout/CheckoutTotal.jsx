import styled from "styled-components";
import propTypes from "prop-types";

function CheckoutTotal({ total }) {
  let shippingFee;
  if (total === 0) {
    shippingFee = 0;
  } else {
    shippingFee = 30;
  }

  return (
    <>
      <CheckoutTotalContainer>
        <CheckoutTotalContent>
          <CheckoutTotalText>總金額</CheckoutTotalText>
          <CheckoutPriceContent>
            <CheckoutTotalCurrency>NT.</CheckoutTotalCurrency>
            <CheckoutTotalPrice>{total}</CheckoutTotalPrice>
          </CheckoutPriceContent>
        </CheckoutTotalContent>
        <CheckoutTotalContent>
          <CheckoutTotalText>運費</CheckoutTotalText>
          <CheckoutPriceContent>
            <CheckoutTotalCurrency>NT.</CheckoutTotalCurrency>
            <CheckoutShippingFee>{shippingFee}</CheckoutShippingFee>
          </CheckoutPriceContent>
        </CheckoutTotalContent>
        <CheckoutTotalLine />
        <CheckoutTotalContent>
          <CheckoutTotalText>應付金額</CheckoutTotalText>
          <CheckoutPriceContent>
            <CheckoutTotalCurrency>NT.</CheckoutTotalCurrency>
            <CheckoutSubTotalPrice>{total + shippingFee}</CheckoutSubTotalPrice>
          </CheckoutPriceContent>
        </CheckoutTotalContent>
      </CheckoutTotalContainer>
      <CheckoutTotalButton>確認付款</CheckoutTotalButton>
    </>
  );
}

CheckoutTotal.propTypes = {
  total: propTypes.number.isRequired,
};

const CheckoutTotalContainer = styled.div`
  width: 240px;
  height: 168px;
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const CheckoutTotalContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const CheckoutTotalText = styled.p`
  font-size: 16px;
  line-height: 19px;
`;

const CheckoutPriceContent = styled.div`
  display: flex;
  align-items: center;
`;

const CheckoutTotalCurrency = styled.p`
  font-size: 16px;
  line-height: 19px;
  padding-right: 8px;
`;

const CheckoutTotalPrice = styled.p`
  font-size: 30px;
  line-height: 36px;
  padding-right: 4px;
`;

const CheckoutShippingFee = styled.p`
  font-size: 30px;
  line-height: 36px;
  padding-right: 2px;
`;

const CheckoutSubTotalPrice = styled.p`
  font-size: 30px;
  line-height: 36px;
`;

const CheckoutTotalLine = styled.div`
  border-bottom: 1px solid #3f3a3a;
  margin-bottom: 20px;
`;

const CheckoutTotalButton = styled.button`
  color: #ffffff;
  background: #000000;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  margin-top: 50px;
  padding: 18px 0px 17px 4px;
  border: 0;
  width: 240px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-top: 16px;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

export default CheckoutTotal;
