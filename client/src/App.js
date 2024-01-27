import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Componets/Footer';
import Header from "./Componets/Header"
import HomeScreen from './Screens/HomeScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen';
import { useState } from 'react';
import CartScreen from './Screens/CartScreen';
import Login from './Screens/Login';
import Register from './Screens/Registerform';
import Slideimg from './Screens/slideimg';


function App() {

  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))
  const[userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || "{}"))
  const[token, setToken] = useState(localStorage.getItem('token') || "")

  return (
    <BrowserRouter>
      <div className="App">
        <Header cartItems={cartItems} setUserInfo={setUserInfo} setToken={setToken} userInfo={userInfo} token={token}/>

        <main style={{ minHeight: "87vh" }}>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductDetailScreen setcartItems={setcartItems} cartItems={cartItems} />} />
            <Route path='/cart' element={<CartScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/user/login" element={<Login setUserInfo={setUserInfo} setToken={setToken} />} />
            <Route path="/Registerform" element={<Register setUserInfo={setUserInfo} setToken={setToken} />} />
          </Routes>

        </main>
        <Slideimg />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
