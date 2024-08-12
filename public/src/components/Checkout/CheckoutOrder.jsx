import styled from "styled-components";

function CheckoutOrder() {
  return (
    <>
      <OrderContainer>
        <CheckoutTitle>訂購資料</CheckoutTitle>
        <CheckoutLine />
        <CheckoutContent>
          <CheckoutLabelName for="name">收件人姓名</CheckoutLabelName>
          <CheckoutInputName id="name" type="text" />
          <CheckoutNote>
            務必填寫完整收件人姓名，避免包裹無法順利簽收
          </CheckoutNote>
          <CheckoutLabel for="phone">手機</CheckoutLabel>
          <CheckoutInput id="phone" type="text" />
          <CheckoutLabel for="address">地址</CheckoutLabel>
          <CheckoutInput id="address" type="text" />
          <CheckoutLabel for="email">Email</CheckoutLabel>
          <CheckoutInput id="email" type="mail" />
          <CheckoutTime>
            <CheckoutTimeText>配送時間</CheckoutTimeText>
            <CheckoutTimeOption>
              <CheckoutTimeInput type="radio" id="morning" name="time" />
              <CheckoutTimeLabel for="morning">08:00-12:00</CheckoutTimeLabel>
              <CheckoutTimeInput type="radio" id="afternoon" name="time" />
              <CheckoutTimeLabel for="afternoon">14:00-18:00</CheckoutTimeLabel>
              <CheckoutTimeInput type="radio" id="noSpecify" name="time" />
              <CheckoutTimeLabel for="noSpecify">不指定</CheckoutTimeLabel>
            </CheckoutTimeOption>
          </CheckoutTime>
        </CheckoutContent>
      </OrderContainer>
      <PaymentContainer>
        <CheckoutTitle>付款資料</CheckoutTitle>
        <CheckoutLine />
        <CheckoutContent>
          <CheckoutLabelName for="card">信用卡號碼</CheckoutLabelName>
          <CheckoutInputName
            id="card"
            type="text"
            placeholder="**** **** **** ****"
          />
          <CheckoutLabel for="expire">有效期限</CheckoutLabel>
          <CheckoutInput id="expire" type="text" placeholder="MM / YY" />
          <CheckoutLabel for="code">安全碼</CheckoutLabel>
          <CheckoutInput id="code" type="text" placeholder="後三碼" />
        </CheckoutContent>
      </PaymentContainer>
    </>
  );
}

const OrderContainer = styled.div`
  padding-top: 50px;

  @media screen and (max-width: 1279px) {
    padding-top: 20px;
  }
`;

const CheckoutTitle = styled.p`
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  padding-bottom: 15px;
`;

const CheckoutLine = styled.div`
  border-bottom: 1px solid #3f3a3a;
  margin-bottom: 25px;

  @media screen and (max-width: 1279px) {
    margin-bottom: 20px;
  }
`;

const CheckoutContent = styled.div`
  width: 696px;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const CheckoutLabelName = styled.label`
  font-size: 16px;
  line-height: 19px;
  width: 120px;
  display: inline-block;
  margin-top: 6px;

  @media screen and (max-width: 1279px) {
    display: block;
    width: 100%;
    margin-top: 20px;
  }
`;

const CheckoutInputName = styled.input`
  width: 576px;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
  font-size: 16px;
  line-height: 19px;
  color: #8b572a;
  padding-top: 2px;
  padding-left: 8px;

  &::placeholder {
    color: #d3d3d3;
  }

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const CheckoutNote = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #8b572a;
  padding-top: 10px;
  text-align: end;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    padding-top: 6px;
    text-align: start;
  }
`;

const CheckoutLabel = styled.label`
  font-size: 16px;
  line-height: 19px;
  width: 120px;
  display: inline-block;

  @media screen and (max-width: 1279px) {
    display: block;
    width: 100%;
    margin-top: 20px;
  }
`;

const CheckoutInput = styled.input`
  width: 576px;
  height: 32px;
  border: 1px solid #979797;
  border-radius: 8px;
  font-size: 16px;
  line-height: 19px;
  color: #8b572a;
  padding-left: 8px;
  margin-top: 30px;

  &::placeholder {
    color: #d3d3d3;
  }

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const CheckoutTime = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CheckoutTimeText = styled.p`
  font-size: 16px;
  line-height: 19px;
  padding-right: 56px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    padding: 0;
    width: 100%;
  }
`;

const CheckoutTimeLabel = styled.label`
  font-size: 16px;
  line-height: 26px;
  padding: 0 32px 0 8px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 26px;
    padding: 0 26px 0 6px;
  }

  @media screen and (max-width: 360px) {
    &:nth-last-child(1) {
      padding-right: 0;
    }
  }
`;

const CheckoutTimeInput = styled.input`
  width: 16px;
  height: 16px;
`;

const CheckoutTimeOption = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const PaymentContainer = styled.div`
  padding-top: 50px;

  @media screen and (max-width: 1279px) {
    padding-top: 20px;
  }
`;

export default CheckoutOrder;
