import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../../CartContext";

function ProductInput({ product }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorStock, setColorStock] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [stockLeft, setStockLeft] = useState(0);
  const [newStock, setNewStock] = useState({});
  const { amount, setAmount } = useContext(CartContext);
  const { cartQuantity, setCartQuantity } = useContext(CartContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const stockMap = cart.reduce((acc, item) => {
      if (!acc[item.colorCode]) {
        acc[item.colorCode] = {};
      }
      acc[item.colorCode][item.size] = item.newStock;
      return acc;
    }, {});
    setNewStock(stockMap);
  
    const savedCartQuantity = localStorage.getItem("cartQuantity");
    if (savedCartQuantity) {
      setCartQuantity(parseInt(savedCartQuantity, 10));
    }
  }, [setCartQuantity, setNewStock]);

  const getStockByColor = (colorCode) => {
    const selectedColor = product.variants.filter(
      (item) => item.color_code === colorCode
    );
    return selectedColor.reduce((obj, item) => {
      obj[item.size] = item.stock;
      return obj;
    }, {});
  };

  const getColorNameByCode = (colorCode) => {
    const color = product.colors.find((color) => color.code === colorCode);
    return color ? color.name : null;
  };

  const handleAddToCart = () => {
    const newQuantity = cartQuantity + amount;
    setCartQuantity(newQuantity);
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const selectedColorName = getColorNameByCode(selectedColor);
  
    const newProduct = {
      productId: product.id,
      image: product.main_image,
      name: product.title,
      amount: amount,
      colorCode: selectedColor,
      colorName: selectedColorName,
      size: selectedSize,
      newStock: stockLeft - amount,
      stock: colorStock[selectedSize],
      price: product.price,
    };
  
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.productId === newProduct.productId &&
        item.colorCode === newProduct.colorCode &&
        item.size === newProduct.size
    );
  
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].amount += newProduct.amount;
      cart[existingProductIndex].newStock = newProduct.newStock;
    } else {
      cart.push(newProduct);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  
    setNewStock((prevStock) => {
      const updatedStock = { ...prevStock };
      if (!updatedStock[selectedColor]) {
        updatedStock[selectedColor] = {};
      }
      updatedStock[selectedColor][selectedSize] = stockLeft - amount;
      return updatedStock;
    });
  
    setSelectedColor(null);
    setSelectedSize(null);
    setAmount(0);
    setStockLeft(0);
    setColorStock({});
  };
  

  const handleSizeClick = (size) => {
    if (colorStock[size] > 0) {
      setSelectedSize(size);
      const updatedStockLeft =
        newStock[selectedColor] && newStock[selectedColor][size] !== undefined
          ? newStock[selectedColor][size]
          : colorStock[size];
      setStockLeft(updatedStockLeft);
      setAmount(0);
    }
  };

  return (
    <ProductInputContainer>
      <ProductSelect>
        <ProductSelectName>顏色｜</ProductSelectName>
        {product.colors.map((color) => (
          <ProductColorOption
            key={color.code}
            color={`#${color.code}`}
            isSelected={selectedColor === color.code}
            onClick={() => {
              setSelectedColor(color.code);
              setColorStock(getStockByColor(color.code));
              setAmount(0);
              setSelectedSize(null);
              setStockLeft(0);
            }}
          />
        ))}
      </ProductSelect>
      <ProductSelect>
        <ProductSelectName>尺寸｜</ProductSelectName>
        {product.sizes.map((size) => (
          <ProductSizeOption
            key={size}
            $isSelected={selectedSize === size}
            stock={colorStock[size]}
            style={{
              opacity:
                selectedColor === null ||
                colorStock[size] === 0 ||
                (newStock[selectedColor] && newStock[selectedColor][size] === 0)
                  ? 0.25
                  : 1,
              cursor:
                selectedColor === null ||
                colorStock[size] === 0 ||
                (newStock[selectedColor] && newStock[selectedColor][size] === 0)
                  ? "not-allowed"
                  : "pointer",
              pointerEvents:
                selectedColor === null ||
                colorStock[size] === 0 ||
                (newStock[selectedColor] && newStock[selectedColor][size] === 0)
                  ? "none"
                  : "auto",
            }}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </ProductSizeOption>
        ))}
      </ProductSelect>
      <ProductSelect>
        <ProductSelectQuantityName>數量｜</ProductSelectQuantityName>
        <ProductQuantityBox>
          <ProductQuantityButton
            type="button"
            value="-"
            onClick={() =>
              setAmount((prevAmount) =>
                prevAmount > 0 ? (prevAmount -= 1) : prevAmount
              )
            }
          />
          <ProductQuantityNumber>{amount}</ProductQuantityNumber>
          <ProductQuantityButton
            type="button"
            value="+"
            onClick={() => {
              if (amount < stockLeft) {
                setAmount((prevAmount) => prevAmount + 1);
              } else {
                alert("加入的商品數量超過庫存量");
              }
            }}
          />
        </ProductQuantityBox>
      </ProductSelect>
      <ProductInputCart
        style={{
          cursor:
            !selectedColor || !selectedSize || amount === 0
              ? "not-allowed"
              : "pointer",
          backgroundColor: "#000000",
        }}
        onClick={() => {
          handleAddToCart();
          if (selectedColor && selectedSize && amount > 0) {
            alert(`已加入購物車，數量：${amount}`);
          } else if (!selectedColor) {
            alert("請選擇顏色");
          } else if (!selectedSize) {
            alert("請選擇尺寸");
          } else if (!amount) {
            alert("請選擇數量");
          }
        }}
      >
        {!selectedColor
          ? "請選擇顏色"
          : !selectedSize
          ? "請選擇尺寸"
          : amount === 0
          ? "請選擇數量"
          : "加入購物車"}
      </ProductInputCart>
    </ProductInputContainer>
  );
}

ProductInput.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    main_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
      })
    ).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        color_code: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const ProductInputContainer = styled.div`
  padding-top: 30px;
`;

const ProductSelect = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;
`;

const ProductSelectName = styled.p`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #3f3a3a;
  padding-right: 22px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 2.8px;
    padding-right: 14px;
  }
`;

const ProductColorOption = styled.button`
  width: 36px;
  height: 36px;
  box-shadow: inset 0px 0px 1px #d3d3d3;
  border: 6px solid #ffffff;
  outline: 1px solid ${({ isSelected }) => (isSelected ? "#979797" : "#ffffff")};
  background-color: ${({ color }) => color};

  &:hover,
  &:focus {
    outline-color: #979797;
    cursor: pointer;
  }

  & + & {
    margin-left: 20px;
  }
`;

const ProductSizeOption = styled.button`
  width: 36px;
  height: 36px;
  font-size: 20px;
  line-height: 36px;
  border-radius: 50%;
  color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#3F3A3A")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#000000" : "#ECECEC"};
  border: transparent;

  &:hover,
  &:focus {
    color: #ffffff;
    background-color: #000000;
    cursor: pointer;
  }

  & + & {
    margin-left: 20px;
  }
`;

const ProductSelectQuantityName = styled.p`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 4px;
  color: #3f3a3a;
  padding-right: 22px;

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const ProductQuantityBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  padding: 6px 15px;
  border: 1px solid #979797;

  @media screen and (max-width: 1279px) {
    width: 100%;
    padding: 11px 48px;
  }
`;

const ProductQuantityNumber = styled.p`
  font-size: 16px;
  line-height: 32px;
  color: #8b572a;

  @media screen and (max-width: 1279px) {
    font-size: 20px;
    line-height: 22px;
  }
`;

const ProductQuantityButton = styled.input`
  background-color: transparent;
  border: transparent;
  cursor: pointer;
`;

const ProductInputCart = styled.button`
  width: 100%;
  background-color: rgb(236, 236, 236);
  border: 1px solid #979797;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: #ffffff;
  padding: 17px 0;

  &:active {
    background-color: #000000;
  }

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 3.2px;
    padding: 7px 0;
  }
`;

export default ProductInput;
