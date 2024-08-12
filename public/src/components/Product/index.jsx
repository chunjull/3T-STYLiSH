import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductInput from "./ProductInput";

function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  useEffect(() => {
    const productId = getProductIdFromURL();
    if (productId) {
      fetch(`https://api.appworks-school.tw/api/1.0/products/details?id=${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((product) => {
          setProduct(product.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ProductContainer>
      <ProductWrapper>
        <ProductMainImage src={product.main_image} />
        <ProductContent>
          <ProductName>{product.title}</ProductName>
          <ProductId>{product.id}</ProductId>
          <ProductPrice>TWD.{product.price}</ProductPrice>
          <ProductLine />
          <ProductInput product={product} />
          <ProductDescription>
            <ProductText>{product.note}</ProductText>
            <ProductText>
              {product.description.split("\r\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </ProductText>
            <ProductText>
              清洗：{product.wash}
              <br />
              產地：{product.place}
            </ProductText>
          </ProductDescription>
        </ProductContent>
      </ProductWrapper>
      <ProductInformation>
        <ProductStoryContent>
          <ProductStoryTitle>更多產品資訊</ProductStoryTitle>
          <ProductStoryLine />
        </ProductStoryContent>
        <ProductStory>{product.story}</ProductStory>
        {product.images.map((image, index) => (
          <ProductImages key={index} src={image} />
        ))}
      </ProductInformation>
    </ProductContainer>
  );
}

const ProductContainer = styled.div`
  max-width: 960px;
  margin: 140px auto 0 auto;
  padding: 65px 0 49px 0;

  @media screen and (max-width: 1279px) {
    margin-top: 102px;
    padding-top: 0;
    padding-bottom: 32px;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

const ProductContent = styled.div`
  width: 360px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    padding: 17px 24px 0 24px;
  }
`;

const ProductMainImage = styled.img`
  width: 560px;
  height: 100%;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const ProductName = styled.p`
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 6.4px;
  color: #3f3a3a;
  padding-bottom: 18px;

  @media screen and (max-width: 1279px) {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    padding-bottom: 10px;
  }
`;

const ProductId = styled.p`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #bababa;
  padding-bottom: 40px;

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    padding-bottom: 20px;
  }
`;

const ProductPrice = styled.p`
  font-size: 30px;
  line-height: 36px;
  color: #3f3a3a;
  padding-bottom: 20px;

  @media screen and (max-width: 1279px) {
    font-size: 20px;
    line-height: 24px;
    padding-bottom: 10px;
  }
`;

const ProductLine = styled.div`
  border-bottom: 1px solid #3f3a3a;
  width: 100%;

  @media screen and (max-width: 1279px) {
  }
`;

const ProductDescription = styled.div`
  padding-top: 40px;

  @media screen and (max-width: 1279px) {
    padding-top: 28px;
  }
`;

const ProductText = styled.p`
  font-size: 20px;
  line-height: 30px;
  color: #3f3a3a;

  & + & {
    padding-top: 30px;
  }

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 24px;

    & + & {
      padding-top: 24px;
    }
  }
`;

const ProductInformation = styled.div`
  padding-top: 50px;

  @media screen and (max-width: 1279px) {
    padding: 28px 24px 0 24px;
  }
`;

const ProductStoryContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 28px;

  @media screen and (max-width: 1279px) {
    padding-bottom: 12px;
  }
`;

const ProductStoryTitle = styled.p`
  font-size: 20px;
  line-height: 30px;
  color: #8b572a;
  letter-spacing: 3px;
  width: 138px;
  margin-right: 64px;

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 3.2px;
    width: 116px;
    margin-right: 35px;
  }
`;

const ProductStoryLine = styled.div`
  border-bottom: 1px solid #3f3a3a;
  width: calc(100% - 202px);

  @media screen and (max-width: 1279px) {
    width: calc(100% - 151px);
  }
`;

const ProductStory = styled.p`
  font-size: 20px;
  line-height: 30px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 25px;
  }
`;

const ProductImages = styled.img`
  width: 100%;
  padding-top: 30px;

  @media screen and (max-width: 1279px) {
    padding-top: 20px;
  }
`;

export default Product;