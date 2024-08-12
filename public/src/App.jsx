import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResetStyle, GlobalStyle } from "./components/GlobalStyle.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Checkout from "./components/Checkout";
import { CartProvider } from "./CartContext";
import { useState } from "react";

const App = () => {
  const [cartQuantity, setCartQuantity] = useState(parseInt(localStorage.getItem("cartQuantity")) || 0);

  return (
    <CartProvider value={{ cartQuantity, setCartQuantity}}>
      <React.StrictMode>
        <ResetStyle />
        <GlobalStyle />
        <Router>
          <Header />
          <Routes>
            <Route path="/product" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </Router>
      </React.StrictMode>
    </CartProvider>
  );
};

export default App;
